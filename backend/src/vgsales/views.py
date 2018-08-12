from django.shortcuts import render
from rest_framework import viewsets, filters

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import action
from vgsales.models import VgSales, GameFeatures
from .serializers import GameFeaturesSerializer, VgSaleSerializer
from .reports import Reports


class VgSalesViewSet(viewsets.ModelViewSet):
    serializer_class = VgSaleSerializer

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all()


class GameFeaturesViewSet(viewsets.ModelViewSet):
    serializer_class = GameFeaturesSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ("steamspyowners", "pricefinal")

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all()


class InsightsViewSet(viewsets.GenericViewSet):
    def get_queryset(self):
        return None

    @action(methods=["get"], detail=False)
    def genre(self, request, *args, **kwargs):
        r = Reports()

        return Response(r.count_by_genre())

    @action(methods=["get"], detail=False)
    def year_count(self, request, *args, **kwargs):
        r = Reports()
        return Response(r.count_by_year())

    @action(methods=["get"], detail=False)
    def sales_by_region(self, request, *args, **kwargs):
        r = Reports()

        return Response(r.sales_by_region())

    @action(methods=["get"], detail=False)
    def buys_vs_price(self, request, *args, **kwargs):
        r = Reports()
        return Response(r.price_vs_users())

    @action(methods=["get"], detail=False)
    def count_by_age(self, request, *args, **kwargs):
        r = Reports()
        return Response(r.count_by_age())

    @action(methods=["get"], detail=False)
    def single_multi_player(self, request, *args, **kwargs):
        r = Reports()
        return Response(r.singleMultiPlayer())

    @action(methods=["get"], detail=False)
    def freeVsPaid(self, request, *args, **kwargs):
        r = Reports()
        return Response(r.freeVsPaid())

