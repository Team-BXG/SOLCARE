from django.contrib import admin
from .models import Facility, Supplier, SolarDemand, TechnicalAssessment

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'facility_type', 'region', 'zone', 'woreda')
    search_fields = ('name', 'code', 'region', 'woreda')
    list_filter = ('facility_type', 'region')

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_person', 'email', 'phone')
    search_fields = ('name',)

@admin.register(SolarDemand)
class SolarDemandAdmin(admin.ModelAdmin):
    list_display = ('facility', 'requirement', 'status', 'tech_assessment', 'supplier', 'submission_date')
    list_filter = ('status', 'tech_assessment', 'supplier')
    search_fields = ('facility__name', 'requirement')

@admin.register(TechnicalAssessment)
class TechnicalAssessmentAdmin(admin.ModelAdmin):
    list_display = ('demand', 'engineer', 'recommended_capacity_kwp', 'battery_storage_kwh', 'readiness_score')
