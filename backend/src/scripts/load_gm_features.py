from django.conf import settings
import os, csv

from vgsales.serializers import GameFeaturesSerializer
from vgsales.models import VgSales, GameFeatures

FILE = os.path.join(settings.BASE_DIR, "local", "games-features.csv")


def read_csv():
    with open(FILE, "r") as fp:
        reader = csv.reader(fp)
        headers = [i.lower() for i in next(reader)]
        print(headers)
        # row = next(reader)
        # print(row)
        # yield dict(zip(headers, row))
        for row in reader:
            yield dict(zip(headers, row))


def preprocess_release_date(row):
    date = row["releasedate"].strip().lower()
    if not date or date in [
        "coming soon - 2016",
        "coming 2016",
        "before the apocalypse",
        "before the second apocalypse",
        "coming soon",
        "coming soon!",
        "to be announced.",
        "to be announced",
        "soon!",
        "soon",
        "tbd",
        "tba",
        "tba 2016",
        "20xx",
        "coming this winter!",
        "when my body is ready [2017]",
        "when the world ends",
        "not yet available",
        "when its ready!",
        "september",
        "when its done",
        "this autumn",
        "this winter",
        "em breve",
        "September 28",
        "20 September",
        "league of evil is preparing its evil plans...",
        "when its done(tm)",
        "this holiday season",
        "early access coming soon",
        "september 30th",
        "coming soon...",
    ]:
        row.pop("releasedate")
    elif date in [
        "coming early fall 2016",
        "fall 2016",
        "september 2016",
        "sept 23 2016",
        "2016 autumn",
        "^utumn 2016",
        "autumn 2016",
        "late summer - 2016",
        "september - 2016",
        "harvest 2016",
        "q3 2016",
        "sept - 2016",
        "mid 2016",
        "skoro",
        "releasing between october 21st - november 25th",
        "soon(tm)",
        "early access soon",
        "tbd 2017",
        "coming this summer",
        "late fall 2016",
        "holiday 2016",
    ]:
        row["releasedate"] = "Sep 2016"
    elif date in [
        "q2 2016",
        "summer 2016",
        "spring 2016",
        "summer 16",
        "summer 2016 early access",
    ]:
        row["releasedate"] = "Apr 2016"
    elif date == "releasing 2016":
        row["releasedate"] = "2016"
    elif date in [
        "q4 2016",
        "q4 - 2016",
        "october 2016",
        "2016 q4",
        "2016q4",
        "late 2016",
        "25th of october 2016",
        "some time before october 2016",
        "10-2016",
    ]:
        row["releasedate"] = "Oct 2016"
    elif date in [
        "coming november 2016",
        "november 2016",
        "winter 2016",
        "end of 2016",
        "end 2016",
        "christmas 2016",
    ]:
        row["releasedate"] = "Nov 2016"
    elif date in [
        "q 2 2017",
        "spring 2017",
        "q2 2017",
        "first half of 2017",
        "2017 q2",
        "mid-2017",
        "coming q2 2017" "summer 2017",
    ]:
        row["releasedate"] = "Apr 2017"
    elif date in [
        "late 2016 / early 2017",
        "late 2016 - early 2017",
        "early 2017",
        "q1 2017",
        "2017 q1",
        "~2017",
        "coming 2017",
    ]:
        row["releasedate"] = "2017"
    elif date in ["holiday 2017", "fall 2017"]:
        row["releasedate"] = "Sep 2017"
    elif date in ["q4 2017"]:
        row["releasedate"] = "Oct 2017"


verified_count = 0


def save(row):

    return serializer


def run():
    read_csv()
    count = 0
    for row in read_csv():
        count += 1
        if count < verified_count:
            continue
        preprocess_release_date(row)
        try:
            serializer = GameFeaturesSerializer(data=row)
            if serializer.is_valid():
                serializer.save()
                print("Item saved: %s" % serializer.instance.queryid)
        except:
            if (
                len(serializer.errors.keys()) == 1
                and "releasedate" in serializer.errors
            ):
                row.pop("releasedate")
                serializer = GameFeaturesSerializer(data=row)
                if serializer.is_valid():
                    serializer.save()
                    print("Item saved: %s" % serializer.instance.queryid)
                else:
                    print("\n\n")
                    print(serializer.errors)
            else:
                # print(row["releasedate"])
                print("\n\n")
                print(serializer.errors)

            # break
        # print("\n\n")

    print(count)
    print(GameFeatures.objects.count())

