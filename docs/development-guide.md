---
layout: default
title: راهنمای توسعه
permalink: /docs/development-guide/
nav_order: 2
description: معماری اپ، جریان رندر، قراردادهای توسعه و مسیر افزودن قابلیت جدید.
---

# راهنمای توسعه Nova Admin

## هدف معماری

این اپ روی ایده `root-ready Django app` ساخته شده است؛ یعنی بدون انتشار در PyPI هم می‌توانی پوشه `jazzmin/` را داخل روت پروژه بگذاری و از آن به‌عنوان override کامل Django Admin استفاده کنی.

اصول طراحی توسعه:

1. عدم وابستگی فعال به Bootstrap، AdminLTE، Select2 و CDN خارجی.
2. RTL فارسی به‌عنوان مسیر اصلی، LTR به‌عنوان حالت مکمل با CSS scoped.
3. UI با CSS variables و مدل دیتابیسی `NovaAdminTheme` قابل تغییر باشد.
4. رفتارهای frontend در چند فایل JS کوچک و قابل تست نگه داشته شوند.
5. templateها تا حد امکان از Django Admin context استاندارد استفاده کنند.

## جریان رندر Admin

رندر یک صفحه admin معمولاً این مسیر را طی می‌کند:

```text
Django Admin view
  ↓
admin/base.html
  ↓
admin/base_site.html
  ↓
admin/index.html | change_list.html | change_form.html | login.html | ...
  ↓
templatetags/jazzmin.py
  ↓
static/jazzmin/css/main.css + static/jazzmin/js/main.js
```

## بخش‌های مهم backend

### `models.py`

مدل `NovaAdminTheme` تنظیمات دیتابیسی UI را نگه می‌دارد. اگر قابلیت جدیدی برای شخصی‌سازی اضافه می‌کنی، معمولاً باید اینجا فیلد اضافه شود.

### `admin.py`

مدل `NovaAdminTheme` در admin ثبت شده و widget رنگی داخلی (`ColorInput`) دارد. اگر فیلد جدیدی به مدل اضافه کردی، fieldsets این فایل را نیز به‌روز کن.

### `templatetags/jazzmin.py`

مهم‌ترین فایل اتصال backend به frontend است. این فایل:

- منوی کناری را از `available_apps` می‌سازد.
- تنظیمات `JAZZMIN_SETTINGS` را با `NovaAdminTheme` merge می‌کند.
- CSS variables را از دیتابیس تولید می‌کند.
- config مورد نیاز JS را در صفحه inject می‌کند.
- داده‌های گزارش‌دهی dashboard را می‌سازد.

## بخش‌های مهم frontend

### `static/jazzmin/css/main.css`

تمام design system اصلی در این فایل است:

- tokenهای رنگ، فاصله، radius و typography
- layout پایه shell/sidebar/topbar
- cardها، formها، tableها، tabs، pagination
- dashboard reports و charts
- date/time picker
- LTR/RTL overrides

قانون توسعه: ابتدا token بساز، سپس component را با tokenها توسعه بده. از مقدارهای پراکنده مثل `padding: 17px` بدون دلیل استفاده نکن.

### `static/jazzmin/js/main.js`

رفتارهای عمومی:

- dark/light theme
- sidebar collapse و mobile off-canvas
- dropdownها
- tabs/collapse بدون Bootstrap
- datepicker شمسی
- time picker portal
- active nav detection

قانون توسعه: هیچ logic وابسته به Bootstrap اضافه نکن. برای هر رفتار جدید از attributeهای `data-nova-*` استفاده کن.

## قرارداد نام‌گذاری CSS

پیشوند اصلی componentها:

```text
nova-
```

نمونه‌ها:

```css
.nova-sidebar
.nova-topbar
.nova-card
.nova-report-panel
.nova-time-menu
```

برای stateها از کلاس‌های واضح استفاده کن:

```css
.is-open
.is-active
.is-disabled
.nova-sidebar-collapsed
.nova-sidebar-open
```

## توسعه بدون خراب کردن RTL

هنگام تغییر layout، همزمان این دو حالت را تست کن:

```html
<html dir="rtl">
<html dir="ltr">
```

در CSS، برای تفاوت‌های جهت از selectorهای زیر استفاده کن:

```css
html[dir="rtl"] .nova-component { ... }
html[dir="ltr"] .nova-component { ... }
```

ترجیح بده از logical properties استفاده کنی:

```css
padding-inline: 16px;
margin-inline-start: 8px;
border-inline-end: 1px solid var(--border);
```

## اضافه کردن یک بخش جدید به dashboard

1. داده را در `dashboard_report_data(app_list)` بساز.
2. markup را در `templates/admin/index.html` اضافه کن.
3. CSS بخش جدید را در قسمت گزارش‌ها در `main.css` قرار بده.
4. متن‌ها را با `{% trans %}` بنویس.
5. ترجمه فارسی را در `locale/fa/LC_MESSAGES/django.po` اضافه کن.
6. `django.mo` را compile کن.

## اضافه کردن setting جدید به customizer

1. فیلد جدید در `NovaAdminTheme` اضافه کن.
2. migration بساز.
3. در `NovaAdminThemeAdmin.fieldsets` نمایش بده.
4. اگر frontend نیاز دارد، در `nova_theme_css` یا `nova_theme_config` inject کن.
5. ترجمه label و help_text را اضافه کن.

## فایل‌هایی که نباید در توسعه commit شوند

```text
__pycache__/
*.pyc
.DS_Store
staticfiles/
node_modules/
```

## پیشنهاد ساخت branchها

```text
feature/reporting-widgets
feature/theme-customizer
fix/sidebar-collapse-ltr
fix/jalali-picker-z-index
refactor/template-blocks
```
