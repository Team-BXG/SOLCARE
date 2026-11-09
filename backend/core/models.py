from django.db import models
from django.contrib.auth.models import User

class Facility(models.Model):
    FACILITY_TYPES = [
        ('Health Post', 'Health Post'),
        ('Primary Health Center', 'Primary Health Center'),
        ('General Hospital', 'General Hospital'),
        ('Specialized Hospital', 'Specialized Hospital'),
        ('Rural Emergency Center', 'Rural Emergency Center'),
        ('Primary Clinic', 'Primary Clinic'),
        ('Medical Center', 'Medical Center'),
        ('Teaching Hospital', 'Teaching Hospital'),
        ('Regional Hospital', 'Regional Hospital'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True, help_text="e.g. SED-24081")
    facility_type = models.CharField(max_length=50, choices=FACILITY_TYPES)
    region = models.CharField(max_length=100)
    zone = models.CharField(max_length=100)
    woreda = models.CharField(max_length=100)
    kebele = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=255, blank=True)
    head_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    gps_location = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Facilities"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.code})"


class Supplier(models.Model):
    name = models.CharField(max_length=255, unique=True)
    contact_person = models.CharField(max_length=150, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class EquipmentCatalog(models.Model):
    CATEGORY_CHOICES = [
        ('Lighting', 'Lighting'),
        ('Medical Cold Chain', 'Medical Cold Chain'),
        ('Laboratory', 'Laboratory'),
        ('Maternity and Emergency', 'Maternity and Emergency'),
        ('Water and Sanitation', 'Water and Sanitation'),
        ('ICT', 'ICT'),
        ('Other', 'Other'),
    ]

    PRIORITY_CHOICES = [
        ('Critical', 'Critical'),
        ('Essential', 'Essential'),
        ('Non-essential', 'Non-essential'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=200)
    default_watts = models.DecimalField(max_digits=8, decimal_places=2, default=100)
    typical_hours_per_day = models.DecimalField(max_digits=4, decimal_places=1, default=8)
    default_priority = models.CharField(max_length=30, choices=PRIORITY_CHOICES, default='Essential')

    def __str__(self):
        return f"{self.name} ({self.category} - {self.default_watts}W)"


class SolarDemand(models.Model):
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Under Verification', 'Under Verification'),
        ('Verified', 'Verified'),
        ('Technically Assessed', 'Technically Assessed'),
        ('Released to Supplier', 'Released to Supplier'),
        ('Supplier Accepted', 'Supplier Accepted'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        ('Returned', 'Returned'),
    ]

    TECH_ASSESSMENT_CHOICES = [
        ('Not Started', 'Not Started'),
        ('In Review', 'In Review'),
        ('Complete', 'Complete'),
        ('Requires Revision', 'Requires Revision'),
    ]

    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='demands')
    demand_code = models.CharField(max_length=50, unique=True, blank=True, null=True, help_text="e.g. REQ-2025-012")
    requirement = models.CharField(max_length=255, help_text="e.g. 35 kWp solar PV + battery")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Under Verification')
    tech_assessment = models.CharField(max_length=50, choices=TECH_ASSESSMENT_CHOICES, default='Not Started')
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_demands')
    critical_departments = models.TextField(blank=True, help_text="e.g. ICU, OR, Laboratory, Emergency")

    # Operating schedule
    operating_schedule = models.JSONField(default=dict, blank=True, help_text="Operating hours, 24-hr status, night services")

    # Current electricity situation
    electricity_situation = models.JSONField(default=dict, blank=True, help_text="Sources, reliability, existing solar/generator specs")

    # Automated Energy Calculations
    calculated_daily_kwh = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    calculated_peak_load_kw = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    calculated_critical_kwh = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    suggested_kwp = models.DecimalField(max_digits=8, decimal_places=2, default=0)

    # Reliability & Installation info
    reliability_requirements = models.JSONField(default=dict, blank=True)
    installation_info = models.JSONField(default=dict, blank=True)

    submission_date = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-submission_date']

    def __str__(self):
        return f"{self.facility.name} - {self.requirement}"


class ExistingEquipment(models.Model):
    demand = models.ForeignKey(SolarDemand, on_delete=models.CASCADE, related_name='existing_equipment')
    category = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    watts = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    hours_per_day = models.DecimalField(max_digits=4, decimal_places=1, default=8)
    is_working = models.CharField(max_length=30, default='Yes')
    is_care_important = models.CharField(max_length=30, default='Yes')
    usage_time = models.CharField(max_length=50, default='Day and Night')
    model_number = models.CharField(max_length=100, blank=True)
    priority = models.CharField(max_length=30, default='Essential')
    label_photo = models.FileField(upload_to='equipment_labels/', blank=True, null=True)

    def __str__(self):
        return f"{self.quantity}x {self.name} ({self.watts}W) - {self.demand.facility.name}"


class RequiredEquipment(models.Model):
    demand = models.ForeignKey(SolarDemand, on_delete=models.CASCADE, related_name='required_equipment')
    name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    expected_watts = models.DecimalField(max_digits=8, decimal_places=2, default=150)
    reason = models.CharField(max_length=150, default='New medical service')
    is_essential = models.CharField(max_length=30, default='Yes')
    timeframe = models.CharField(max_length=100, default='Immediate (Within 1-3 months)')
    explanation = models.TextField(blank=True)

    def __str__(self):
        return f"+{self.quantity}x {self.name} ({self.expected_watts}W)"


class DemandDocument(models.Model):
    demand = models.ForeignKey(SolarDemand, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    file = models.FileField(upload_to='demand_documents/', blank=True, null=True)
    status = models.CharField(max_length=50, default='Verified')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.demand.facility.name}"


class TechnicalAssessment(models.Model):
    demand = models.OneToOneField(SolarDemand, on_delete=models.CASCADE, related_name='assessment')
    engineer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    recommended_capacity_kwp = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    battery_storage_kwh = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    readiness_score = models.IntegerField(default=80, help_text="Percentage 0-100")
    notes = models.TextField(blank=True)
    scheduled_visit = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Assessment for {self.demand.facility.name}"
