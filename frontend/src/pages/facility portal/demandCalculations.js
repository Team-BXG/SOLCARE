/**
 * SOLCARE Solar Demand Estimation Calculator
 * Performs automated demand sizing from equipment inventory
 */

export function calculateEnergyDemand({ existingEquipment = [], additionalEquipment = [] }) {
  let totalExistingCount = 0;
  let totalDailyWattHours = 0;
  let peakLoadWatts = 0;
  let criticalDailyWattHours = 0;
  let daytimeWattHours = 0;
  let nighttimeWattHours = 0;

  // Process existing equipment
  existingEquipment.forEach((item) => {
    const qty = Number(item.quantity) || 1;
    const watts = Number(item.watts) || 0;
    const hours = Number(item.hoursPerDay) || 0;
    totalExistingCount += qty;

    const itemDailyWh = watts * qty * hours;
    totalDailyWattHours += itemDailyWh;

    // Peak load estimation (diversity factor 0.75 for non-continuous, 1.0 for continuous)
    const diversity = hours >= 20 ? 1.0 : 0.7;
    peakLoadWatts += (watts * qty) * diversity;

    if (item.priority === 'Critical') {
      criticalDailyWattHours += itemDailyWh;
    }

    // Daytime vs nighttime split
    if (item.usageTime === 'Night only') {
      nighttimeWattHours += itemDailyWh;
    } else if (item.usageTime === 'Day only') {
      daytimeWattHours += itemDailyWh;
    } else {
      // Day and Night split: ~10 hours day, ~14 hours night
      const dayRatio = Math.min(1, Math.max(0, 10 / Math.max(1, hours)));
      daytimeWattHours += itemDailyWh * dayRatio;
      nighttimeWattHours += itemDailyWh * (1 - dayRatio);
    }
  });

  // Process additional requested equipment
  let additionalDailyWattHours = 0;
  let additionalCount = 0;
  additionalEquipment.forEach((item) => {
    const qty = Number(item.quantity) || 1;
    const watts = Number(item.watts) || 100;
    const hours = Number(item.hoursPerDay) || 8;
    additionalCount += qty;
    additionalDailyWattHours += watts * qty * hours;
  });

  const dailyKWh = totalDailyWattHours / 1000;
  const criticalKWh = criticalDailyWattHours / 1000;
  const additionalDailyKWh = additionalDailyWattHours / 1000;
  const totalCombinedKWh = dailyKWh + additionalDailyKWh;

  // Suggested preliminary PV sizing based on Ethiopian solar insolation (~5.2 Peak Sun Hours)
  // System derating factor ~0.72
  const psh = 5.2;
  const derate = 0.72;
  const suggestedKwp = totalCombinedKWh > 0 ? (totalCombinedKWh / (psh * derate)) : 0;

  // Suggested battery sizing based on nighttime consumption + 1 day autonomy, 80% DoD
  const suggestedBatteryKWh = ((nighttimeWattHours / 1000) * 1.5) / 0.8;

  return {
    totalExistingCount,
    dailyKWh: Number(dailyKWh.toFixed(2)),
    peakLoadKW: Number((peakLoadWatts / 1000).toFixed(2)),
    criticalKWh: Number(criticalKWh.toFixed(2)),
    daytimeKWh: Number((daytimeWattHours / 1000).toFixed(2)),
    nighttimeKWh: Number((nighttimeWattHours / 1000).toFixed(2)),
    additionalCount,
    additionalDailyKWh: Number(additionalDailyKWh.toFixed(2)),
    totalCombinedKWh: Number(totalCombinedKWh.toFixed(2)),
    suggestedKwp: Number(suggestedKwp.toFixed(1)),
    suggestedBatteryKWh: Number(suggestedBatteryKWh.toFixed(1)),
  };
}

