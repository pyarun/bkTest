from .settings import *

MONGODB_DATABASES = {
    "default": {
        "name": "bkTest-Test",
        "host": "172.17.0.2",
        # "password": database_password,
        # "username": database_user,
        "tz_aware": True,  # if you using timezones in django (USE_TZ = True)
    }
}

