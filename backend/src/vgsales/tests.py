from django.test import TestCase
from vgsales.reports import Reports

# Create your tests here.


class ReportTestCases(TestCase):
    def test_count_by_genre(self):
        r = Reports()
        result = r.count_by_genre()
        self.assertIsInstance(result, list)

    def test_count_by_year(self):
        r = Reports()
        result = r.count_by_year()
        self.assertIsInstance(result, list)

    def test_count_by_age(self):
        r = Reports()
        result = r.count_by_age()
        self.assertIsInstance(result, list)

    def test_count_by_platform(self):
        r = Reports()
        result = r.count_by_platform()
        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 1)
        self.assertAlmostEqual(
            list(result[0].keys()), ["mac", "windows", "linux", "all"]
        )

    def test_sales_by_region(self):
        r = Reports()
        result = r.sales_by_region()
        self.assertIsInstance(result, dict)

    def test_price_vs_users(self):
        r = Reports()
        result = r.price_vs_users()
        self.assertIsInstance(result, list)

    def test_buys_vs_price(self):
        r = Reports()
        result = r.buys_vs_price()
        self.assertIsInstance(result, list)

    def test_singleMultiPlayer(self):
        r = Reports()
        result = r.singleMultiPlayer()
        self.assertIsInstance(result, dict)
        self.assertAlmostEqual(list(result.keys()), ["single", "multi"])

    def test_freeVsPaid(self):
        r = Reports()
        result = r.freeVsPaid()
        self.assertIsInstance(result, dict)
        self.assertAlmostEqual(list(result.keys()), ["free", "paid"])

