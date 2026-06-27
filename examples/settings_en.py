INSTALLED_APPS = [
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

LANGUAGE_CODE = "en-us"
USE_I18N = True
USE_TZ = True
STATIC_URL = "static/"

JAZZMIN_SETTINGS = {
    "site_title": "Administration",
    "site_header": "Administration",
    "site_brand": "Nova Admin",
    "welcome_sign": "Welcome to the administration panel",
    "show_ui_builder": False,
    "navigation_expanded": False,
}
