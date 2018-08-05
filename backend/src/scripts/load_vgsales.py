from django.conf import settings
import os, csv

from vgsales.serializers import VgSaleSerializer
from vgsales.models import VgSales

FILE = os.path.join(settings.BASE_DIR, "local", "vgsales.csv")


def read_csv():
    with open(FILE, "r") as fp:
        reader = csv.reader(fp)
        headers = [i.lower() for i in reader.__next__()]
        print(headers)
        for row in reader:
            yield dict(zip(headers, row))


def run():
    for row in read_csv():
        serializer = VgSaleSerializer(data=row)
        if serializer.is_valid():
            serializer.save()
            print("Item saved: %s" % serializer.instance.rank)

    print(VgSales.objects.count())

