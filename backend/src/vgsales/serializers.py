from rest_framework_mongoengine.serializers import DocumentSerializer
from vgsales.models import VgSales, GameFeatures
from rest_framework import serializers
from datetime import datetime


class VgSaleSerializer(DocumentSerializer):
    class Meta:
        model = VgSales
        fields = "__all__"


class GameFeaturesSerializer(DocumentSerializer):
    releasedate = serializers.DateField(
        input_formats=[
            "%b %d %Y",
            "%b %Y",
            "%Y",
            "%b %dth %Y",
            "%B %Y",
            "%B %d %Y",
            "%B %dth %Y",
        ],
        required=False,
    )

    class Meta:
        model = GameFeatures
        fields = "__all__"

    # def validate_releasedate(self, value):
    #     print("date: %s" % value)
    #     if isinstance(value, str):
    #         value = value.strip()
    #         if value == "Coming Soon":
    #             value = None
    #     return value

    # if not date:
    #     row.pop("releasedate")

