---
layout: default
title: قالب‌ها
permalink: /docs/template-guide/
nav_order: 4
description: راهنمای templateها، blockها، dashboard، changelist، changeform و login.
---

# راهنمای قالب‌ها

## اصل override در Django Admin

Django Admin قالب‌ها را از مسیر `templates/admin/` resolve می‌کند. چون اپ `jazzmin` قبل از `django.contrib.admin` در `INSTALLED_APPS` قرار دارد، قالب‌های این اپ جایگزین قالب‌های پیش‌فرض Django می‌شوند.

## `admin/base.html`

مهم‌ترین قالب پروژه است. مسئولیت‌ها:

- تعیین `lang` و `dir` بر اساس زبان فعال Django.
- لود `main.css` و `persian-datepicker.css`.
- تزریق CSS variables دیتابیسی با `{% nova_theme_css %}`.
- تزریق config JS با `{% nova_theme_config %}`.
- ساخت sidebar، topbar، user menu و logout با POST.
- تعریف `nova-shell` برای main content.
- لود `main.js` و datepicker JSها.

نکته توسعه: اگر navbar یا sidebar خراب شد، قبل از CSS این فایل را بررسی کن؛ HTML ساختاری باید ساده و بدون کلاس‌های Bootstrap بماند.

## `admin/base_site.html`

لایه‌ای سبک روی `base.html` است که blocks اصلی site را فراهم می‌کند. معمولاً کمتر نیاز به تغییر دارد، مگر اینکه بخواهی branding یا blockهای global را عوض کنی.

## `admin/index.html`

صفحه dashboard اصلی است و شامل این بخش‌ها می‌شود:

- گزارش‌ها و KPIها
- چارت‌های SVG
- کارت‌های app و مدل‌ها
- recent actions

داده‌های گزارش از tag زیر می‌آید:

```django
{% dashboard_report_data dashboard_list as dashboard_report %}
```

برای اضافه کردن چارت جدید:

1. داده را در `dashboard_report_data` اضافه کن.
2. markup را در `index.html` اضافه کن.
3. CSS را در بخش reportهای `main.css` بنویس.
4. متن‌ها را با `{% trans %}` بنویس.

## `admin/change_list.html`

صفحه‌ای است که بعد از کلیک روی یک مدل دیده می‌شود و شامل دکمه ساخت instance جدید، جستجو، actions، جدول رکوردها و pagination است.

بخش‌های مهم:

```django
{% search_form cl %}
{% admin_actions %}
{% change_list_object_tools %}
{% result_list cl %}
{% pagination cl %}
```

spacing دکمه‌ها و متن‌ها در این صفحه بیشتر به کلاس‌های زیر وابسته است:

```css
.nova-list-head
.nova-list-tools
.nova-list-toolbar
.nova-object-tools
.nova-changelist-card
```

## `admin/change_form.html`

صفحه add/change هر رکورد است. ساختار کلی:

```text
nova-change-form
└── form
    └── nova-form-layout
        ├── nova-form-main
        │   └── fieldsets / tabs / inlines
        └── nova-form-side
            └── submit_row + object tools
```

اگر دکمه‌های save یا delete نامرتب شدند، فایل‌های زیر را با هم بررسی کن:

- `templates/admin/change_form.html`
- `templates/admin/submit_line.html`
- `static/jazzmin/css/main.css`

## `admin/includes/fieldset.html`

رندر فیلدها، labelها، help text، errors و readonly fields. برای اصلاح ظاهر inputها فقط CSS کافی نیست؛ گاهی markup fieldset هم باید حفظ شود.

## `admin/edit_inline/stacked.html` و `tabular.html`

برای inline formsetها استفاده می‌شوند. بعد از اضافه شدن inline جدید، رویداد `formset:added` در `main.js` باعث init دوباره date/time picker می‌شود.

## `admin/search_form.html`

فرم جستجوی changelist. باید بدون Bootstrap و با layout مستقل Nova بماند.

## `admin/actions.html`

actions گروهی در changelist را رندر می‌کند. این بخش باید با select native کار کند، نه Select2.

## `admin/pagination.html`

pagination با template tag `jazzmin_paginator_number` کار می‌کند. کلاس‌های `page-item` و `page-link` ممکن است legacy به نظر برسند، اما در CSS خود Nova style شده‌اند و Bootstrap لود نمی‌شود.

## `registration/base.html`

base مخصوص صفحات login/logout/password reset. این فایل نیز مثل `admin/base.html` باید `dir` را از `LANGUAGE_BIDI` بگیرد.

## قوانین توسعه template

- هیچ `class="btn btn-*"` جدید اضافه نکن.
- هیچ `data-toggle` یا `data-bs-*` اضافه نکن.
- برای متن‌ها از `{% trans %}` یا `{% blocktrans %}` استفاده کن.
- برای لینک logout همیشه فرم POST با CSRF استفاده کن.
- برای direction-sensitive layout از CSS logical properties استفاده کن.
