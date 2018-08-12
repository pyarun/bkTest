from vgsales.reports import Reports
from pprint import pprint


def run():
    r = Reports()
    pprint(r.freeVsPaid())

