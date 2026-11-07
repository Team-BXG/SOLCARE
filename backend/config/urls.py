from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import (
    FacilityViewSet,
    SupplierViewSet,
    SolarDemandViewSet,
    TechnicalAssessmentViewSet
)

router = DefaultRouter()
router.register(r'facilities', FacilityViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'demands', SolarDemandViewSet)
router.register(r'assessments', TechnicalAssessmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
