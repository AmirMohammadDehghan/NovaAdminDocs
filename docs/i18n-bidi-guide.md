---
layout: default
title: چندزبانه و RTL/LTR
permalink: /docs/i18n-bidi-guide/
nav_order: 7
description: راهنمای زبان‌ها، جهت صفحه و متن فارسی.
---

# راهنمای چندزبانه و RTL/LTR

## تعیین جهت صفحه

در `admin/base.html` و `registration/base.html` از tagهای Django استفاده شده است:

```django
{% get_current_language as LANGUAGE_CODE %}
{% get_current_language_bidi as LANGUAGE_BIDI %}

<html lang="{{ LANGUAGE_CODE }}" dir="{% raw %}{% if LANGUAGE_BIDI %}{% endraw %}rtl{% else %}ltr{% raw %}{% endif %}{% endraw %}">
```

اگر `LANGUAGE_CODE = "fa-ir"` باشد، `LANGUAGE_BIDI` معمولاً true است و صفحه RTL می‌شود.

## تنظیم فارسی

```python
LANGUAGE_CODE = "fa-ir"
USE_I18N = True
```

## تنظیم انگلیسی

```python
LANGUAGE_CODE = "en-us"
USE_I18N = True
```

## LocaleMiddleware

اگر زبان در runtime تغییر می‌کند:

```python
MIDDLEWARE = [
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
]
```

## ترجمه متن‌ها

هر متن قابل ترجمه در template باید یکی از این دو شکل باشد:

```django
{% raw %}{% trans 'Dashboard' %}{% endraw %}
{% raw %}{% blocktrans with name=opts.verbose_name %}{% endraw %}Add {{ name }}{% raw %}{% endblocktrans %}{% endraw %}
```

در Python:

```python
from django.utils.translation import gettext_lazy as _
```

## فایل ترجمه فارسی

```text
jazzmin/locale/fa/LC_MESSAGES/django.po
```

بعد از ویرایش:

```bash
django-admin compilemessages
```

یا اگر فقط اپ را compile می‌کنی:

```bash
cd jazzmin
django-admin compilemessages -l fa
```

## قواعد UI فارسی

- برای متن فارسی `letter-spacing` استفاده نکن مگر برای label انگلیسی کوچک.
- line-height متن‌ها بین `1.7` تا `2` مناسب‌تر است.
- عبارت‌های فارسی رسمی‌تر:
  - `افزودن رکورد` به جای `Add`
  - `گزارش فعالیت‌ها` به جای `Activity report`
  - `آخرین تغییرات` به جای `Recent actions`
- برای اعداد می‌توان در آینده filter تبدیل ارقام فارسی اضافه کرد، اما در admin داده‌محور بهتر است اعداد خام Django حفظ شوند.

## قواعد LTR

برای LTR از selectorهای scoped استفاده شده است:

```css
html[dir="ltr"] .nova-sidebar { left: 0; right: auto; }
html[dir="ltr"] .nova-shell { margin-left: var(--sidebar-w); margin-right: 0; }
```

هنگام اضافه کردن component جدید، حتماً حالت LTR را هم تست کن.

## Date/Time picker و زبان

`main.js` زبان صفحه را از attributeها می‌خواند:

```js
const htmlLang = document.documentElement.lang || 'fa-ir';
const htmlDir = document.documentElement.dir || 'rtl';
```

اگر زبان فارسی باشد، datepicker با تقویم شمسی و RTL تنظیم می‌شود؛ در حالت LTR موقعیت popup با چپ/راست متفاوت محاسبه می‌شود.
