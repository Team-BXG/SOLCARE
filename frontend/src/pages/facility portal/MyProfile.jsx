import FacilityHeader from './FacilityHeader';

export default function MyProfile({ profileData, setProfileData }) {
  const handleChange = (field, val) => {
    if (setProfileData) {
      setProfileData((prev) => ({ ...prev, [field]: val }));
    }
  };

  return (
    <>
      <FacilityHeader />

      <section className="portal-panel-card" style={{ marginTop: 20 }}>
        <div className="panel-sub-label">MY PROFILE</div>
        <h2 className="panel-main-title">Facility profile</h2>
        <p className="panel-description">
          Maintain the core facility information used during demand verification and supplier handoff.
        </p>

        <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 24 }}>
          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Facility Name</label>
              <input
                className="form-input"
                type="text"
                value={profileData.facilityName}
                onChange={(e) => handleChange('facilityName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Facility Type</label>
              <input
                className="form-input"
                type="text"
                value={profileData.facilityType}
                onChange={(e) => handleChange('facilityType', e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Region</label>
              <input
                className="form-input"
                type="text"
                value={profileData.region}
                onChange={(e) => handleChange('region', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Zone</label>
              <input
                className="form-input"
                type="text"
                value={profileData.zone}
                onChange={(e) => handleChange('zone', e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input
                className="form-input"
                type="text"
                value={profileData.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                type="text"
                value={profileData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={profileData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bed Capacity</label>
              <input
                className="form-input"
                type="text"
                value={profileData.bedCapacity}
                onChange={(e) => handleChange('bedCapacity', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 18 }}>
            <label className="form-label">Energy Infrastructure</label>
            <textarea
              className="form-input form-textarea"
              rows={3}
              value={profileData.energyInfrastructure}
              onChange={(e) => handleChange('energyInfrastructure', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Critical Departments</label>
            <input
              className="form-input"
              type="text"
              value={profileData.criticalDepartments}
              onChange={(e) => handleChange('criticalDepartments', e.target.value)}
            />
          </div>
        </form>
      </section>
    </>
  );
}
