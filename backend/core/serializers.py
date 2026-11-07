from rest_framework import serializers
from .models import Facility, Supplier, SolarDemand, TechnicalAssessment

class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    assigned_count = serializers.IntegerField(source='assigned_demands.count', read_only=True)

    class Meta:
        model = Supplier
        fields = '__all__'

class SolarDemandSerializer(serializers.ModelSerializer):
    facility_name = serializers.CharField(source='facility.name', read_only=True)
    facility_code = serializers.CharField(source='facility.code', read_only=True)
    facility_type = serializers.CharField(source='facility.facility_type', read_only=True)
    region = serializers.CharField(source='facility.region', read_only=True)
    zone = serializers.CharField(source='facility.zone', read_only=True)
    woreda = serializers.CharField(source='facility.woreda', read_only=True)
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)

    class Meta:
        model = SolarDemand
        fields = '__all__'

class TechnicalAssessmentSerializer(serializers.ModelSerializer):
    facility_name = serializers.CharField(source='demand.facility.name', read_only=True)

    class Meta:
        model = TechnicalAssessment
        fields = '__all__'

