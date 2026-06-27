---
layout: default
title: راهنمای استفاده
permalink: /docs/usage/
nav_order: 1
description: نصب، راه‌اندازی، settings.py، migrate، collectstatic و استفاده روزمره.
---

# راهنمای استفاده و نصب

## 1. پیش‌نیازها

این اپ برای Django 5 یا بالاتر طراحی شده است. برای نصب root-ready نیاز به package manager جدا ندارد؛ کافی است پوشه `jazzmin/` را در روت پروژه قرار بدهی.

ساختار نهایی پروژه باید شبیه زیر باشد:

```text
your_project/
├── manage.py
├── config/
│   └── settings.py
└── jazzmin/
    ├── templates/
    ├── static/
    ├── models.py
    ├── admin.py
    └── ...
```

## 2. نصب در پروژه Django

ابتدا نسخه‌های قبلی را حذف کن تا conflict رخ ندهد:

```bash
pip uninstall django-jazzmin jazzmin jazzmin-neo-rtl -y
```

سپس ZIP اپ را در روت پروژه extract کن:

```bash
cd /path/to/your-django-project
unzip jazzmin_nova_rtl_v16_reports_charts_persian.zip
```

اگر داخل ZIP فقط پوشه `jazzmin/` وجود دارد، نتیجه درست است.

## 3. تنظیمات `INSTALLED_APPS`

اپ باید قبل از `django.contrib.admin` قرار بگیرد تا template overrideها قبل از admin پیش‌فرض resolve شوند:

```python
INSTALLED_APPS = [
    "jazzmin",

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # apps پروژه
]
```

## 4. تنظیم زبان فارسی / انگلیسی

برای فارسی RTL:

```python
LANGUAGE_CODE = "fa-ir"
USE_I18N = True
USE_TZ = True
```

برای انگلیسی LTR:

```python
LANGUAGE_CODE = "en-us"
USE_I18N = True
USE_TZ = True
```

اگر پروژه زبان کاربر را runtime تغییر می‌دهد، `LocaleMiddleware` را اضافه کن:

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    # ...
]
```

## 5. تنظیمات پایه Jazzmin/Nova

```python
JAZZMIN_SETTINGS = {
    "site_title": "پنل مدیریت",
    "site_header": "پنل مدیریت",
    "site_brand": "Nova Admin",
    "welcome_sign": "به پنل مدیریت خوش آمدید",
    "show_ui_builder": False,
    "navigation_expanded": False,

    # optional global search
    # "search_model": "auth.User",
}
```

## 6. اجرای migration و static

مدل `NovaAdminTheme` برای شخصی‌سازی تم نیاز به migration دارد:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py runserver
```

## 7. ورود به پنل

```text
http://127.0.0.1:8000/admin/
```

بعد از ورود، در منوی اپ‌ها مدل زیر را می‌بینی:

```text
Nova admin themes
```

از این بخش می‌توانی رنگ‌ها، برندینگ، اندازه‌ها، compact mode، نمایش گزارش‌ها و recent actions را مدیریت کنی.

## 8. پاک کردن state نسخه‌های قبلی

اگر قبلاً نسخه‌های تستی نصب بوده و sidebar/theme درست دیده نمی‌شود، در Console مرورگر بزن:

```js
localStorage.removeItem("nova-admin-sidebar");
localStorage.removeItem("nova-admin-theme");
localStorage.removeItem("jazzy-sidebar-state");
localStorage.removeItem("jazzy-theme");
```

## 9. نکات production

- `DEBUG=False` را قبل از production تست کن.
- `collectstatic` را روی سرور اجرا کن.
- اگر چند تم فعال ساختی، admin هنگام save فقط همان تم active را فعال نگه می‌دارد.
- فایل‌های `__pycache__` را در repository نگه ندار.
- اگر فونت اختصاصی داری، از تنظیم `font_family` در `NovaAdminTheme` یا CSS سفارشی استفاده کن.
