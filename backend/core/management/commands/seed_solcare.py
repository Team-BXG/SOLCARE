from django.core.management.base import BaseCommand
from core.models import Facility, Supplier, SolarDemand

class Command(BaseCommand):
    help = 'Seed initial SOLCARE facilities, suppliers, and demands from registry data'

    def handle(self, *args, **options):
        # 1. Seed Facilities
        facilities_data = [
            {'name': 'Hawassa General Hospital', 'code': 'SED-24081', 'facility_type': 'General Hospital', 'region': 'Sidama', 'zone': 'Hawassa', 'woreda': 'Hawassa City'},
            {'name': 'Jimma Health Center', 'code': 'SED-24079', 'facility_type': 'Health Center', 'region': 'Oromia', 'zone': 'Jimma', 'woreda': 'Jimma Town'},
            {'name': 'Bahir Dar Clinic', 'code': 'SED-24076', 'facility_type': 'Primary Clinic', 'region': 'Amhara', 'zone': 'West Gojjam', 'woreda': 'Bahir Dar'},
            {'name': 'Mekelle Referral Hospital', 'code': 'SED-24072', 'facility_type': 'Referral Hospital', 'region': 'Tigray', 'zone': 'Central Tigray', 'woreda': 'Mekelle'},
            {'name': 'Adama Medical Center', 'code': 'SED-24069', 'facility_type': 'Medical Center', 'region': 'Oromia', 'zone': 'East Shewa', 'woreda': 'Adama'},
            {'name': 'Gondar University Hospital', 'code': 'SED-24064', 'facility_type': 'Teaching Hospital', 'region': 'Amhara', 'zone': 'North Gondar', 'woreda': 'Gondar'},
            {'name': 'Dire Dawa Regional Hospital', 'code': 'SED-24058', 'facility_type': 'Regional Hospital', 'region': 'Dire Dawa', 'zone': 'Dire Dawa', 'woreda': 'Dire Dawa'},
            {'name': 'Dessie Health Center', 'code': 'SED-24051', 'facility_type': 'Health Center', 'region': 'Amhara', 'zone': 'South Wollo', 'woreda': 'Dessie'},
        ]

        for f_data in facilities_data:
            Facility.objects.update_or_create(code=f_data['code'], defaults=f_data)

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(facilities_data)} Facilities."))

        # 2. Seed Suppliers
        suppliers = ['SunGrid Ethiopia', 'Ethiopian Solar Works', 'GreenRay Energy', 'Bright Solar PLC']
        supplier_objs = {}
        for s_name in suppliers:
            s_obj, _ = Supplier.objects.get_or_create(name=s_name)
            supplier_objs[s_name] = s_obj

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(suppliers)} Suppliers."))

        # 3. Seed Demands
        demands_data = [
            {'code': 'SED-24081', 'req': '250 kWp solar PV + battery', 'status': 'Technically Assessed', 'tech': 'Complete', 'supplier': 'SunGrid Ethiopia'},
            {'code': 'SED-24079', 'req': '80 kWp solar PV system', 'status': 'Under Verification', 'tech': 'Not Started', 'supplier': None},
            {'code': 'SED-24076', 'req': '45 kWp hybrid solar system', 'status': 'Verified', 'tech': 'In Review', 'supplier': None},
            {'code': 'SED-24072', 'req': '400 kWp solar PV + storage', 'status': 'Released to Supplier', 'tech': 'Complete', 'supplier': 'Ethiopian Solar Works'},
            {'code': 'SED-24069', 'req': '120 kWp rooftop PV', 'status': 'Supplier Accepted', 'tech': 'Complete', 'supplier': 'GreenRay Energy'},
            {'code': 'SED-24064', 'req': '350 kWp PV + 900 kWh battery', 'status': 'In Progress', 'tech': 'Complete', 'supplier': 'Bright Solar PLC'},
            {'code': 'SED-24058', 'req': '200 kWp solar PV system', 'status': 'Completed', 'tech': 'Complete', 'supplier': 'SunGrid Ethiopia'},
            {'code': 'SED-24051', 'req': '60 kWp solar PV + water pump', 'status': 'Returned', 'tech': 'Requires Revision', 'supplier': None},
        ]

        for d in demands_data:
            fac = Facility.objects.get(code=d['code'])
            sup = supplier_objs.get(d['supplier']) if d['supplier'] else None
            SolarDemand.objects.update_or_create(
                facility=fac,
                defaults={
                    'requirement': d['req'],
                    'status': d['status'],
                    'tech_assessment': d['tech'],
                    'supplier': sup,
                    'critical_departments': 'ICU, Operating Room, Blood Bank, Emergency',
                }
            )

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(demands_data)} Demands."))

