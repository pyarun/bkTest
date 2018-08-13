from .models import VgSales, GameFeatures


class Reports(object):
    def count_by_genre(self):
        """
        Count Of games by genre
        """
        queryset = VgSales.objects.all()
        pipeline = []
        pipeline.append(
            {
                "$group": {
                    "_id": "$genre",
                    "count": {"$sum": 1},
                    "na_sales": {"$sum": "$na_sales"},
                    "eu_sales": {"$sum": "$eu_sales"},
                    "jp_sales": {"$sum": "$jp_sales"},
                    "other_sales": {"$sum": "$other_sales"},
                    "global_sales": {"$sum": "$global_sales"},
                }
            }
        )

        return list(queryset.aggregate(*pipeline))

    def count_by_year(self):
        """
        Count of games released by Year
        """
        queryset = GameFeatures.objects.all()
        pipeline = []
        pipeline.append(
            {
                "$project": {
                    "_id": 0,
                    "year": {
                        "$cond": {
                            "if": "$releasedate",
                            "then": {"$year": "$releasedate"},
                            "else": {"$concat": ["$releasedate"]},
                        }
                    },
                }
            }
        )
        pipeline.append({"$group": {"_id": "$year", "count": {"$sum": 1}}})

        # sort
        pipeline.append({"$sort": {"_id": 1}})
        return list(queryset.aggregate(*pipeline))

    def count_by_age(self):
        """
        Number of Games by age Group
        """
        queryset = GameFeatures.objects.all()
        pipeline = []
        pipeline.append({"$match": {"requiredage": {"$ne": 0}}})
        pipeline.append(
            {
                "$bucket": {
                    "groupBy": "$requiredage",
                    # "bucket": 5,
                    "default": "20+",
                    "boundaries": [1, 7, 12, 16, 20],
                    # "output": {"count": {"$sum": 1}},
                }
            }
        )
        return list(queryset.aggregate(*pipeline))

    def count_by_platform(self):
        """
        Ratio of games by Each Platform type
        """
        queryset = GameFeatures.objects.all()
        pipeline = [
            {
                "$facet": {
                    "mac": [
                        {
                            "$match": {
                                "platformmac": True,
                                "platformwindows": False,
                                "platformlinux": False,
                            }
                        },
                        {"$count": "platformmac"},
                    ],
                    "windows": [
                        {
                            "$match": {
                                "platformwindows": True,
                                "platformlinux": False,
                                "platformmac": False,
                            }
                        },
                        {"$count": "platformwindows"},
                    ],
                    "linux": [
                        {
                            "$match": {
                                "platformlinux": True,
                                "platformwindows": False,
                                "platformmac": False,
                            }
                        },
                        {"$count": "platformlinux"},
                    ],
                    "all": [
                        {
                            "$match": {
                                "platformlinux": True,
                                "platformwindows": True,
                                "platformmac": True,
                            }
                        },
                        {"$count": "all"},
                    ],
                }
            }
        ]

        return list(queryset.aggregate(*pipeline))

    def sales_by_region(self):
        """
        Sales numbers by Region
        """
        queryset = VgSales.objects.all()
        pipeline = []
        pipeline.append(
            {
                "$group": {
                    "_id": 1,
                    "na_sales": {"$sum": "$na_sales"},
                    "eu_sales": {"$sum": "$eu_sales"},
                    "jp_sales": {"$sum": "$jp_sales"},
                    "other_sales": {"$sum": "$other_sales"},
                    "global_sales": {"$sum": "$global_sales"},
                }
            }
        )
        dataset = list(queryset.aggregate(*pipeline))
        if len(dataset):
            dataset = dataset[0]
        else:
            dataset ={}
        return dataset

    def price_vs_users(self):
        """
        Impact of pricing on users of game
        """
        queryset = GameFeatures.objects.all()
        pipeline = []
        pipeline.append(
            {
                "$bucketAuto": {
                    "groupBy": "$pricefinal",
                    "buckets": 8,
                    "output": {
                        "avg_price": {"$avg": "$pricefinal"},
                        "max_price": {"$max": "$pricefinal"},
                        "min_price": {"$min": "$pricefinal"},
                        "users": {"$sum": "$steamspyowners"},
                        "games": {"$sum": 1},
                    },
                }
            }
        )
        return list(queryset.aggregate(*pipeline))

    def buys_vs_price(self):
        """
        Game buys vs game price - is the trend obvious
        """
        queryset = GameFeatures.objects.all()
        pipeline = []
        pipeline.append(
            {
                "$bucket": {
                    "groupBy": "$steamspyowners",
                    "boundaries": [0, 100, 1000, 10000, 100000],
                    "default": 100001,
                    "output": {
                        "avg_price": {"$avg": "$pricefinal"},
                        "max_price": {"$max": "$pricefinal"},
                        "min_price": {"$min": "$pricefinal"},
                        "games": {"$sum": 1},
                    },
                    # "granularity": "POWERSOF2",
                }
            }
        )
        pipeline.append(
            {
                "$project": {
                    "avg_price": {"$ceil": "$avg_price"},
                    "max_price": 1,
                    "min_price": 1,
                    "games": 1,
                }
            }
        )
        # pipeline.append({
        #     "$sort": {}
        # })
        return list(queryset.aggregate(*pipeline))

    def singleMultiPlayer(self):
        """
        Ratio of Single and Multi players and there owners
        """
        queryset = GameFeatures.objects.all()
        pipeline = []
        pipeline.append(
            {
                "$facet": {
                    "single": [
                        {"$match": {"categorysingleplayer": True}},
                        {
                            "$group": {
                                "_id": 1,
                                "count": {"$sum": 1},
                                "owners": {"$sum": "$steamspyowners"},
                            }
                        },
                    ],
                    "multi": [
                        {"$match": {"categorymultiplayer": True}},
                        {
                            "$group": {
                                "_id": 1,
                                "count": {"$sum": 1},
                                "owners": {"$sum": "$steamspyowners"},
                            }
                        },
                    ],
                }
            }
        )
        return list(queryset.aggregate(*pipeline))[0]

    def freeVsPaid(self):
        """
        Ration of Free VS Paid Games
        """
        queryset = GameFeatures.objects.all()
        pipeline = []
        bucket = {
            "$bucket": {
                "groupBy": {
                    "$cond": {
                        "if": "$releasedate",
                        "then": {"$year": "$releasedate"},
                        "else": {"$concat": ["$releasedate"]},
                    }
                },
                "boundaries": [2000, 2005, 2010, 2015, 2020],
                "default": "no_year",
                "output": {
                    "count": {"$sum": 1},
                    "owners": {"$sum": "$steamspyplayersestimate"},
                    "owners_avg": {"$avg": "$steamspyplayersestimate"},
                },
            }
        }
        pipeline.append(
            {
                "$facet": {
                    "free": [{"$match": {"isfree": True}}, bucket],
                    "paid": [{"$match": {"isfree": False}}, bucket],
                }
            }
        )
        return list(queryset.aggregate(*pipeline))[0]

