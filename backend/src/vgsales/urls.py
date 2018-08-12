from rest_framework.routers import DefaultRouter
from vgsales.views import VgSalesViewSet, GameFeaturesViewSet, InsightsViewSet

router = DefaultRouter()


router.register("vgsales", VgSalesViewSet, base_name="vgsales")
router.register("gamef", GameFeaturesViewSet, base_name="gfeatures")
router.register("insights", InsightsViewSet, base_name="insights")


urlpatterns = router.urls
