from rest_framework import viewsets
from .models import Facility, Supplier, SolarDemand, TechnicalAssessment
from .serializers import (
    FacilitySerializer,
    SupplierSerializer,
    SolarDemandSerializer,
    TechnicalAssessmentSerializer
)

class FacilityViewSet(viewsets.ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class SolarDemandViewSet(viewsets.ModelViewSet):
    queryset = SolarDemand.objects.select_related('facility', 'supplier').all()
    serializer_class = SolarDemandSerializer

class TechnicalAssessmentViewSet(viewsets.ModelViewSet):
    queryset = TechnicalAssessment.objects.select_related('demand', 'engineer').all()
    serializer_class = TechnicalAssessmentSerializer
