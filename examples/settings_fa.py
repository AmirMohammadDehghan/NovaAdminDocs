INSTALLED_APPS = [
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

LANGUAGE_CODE = "fa-ir"
USE_I18N = True
USE_TZ = True
STATIC_URL = "static/"

JAZZMIN_SETTINGS = {
    "site_title": "پنل مدیریت",
    "site_header": "پنل مدیریت",
    "site_brand": "Nova Admin",
    "welcome_sign": "به پنل مدیریت خوش آمدید",
    "show_ui_builder": False,
    "navigation_expanded": False,
}
