from django.db import models
from django.contrib.auth.models import User

class Facility(models.Model):
    FACILITY_TYPES = [
        ('General Hospital', 'General Hospital'),
        ('Health Center', 'Health Center'),
        ('Primary Clinic', 'Primary Clinic'),
        ('Referral Hospital', 'Referral Hospital'),
        ('Medical Center', 'Medical Center'),
        ('Teaching Hospital', 'Teaching Hospital'),
        ('Regional Hospital', 'Regional Hospital'),
    ]

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True, help_text="e.g. SED-24081")
    facility_type = models.CharField(max_length=50, choices=FACILITY_TYPES)
    region = models.CharField(max_length=100)
    zone = models.CharField(max_length=100)
    woreda = models.CharField(max_length=100)
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


class SolarDemand(models.Model):
    STATUS_CHOICES = [
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
    requirement = models.CharField(max_length=255, help_text="e.g. 250 kWp solar PV + battery")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Under Verification')
    tech_assessment = models.CharField(max_length=50, choices=TECH_ASSESSMENT_CHOICES, default='Not Started')
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_demands')
    critical_departments = models.TextField(blank=True, help_text="e.g. ICU, OR, Laboratory, Emergency")
    submission_date = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-submission_date']

    def __str__(self):
        return f"{self.facility.name} - {self.requirement}"


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
