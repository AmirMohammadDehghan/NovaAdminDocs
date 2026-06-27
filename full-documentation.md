---
layout: default
title: مستندات کامل
permalink: /full-documentation/
nav_order: 13
description: همه مستندات در یک صفحه واحد برای مطالعه یا جستجوی سریع.
---

# مستندات کامل Nova Admin

# Nova Admin RTL/LTR Documentation Pack

این بسته، مستندات توسعه و استفاده از نسخه `jazzmin_nova_rtl_v16_reports_charts_persian` است. هدف این مستندات این است که پروژه فقط یک قالب آماده نباشد، بلکه به‌عنوان یک اپ قابل توسعه در پروژه‌های Django استفاده شود.

## فایل‌های اصلی مستندات

| فایل | کاربرد |
|---|---|
| `docs/USAGE.md` | نصب، راه‌اندازی، تنظیمات Django، migrate، collectstatic و استفاده روزمره |
| `docs/DEVELOPMENT_GUIDE.md` | معماری اپ، جریان رندر admin، توسعه امن، قراردادهای کدنویسی |
| `docs/FILE_REFERENCE.md` | توضیح تک‌تک فایل‌ها و پوشه‌های مهم اپ |
| `docs/TEMPLATE_GUIDE.md` | راهنمای قالب‌ها، blocks، صفحه dashboard، changelist، changeform و login |
| `docs/STATIC_ASSETS_GUIDE.md` | CSS، JS، date/time picker، چارت‌ها و assetها |
| `docs/THEME_CUSTOMIZER.md` | مدل `NovaAdminTheme`، شخصی‌سازی رنگ، چیدمان، برندینگ و قابلیت‌ها |
| `docs/I18N_BIDI_GUIDE.md` | چندزبانه، RTL/LTR، ترجمه‌ها و نکات زبان فارسی |
| `docs/REPORTS_AND_CHARTS.md` | گزارش‌ها، KPIها، نمودارها و نحوه توسعه داشبورد |
| `docs/JALALI_DATETIME_PICKER.md` | دیت‌پیکر شمسی و تایم‌پیکر، selectorها، z-index و توسعه |
| `docs/TESTING_AND_RELEASE.md` | تست، release، sanity check و checklist قبل از تحویل |
| `docs/TROUBLESHOOTING.md` | رفع خطاهای رایج نصب، logout، layout، collectstatic و migration |
| `docs/MAINTAINER_CHECKLIST.md` | چک‌لیست نگه‌داری و توسعه آینده |

## نسخه مستندشده

این مستندات بر اساس ساختار نسخه v16 نوشته شده است:

```text
jazzmin_nova_rtl_v16_reports_charts_persian.zip
```

ویژگی‌های اصلی نسخه:

- Django Admin سفارشی با ظاهر Nova Admin
- پشتیبانی RTL فارسی و LTR چندزبانه
- حذف Bootstrap، AdminLTE، Select2، FontAwesome و CDN خارجی از مسیر فعال قالب
- dashboard گزارش‌دهی با چارت‌های SVG بدون وابستگی third-party
- مدل `NovaAdminTheme` برای شخصی‌سازی مشابه `admin_interface` و `colorfield`
- date picker شمسی و time picker اختصاصی
- ساختار root-ready: پوشه `jazzmin/` مستقیم در روت پروژه قرار می‌گیرد

## پیشنهاد توسعه

برای توسعه جدید، از فایل‌های زیر شروع کن:

1. برای تغییر ظاهر کلی: `jazzmin/static/jazzmin/css/main.css`
2. برای رفتار navbar/sidebar/picker: `jazzmin/static/jazzmin/js/main.js`
3. برای dashboard و چارت‌ها: `jazzmin/templates/admin/index.html` و tag `dashboard_report_data`
4. برای شخصی‌سازی پنل: `jazzmin/models.py`، `jazzmin/admin.py` و tag `nova_theme_css`
5. برای چندزبانه: `jazzmin/locale/fa/LC_MESSAGES/django.po` و templateهای دارای `{% raw %}{% trans %}{% endraw %}`

---

# DEVELOPMENT_GUIDE.md

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
4. متن‌ها را با `{% raw %}{% trans %}{% endraw %}` بنویس.
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

---

# FILE_REFERENCE.md

# مرجع فایل‌ها و پوشه‌ها

این فایل، نقشه توسعه تک‌تک فایل‌های نسخه v16 را توضیح می‌دهد. فایل‌های `__pycache__` و `*.pyc` در جدول نیامده‌اند چون artifact runtime هستند و نباید در repository توسعه نگه‌داری شوند.

## پوشه‌های اصلی

| مسیر | نقش |
|---|---|
| `jazzmin/` | اپ اصلی Django، root-ready و قابل قرارگیری مستقیم در روت پروژه |
| `jazzmin/templates/admin/` | override قالب‌های Django Admin |
| `jazzmin/templates/registration/` | قالب‌های login/logout/password reset/change |
| `jazzmin/templates/jazzmin/includes/` | partialهای layout فرم تغییر |
| `jazzmin/static/jazzmin/css/` | استایل اصلی، theme admin و date/time picker |
| `jazzmin/static/jazzmin/js/` | رفتارهای UI بدون Bootstrap |
| `jazzmin/locale/` | ترجمه‌ها |
| `jazzmin/migrations/` | migrationهای مدل customizer |
| `jazzmin/templatetags/` | اتصال templateها به Python logic |

## جدول فایل‌ها

| فایل | توضیح توسعه |
|---|---|
| `jazzmin/__init__.py` | تعریف پکیج Python؛ معمولاً شامل نسخه یا initialization سبک. |
| `jazzmin/admin.py` | ثبت مدل‌های داخلی اپ در Django Admin و فرم/ویجت شخصی‌سازی تم. |
| `jazzmin/apps.py` | AppConfig اپ `jazzmin`. |
| `jazzmin/compat.py` | لایه سازگاری برای importهای Django مثل reverse و NoReverseMatch. |
| `jazzmin/locale/bg/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/bg/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/locale/de/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/de/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/locale/es/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/es/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/locale/fa/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/fa/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/locale/fr/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/fr/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/locale/hu/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/hu/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/locale/ru/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/ru/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/locale/zh_Hans/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/zh_Hans/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/locale/zh_Hant/LC_MESSAGES/django.mo` | فایل ترجمه compile شده برای runtime Django. |
| `jazzmin/locale/zh_Hant/LC_MESSAGES/django.po` | فایل ترجمه قابل ویرایش برای این زبان. |
| `jazzmin/migrations/0001_initial.py` | migrationهای دیتابیس برای مدل customizer. |
| `jazzmin/migrations/0002_novaadmintheme_customizer.py` | migrationهای دیتابیس برای مدل customizer. |
| `jazzmin/migrations/__init__.py` | تعریف پکیج Python؛ معمولاً شامل نسخه یا initialization سبک. |
| `jazzmin/models.py` | مدل `NovaAdminTheme` و اعتبارسنجی رنگ‌ها/تنظیمات layout. |
| `jazzmin/settings.py` | تنظیمات پیش‌فرض Jazzmin/Nova و merge با `JAZZMIN_SETTINGS`. |
| `jazzmin/static/admin/js/cancel.js` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/static/admin/js/popup_response.js` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/static/jazzmin/css/main.css` | design system اصلی، layout، فرم‌ها، جدول‌ها، charts، RTL/LTR. |
| `jazzmin/static/jazzmin/css/nova-theme-admin.css` | استایل اختصاصی صفحه مدیریت `NovaAdminTheme` و color picker. |
| `jazzmin/static/jazzmin/css/persian-datepicker.css` | استایل datepicker شمسی و time picker. |
| `jazzmin/static/jazzmin/img/calendar-icons.svg` | آیکن SVG داخلی بدون وابستگی FontAwesome/CDN. |
| `jazzmin/static/jazzmin/img/default-log.svg` | آیکن SVG داخلی بدون وابستگی FontAwesome/CDN. |
| `jazzmin/static/jazzmin/img/default.jpg` | تصویر placeholder یا avatar پیش‌فرض. |
| `jazzmin/static/jazzmin/img/icon-calendar.svg` | آیکن SVG داخلی بدون وابستگی FontAwesome/CDN. |
| `jazzmin/static/jazzmin/img/icon-changelink.svg` | آیکن SVG داخلی بدون وابستگی FontAwesome/CDN. |
| `jazzmin/static/jazzmin/img/selector-icons.svg` | آیکن SVG داخلی بدون وابستگی FontAwesome/CDN. |
| `jazzmin/static/jazzmin/js/change_form.js` | رفتارهای صفحه فرم تغییر/افزودن، collapse و inlineها. |
| `jazzmin/static/jazzmin/js/change_list.js` | رفتارهای صفحه لیست مدل، فیلترها، search و actions. |
| `jazzmin/static/jazzmin/js/main.js` | رفتارهای اصلی UI: theme، sidebar، dropdown، tabs، date/time picker. |
| `jazzmin/static/jazzmin/js/nova-theme-admin.js` | رفتار color preview و UX فرم customizer. |
| `jazzmin/static/jazzmin/js/persian-datepicker.fa.js` | کتابخانه/locale دیت‌پیکر شمسی. |
| `jazzmin/static/jazzmin/js/persian-datepicker.js` | کتابخانه/locale دیت‌پیکر شمسی. |
| `jazzmin/templates/admin/actions.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/app_index.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/auth/user/add_form.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/auth/user/change_password.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/base.html` | قالب ریشه admin؛ shell، sidebar، topbar، asset loading، i18n dir. |
| `jazzmin/templates/admin/base_site.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/change_form.html` | صفحه افزودن/ویرایش رکورد، fieldsets، submit panel و object tools. |
| `jazzmin/templates/admin/change_form_object_tools.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/change_list.html` | صفحه لیست رکوردهای هر مدل، search، actions، pagination. |
| `jazzmin/templates/admin/change_list_object_tools.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/change_list_results.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/date_hierarchy.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/delete_confirmation.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/delete_selected_confirmation.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/edit_inline/stacked.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/edit_inline/tabular.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filer/breadcrumbs.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filer/change_form.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filer/delete_selected_files_confirmation.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filer/file/change_form.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filer/folder/change_form.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filer/folder/directory_listing.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filer/image/change_form.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filer/tools/detail_info.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/filter.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/base.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/change_list.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/change_list_export.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/change_list_export_item.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/change_list_import.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/change_list_import_export.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/change_list_import_item.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/export.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/import_export/import.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/includes/fieldset.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/includes/object_delete_summary.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/index.html` | dashboard اصلی، کارت‌های app، گزارش‌ها و recent actions. |
| `jazzmin/templates/admin/login.html` | صفحه ورود اختصاصی Nova Admin. |
| `jazzmin/templates/admin/mptt_filter.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/object_history.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/pagination.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/popup_response.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/search_form.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/solo/change_form.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/solo/object_history.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin/submit_line.html` | override یکی از قالب‌های Django Admin برای UI Nova. |
| `jazzmin/templates/admin_doc/base_docs.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/bookmarklets.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/index.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/missing_docutils.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/model_detail.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/model_index.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/template_detail.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/template_filter_index.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/template_tag_index.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/view_detail.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/admin_doc/view_index.html` | فایل پشتیبان اپ؛ هنگام توسعه قبل از حذف یا تغییر، وابستگی templateها را بررسی کن. |
| `jazzmin/templates/jazzmin/includes/carousel.html` | partialهای change form layout: tabs، collapsible، single و carousel سازگار. |
| `jazzmin/templates/jazzmin/includes/collapsible.html` | partialهای change form layout: tabs، collapsible، single و carousel سازگار. |
| `jazzmin/templates/jazzmin/includes/horizontal_tabs.html` | partialهای change form layout: tabs، collapsible، single و carousel سازگار. |
| `jazzmin/templates/jazzmin/includes/single.html` | partialهای change form layout: tabs، collapsible، single و carousel سازگار. |
| `jazzmin/templates/jazzmin/includes/vertical_tabs.html` | partialهای change form layout: tabs، collapsible، single و carousel سازگار. |
| `jazzmin/templates/jazzmin/widgets/select.html` | قالب ویجت فرم داخلی. |
| `jazzmin/templates/registration/base.html` | قالب‌های auth و password reset/change. |
| `jazzmin/templates/registration/logged_out.html` | قالب‌های auth و password reset/change. |
| `jazzmin/templates/registration/password_change_done.html` | قالب‌های auth و password reset/change. |
| `jazzmin/templates/registration/password_change_form.html` | قالب‌های auth و password reset/change. |
| `jazzmin/templates/registration/password_reset_complete.html` | قالب‌های auth و password reset/change. |
| `jazzmin/templates/registration/password_reset_confirm.html` | قالب‌های auth و password reset/change. |
| `jazzmin/templates/registration/password_reset_done.html` | قالب‌های auth و password reset/change. |
| `jazzmin/templates/registration/password_reset_form.html` | قالب‌های auth و password reset/change. |
| `jazzmin/templatetags/__init__.py` | تعریف پکیج Python؛ معمولاً شامل نسخه یا initialization سبک. |
| `jazzmin/templatetags/jazzmin.py` | template tags و filters مورد نیاز قالب‌ها، theme CSS و گزارش‌دهی. |
| `jazzmin/utils.py` | توابع کمکی منو، URL admin، permissionها و مرتب‌سازی. |
| `jazzmin/widgets.py` | ویجت‌های فرم سازگار با نسخه‌های قبلی، بدون Select2. |

## نکات مهم درباره فایل‌های legacy

برخی اسم‌ها مانند `jazzmin/widgets/select.html` یا `CHANGEFORM_TEMPLATES` برای سازگاری با Jazzmin اصلی حفظ شده‌اند، اما مسیر فعال پروژه نباید به Bootstrap، AdminLTE یا Select2 وابسته باشد.

## فایل‌هایی که پیشنهاد می‌شود از ZIP production حذف شوند

اگر قرار است پروژه وارد git شود، این موارد را پاک کن:

```bash
find jazzmin -type d -name "__pycache__" -prune -exec rm -rf {} +
find jazzmin -type f -name "*.pyc" -delete
```

---

# I18N_BIDI_GUIDE.md

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

---

# JALALI_DATETIME_PICKER.md

# دیت‌پیکر شمسی و تایم‌پیکر

## فایل‌های درگیر

| فایل | نقش |
|---|---|
| `static/jazzmin/js/persian-datepicker.js` | منطق datepicker |
| `static/jazzmin/js/persian-datepicker.fa.js` | locale/تقویم فارسی |
| `static/jazzmin/css/persian-datepicker.css` | ظاهر datepicker و time picker |
| `static/jazzmin/js/main.js` | auto-init و portal positioning |

## selectorهای تاریخ

`main.js` این فیلدها را به datepicker وصل می‌کند:

```js
input.vDateField
input.nova-jalali-date
input[data-jalali-datepicker]
input[type="text"][id="id_date"]
input[type="text"][id$="_date"]
input[type="text"][id*="date"]
input[type="text"][name$="_date"]
```

## selectorهای زمان

```js
input.vTimeField
input.nova-time-field
input[type="text"][id$="_time"]
input[type="text"][name$="_time"]
```

## auto-init

در `DOMContentLoaded`:

```js
initDateTimePickers(document);
```

برای inline formsetهای جدید:

```js
document.addEventListener('formset:added', function (event) {
    initDateTimePickers(event.target || document);
});
```

## مشکل z-index

برای اینکه picker زیر card/table نرود، datepicker و time picker به `body` منتقل می‌شوند و z-index بالا دارند:

```js
$('#ui-datepicker-div').appendTo(document.body).css('z-index', 2147483000)
```

برای time picker:

```js
document.body.appendChild(menu);
menu.style.position = 'fixed';
menu.style.zIndex = '2147483000';
```

## دلیل portal کردن time picker

اگر popup داخل card یا table بماند، ممکن است به دلیل این ویژگی‌ها بریده یا پنهان شود:

```css
overflow: hidden;
position: relative;
z-index پایین‌تر؛
```

پس time menu به `body` منتقل شده و موقعیتش با `getBoundingClientRect()` محاسبه می‌شود.

## تغییر interval زمان

در حال حاضر time picker هر ۱۵ دقیقه گزینه می‌سازد:

```js
for (let h = 0; h < 24; h += 1) {
    for (let m = 0; m < 60; m += 15) {
        ...
    }
}
```

برای ۳۰ دقیقه:

```js
for (let m = 0; m < 60; m += 30)
```

## فعال کردن datepicker برای فیلد سفارشی

در فرم یا widget خودت کلاس بده:

```html
<input type="text" class="nova-jalali-date" name="published_at">
```

یا attribute:

```html
<input type="text" data-jalali-datepicker name="date">
```

## نکات توسعه

- هرگز popup را داخل table نگه ندار.
- برای iframe/popup admin، `is_popup` را هم تست کن.
- در LTR موقعیت `left` و در RTL موقعیت `right` محاسبه می‌شود.
- اگر datepicker ظاهر نشد، بررسی کن `django.jQuery` یا jQuery داخلی admin موجود است.
- اگر فقط time picker لازم است، کلاس `nova-time-field` بده.

---

# MAINTAINER_CHECKLIST.md

# چک‌لیست نگه‌دارنده پروژه

## قبل از هر تغییر

- نسخه سالم قبلی را نگه دار.
- مشخص کن تغییر مربوط به template است یا CSS یا JS یا backend tag.
- فقط همان بخش را تغییر بده و از rewrite غیرضروری پرهیز کن.

## بعد از تغییر navbar/sidebar

- دسکتاپ باز
- دسکتاپ بسته
- موبایل off-canvas
- LTR و RTL
- dropdown account
- logout POST

## بعد از تغییر فرم‌ها

- add form
- change form
- fieldset ساده
- fieldset collapse
- inline stacked
- inline tabular
- readonly field
- errors
- help text
- submit row

## بعد از تغییر changelist

- دکمه افزودن
- search
- filters
- actions
- date hierarchy
- table horizontal scroll
- pagination
- empty result

## بعد از تغییر گزارش‌ها

- کاربر superuser
- کاربر staff محدود
- پروژه بدون LogEntry
- پروژه با چند app زیاد
- حالت show_dashboard_reports=False

## بعد از تغییر customizer

- migration
- admin fieldsets
- color input
- live preview
- nova_theme_css
- nova_theme_config
- ترجمه‌ها

## بعد از تغییر i18n

- `django-admin compilemessages`
- فارسی RTL
- انگلیسی LTR
- templateهای registration
- date/time picker

---

# REPORTS_AND_CHARTS.md

# گزارش‌دهی و چارت‌ها

## هدف گزارش‌دهی

Dashboard صفحه اصلی علاوه بر کارت‌های app، اطلاعات تحلیلی سریع از وضعیت admin ارائه می‌دهد:

- تعداد اپ‌ها
- تعداد مدل‌ها
- تعداد مدل‌های قابل افزودن
- فعالیت‌های اخیر admin
- روند فعالیت ۷ روز اخیر
- توزیع مدل‌ها بین اپ‌ها
- ترکیب اکشن‌ها: افزودن، تغییر، حذف

## فایل‌های درگیر

| فایل | نقش |
|---|---|
| `templatetags/jazzmin.py` | تولید داده گزارش با `dashboard_report_data` |
| `templates/admin/index.html` | markup گزارش‌ها و چارت‌های SVG |
| `static/jazzmin/css/main.css` | ظاهر cards، chartها و responsive layout |
| `locale/fa/LC_MESSAGES/django.po` | ترجمه متن‌های گزارش‌دهی |

## داده گزارش‌ها

تابع اصلی:

```python
@register.simple_tag
def dashboard_report_data(app_list):
    ...
```

ورودی `app_list` همان appهایی است که Django Admin با permission کاربر ساخته است. بنابراین گزارش permission-aware است.

## Summary

خروجی `summary`:

```python
{
    "apps": len(apps),
    "models": model_count,
    "addable": addable_count,
    "viewable": viewable_count,
    "model_density": model_density,
    "coverage": coverage,
    "add_coverage": add_coverage,
}
```

## Activity trend

از `LogEntry` برای ۷ روز اخیر استفاده می‌شود:

```python
entries = LogEntry.objects.filter(action_time__gte=start).only("action_time", "action_flag")
```

سپس برای هر روز count ساخته و به points SVG تبدیل می‌شود:

```python
trend_points = [
    {"x": ..., "y": ..., "count": ..., "date": ..., "label": ...},
]
```

## Action mix

اکشن‌ها بر اساس flagهای Django Admin محاسبه می‌شوند:

```python
ADDITION
CHANGE
DELETION
```

برای donut chart از `conic-gradient` استفاده می‌شود:

```python
donut_gradient = "conic-gradient(...)"
```

## چرا chart library نداریم؟

برای جلوگیری از dependency و conflict، چارت‌ها SVG/CSS native هستند. مزایا:

- بدون CDN
- بدون Bootstrap
- بدون React/Chart.js
- سریع و قابل کنترل
- مناسب admin dashboard سبک

## اضافه کردن چارت جدید

### 1. تولید داده

در `dashboard_report_data` خروجی جدید اضافه کن:

```python
"my_chart": {
    "items": [...],
    "max": ...,
}
```

### 2. markup در `index.html`

```django
<article class="nova-report-card nova-chart-card">
    <header class="nova-chart-head">
        <div>
            <span class="nova-report-label">{% raw %}{% trans 'My chart' %}{% endraw %}</span>
            <h3>{% raw %}{% trans 'Readable Persian title' %}{% endraw %}</h3>
        </div>
    </header>
    ...
</article>
```

### 3. CSS در `main.css`

```css
.nova-my-chart { ... }
.nova-my-chart-item { ... }
```

### 4. ترجمه

متن‌ها را در `django.po` اضافه و compile کن.

## بهبودهای پیشنهادی آینده

- فیلتر بازه زمانی dashboard: ۷ روز، ۳۰ روز، ۹۰ روز
- تفکیک فعالیت‌ها بر اساس user
- نمایش top models by activity
- cache کردن داده dashboard برای پروژه‌های بزرگ
- افزودن permission جدا برای مشاهده گزارش‌ها
- خروجی CSV ساده از گزارش‌ها

## نکات performance

برای پروژه‌های بزرگ، Query به `LogEntry` را محدود نگه دار:

```python
.only("action_time", "action_flag")
```

اگر گزارش‌ها سنگین شد، از cache استفاده کن:

```python
from django.core.cache import cache
```

کلید cache باید user-aware یا permission-aware باشد تا کاربر داده غیرمجاز نبیند.

---

# STATIC_ASSETS_GUIDE.md

# راهنمای فایل‌های Static

## CSS اصلی: `static/jazzmin/css/main.css`

این فایل design system کامل Nova Admin است.

### بخش‌های پیشنهادی برای نگه‌داری

```text
1. CSS reset و پایه typography
2. CSS variables و theme tokens
3. layout: shell/sidebar/topbar
4. navigation و dropdown
5. cards و dashboard
6. reports و charts
7. forms و fieldsets
8. tables و changelist
9. tabs و collapsible
10. date/time picker
11. responsive rules
12. LTR overrides
```

### tokenهای مهم

```css
--bg
--surface
--surface-solid
--field
--border
--text
--text-soft
--muted
--primary
--success
--warning
--danger
--sidebar-w
--sidebar-mini-w
--topbar-h
--content-x
--content-y
--radius-md
```

اگر لازم است ظاهر حرفه‌ای‌تر شود، ابتدا tokenها را اصلاح کن، نه componentها را پراکنده.

## CSS پنل customizer: `nova-theme-admin.css`

برای فرم مدیریت `NovaAdminTheme` استفاده می‌شود. شامل preview رنگ‌ها، ظاهر color input و live preview کارت theme است. این CSS فقط در admin مدل theme لود می‌شود.

## CSS دیت‌پیکر: `persian-datepicker.css`

برای datepicker و time picker استفاده می‌شود. نکته مهم z-index:

```css
.ui-datepicker,
#ui-datepicker-div,
.nova-time-menu {
    z-index: 2147483000;
}
```

اگر picker زیر کارت یا modal رفت، اول `overflow` والد و z-index این فایل را بررسی کن.

## JS اصلی: `static/jazzmin/js/main.js`

رفتارهای اصلی:

| تابع | مسئولیت |
|---|---|
| `initTheme()` | dark/light theme و localStorage |
| `initSidebar()` | collapse دسکتاپ و off-canvas موبایل |
| `initActiveNav()` | فعال کردن لینک فعلی sidebar |
| `initDropdowns()` | dropdownهای topbar و user menu |
| `initTabsAndCollapses()` | tabها بدون Bootstrap |
| `initPersianDatepicker()` | فعال‌سازی datepicker شمسی |
| `initTimePicker()` | time picker portal |
| `initDateTimePickers()` | wrapper برای تاریخ و زمان |

## JS صفحه change form: `change_form.js`

برای رفتارهای فرم تغییر/افزودن استفاده می‌شود. اگر inlineها یا tabs فرم مشکل داشتند، این فایل را بررسی کن.

## JS صفحه change list: `change_list.js`

برای رفتارهای changelist مثل فیلترها، actions و تعاملات صفحه لیست استفاده می‌شود.

## JS فرم customizer: `nova-theme-admin.js`

برای بهتر کردن UX مدیریت theme استفاده می‌شود؛ مثل sync کردن color pickerها و previewها.

## آیکن‌ها و تصاویر

در `static/jazzmin/img/` چند SVG داخلی وجود دارد تا نیازی به FontAwesome/CDN نباشد. اگر آیکن جدید اضافه می‌کنی SVG را local نگه دار و از icon font استفاده نکن.

## منع وابستگی‌ها

در این اپ نباید این موارد دوباره اضافه شوند:

```text
Bootstrap
AdminLTE
Select2
FontAwesome CDN
Google Fonts
jQuery CDN
```

Django Admin خودش ممکن است `django.jQuery` را برای widgetهای داخلی داشته باشد؛ استفاده از آن برای سازگاری datepicker مجاز است، اما نباید CDN اضافه شود.

---

# TEMPLATE_GUIDE.md

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
4. متن‌ها را با `{% raw %}{% trans %}{% endraw %}` بنویس.

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
- برای متن‌ها از `{% raw %}{% trans %}{% endraw %}` یا `{% raw %}{% blocktrans %}{% endraw %}` استفاده کن.
- برای لینک logout همیشه فرم POST با CSRF استفاده کن.
- برای direction-sensitive layout از CSS logical properties استفاده کن.

---

# TESTING_AND_RELEASE.md

# تست، کنترل کیفیت و Release

## تست سریع بعد از هر تغییر

```bash
python -m compileall jazzmin
python manage.py check
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py runserver
```

## مسیرهای دستی برای تست UI

```text
/admin/login/
/admin/
/admin/auth/user/
/admin/auth/user/add/
/admin/auth/user/1/change/
/admin/auth/user/1/password/
/admin/password_change/
/admin/jazzmin/novaadmintheme/
/admin/jazzmin/novaadmintheme/add/
```

## تست حالت‌های responsive

حداقل این عرض‌ها را تست کن:

```text
390px  - موبایل
768px  - تبلت
1024px - لپ‌تاپ کوچک
1440px - دسکتاپ
```

## تست RTL/LTR

فارسی:

```python
LANGUAGE_CODE = "fa-ir"
```

انگلیسی:

```python
LANGUAGE_CODE = "en-us"
```

در هر دو حالت بررسی کن:

- sidebar باز و بسته
- topbar
- dropdown user
- logout
- changelist
- changeform
- date/time picker
- dashboard charts

## تست حذف وابستگی‌ها

```bash
grep -R "bootstrap\|adminlte\|select2\|bootswatch\|fontawesome\|fonts.googleapis\|cdn" -n jazzmin || true
```

توجه: ممکن است نام‌ها در مستندات یا commentها دیده شوند؛ مسیر فعال template/static نباید آن‌ها را load کند.

## تست JS syntax

اگر node موجود است:

```bash
node --check jazzmin/static/jazzmin/js/main.js
node --check jazzmin/static/jazzmin/js/change_form.js
node --check jazzmin/static/jazzmin/js/change_list.js
node --check jazzmin/static/jazzmin/js/nova-theme-admin.js
```

## تست CSS braces

یک تست ساده:

```bash
python - <<'PY_CHECK'
from pathlib import Path
css = Path('jazzmin/static/jazzmin/css/main.css').read_text()
print(css.count('{'), css.count('}'))
assert css.count('{') == css.count('}')
PY_CHECK
```

## تست translation compile

```bash
django-admin compilemessages
```

## checklist قبل از release

- [ ] logout با POST کار می‌کند.
- [ ] sidebar دسکتاپ در حالت باز و بسته چیدمان را خراب نمی‌کند.
- [ ] sidebar موبایل off-canvas است.
- [ ] changelist دکمه Add، search، actions و pagination مرتب دارد.
- [ ] changeform submit row و object tools مرتب است.
- [ ] datepicker شمسی قابل کلیک و روی لایه‌ها نمایش داده می‌شود.
- [ ] time picker زیر card/table نمی‌رود.
- [ ] dashboard charts نمایش داده می‌شوند.
- [ ] `NovaAdminTheme` ذخیره می‌شود و CSS variables اعمال می‌شوند.
- [ ] زبان فارسی و انگلیسی هر دو درست هستند.
- [ ] هیچ CDN خارجی لود نمی‌شود.
- [ ] `__pycache__` از release حذف شده است.

## ساخت ZIP release

```bash
find jazzmin -type d -name "__pycache__" -prune -exec rm -rf {} +
find jazzmin -type f -name "*.pyc" -delete
zip -r jazzmin_nova_release.zip jazzmin
```

---

# THEME_CUSTOMIZER.md

# Nova Admin Theme Customizer

## هدف

این بخش مشابه ایده‌های `admin_interface` و `colorfield` عمل می‌کند، اما بدون وابستگی خارجی. مدل `NovaAdminTheme` تنظیمات ظاهری و رفتاری پنل را در دیتابیس نگه می‌دارد.

## مدل اصلی

فایل:

```text
jazzmin/models.py
```

مدل:

```python
class NovaAdminTheme(models.Model):
    ...
```

## گروه فیلدها

### برندینگ

| فیلد | کاربرد |
|---|---|
| `site_title` | عنوان tab مرورگر و title کلی |
| `site_header` | هدر اصلی پنل |
| `site_brand` | نام برند در sidebar |
| `brand_logo` | مسیر static لوگو |
| `favicon` | مسیر static favicon |

### رنگ‌ها

| فیلد | کاربرد |
|---|---|
| `primary_color` | رنگ اصلی CTAها، active stateها و نمودارها |
| `primary_hover_color` | رنگ hover دکمه اصلی |
| `info_color` | وضعیت info |
| `success_color` | وضعیت موفقیت و افزودن |
| `warning_color` | هشدار |
| `danger_color` | حذف و خطا |
| `dark_*` | پالت حالت dark |
| `light_*` | پالت حالت light |

همه رنگ‌ها با validator زیر کنترل می‌شوند:

```python
RegexValidator(regex=r'^#[0-9A-Fa-f]{6}$')
```

### چیدمان

| فیلد | کاربرد |
|---|---|
| `sidebar_width` | عرض sidebar در دسکتاپ |
| `sidebar_collapsed_width` | عرض sidebar بسته‌شده |
| `topbar_height` | ارتفاع topbar |
| `border_radius` | radius کلی componentها |
| `content_spacing_x` | فاصله افقی content |
| `content_spacing_y` | فاصله عمودی content |
| `font_family` | مقدار CSS font-family سفارشی |
| `compact_mode` | کاهش فاصله‌ها برای پنل‌های پرتراکم |

### قابلیت‌ها

| فیلد | کاربرد |
|---|---|
| `enable_sidebar_collapse` | فعال/غیرفعال کردن جمع شدن sidebar |
| `default_sidebar_state` | حالت پیش‌فرض sidebar |
| `show_global_search` | نمایش search در topbar |
| `show_theme_toggle` | نمایش دکمه تغییر theme |
| `show_dashboard_reports` | نمایش گزارش‌ها |
| `show_recent_actions` | نمایش recent actions |

## منطق active theme

در `admin.py` هنگام ذخیره theme فعال، بقیه themeها غیرفعال می‌شوند:

```python
if obj.is_active:
    NovaAdminTheme.objects.exclude(pk=obj.pk).update(is_active=False)
```

## تزریق CSS variables

فایل:

```text
jazzmin/templatetags/jazzmin.py
```

تابع:

```python
nova_theme_css()
```

این تابع active theme را می‌خواند و داخل `<style id="nova-db-theme">` متغیرهای CSS تولید می‌کند.

## تزریق تنظیمات JS

تابع:

```python
nova_theme_config()
```

خروجی آن:

```html
<script id="nova-admin-config">window.NOVA_ADMIN_CONFIG = {...};</script>
```

`main.js` از این config برای theme mode و sidebar state استفاده می‌کند.

## اضافه کردن فیلد جدید به customizer

1. فیلد را به `NovaAdminTheme` اضافه کن.
2. migration بساز: `python manage.py makemigrations jazzmin`
3. آن را در `NovaAdminThemeAdmin.fieldsets` اضافه کن.
4. اگر رنگی است، در `color_fields` فرم admin نیز اضافه کن.
5. اگر frontend لازم دارد، در `nova_theme_css()` یا `nova_theme_config()` استفاده کن.
6. ترجمه label/help_text را در `django.po` اضافه کن.

## مثال: اضافه کردن رنگ sidebar جداگانه

```python
sidebar_background = models.CharField(
    _('sidebar background'),
    max_length=7,
    default='#111827',
    validators=[hex_color_validator],
)
```

سپس در `nova_theme_css`:

```python
--sidebar-bg: {escape(theme.sidebar_background)};
```

و در CSS:

```css
.nova-sidebar { background: var(--sidebar-bg); }
```

---

# TROUBLESHOOTING.md

# رفع خطاهای رایج

## ظاهر پنل تغییر نکرده است

1. مطمئن شو `jazzmin` قبل از `django.contrib.admin` در `INSTALLED_APPS` است.
2. نسخه pip قبلی را حذف کن:

```bash
pip uninstall django-jazzmin jazzmin jazzmin-neo-rtl -y
```

3. static را دوباره جمع کن:

```bash
python manage.py collectstatic --noinput
```

4. hard refresh بزن:

```text
Ctrl + Shift + R
```

## sidebar هنوز حالت قبلی را دارد

localStorage را پاک کن:

```js
localStorage.removeItem("nova-admin-sidebar");
localStorage.removeItem("nova-admin-theme");
localStorage.removeItem("jazzy-sidebar-state");
localStorage.removeItem("jazzy-theme");
```

## logout کار نمی‌کند

Logout باید فرم POST با CSRF باشد. در `admin/base.html` user dropdown باید شبیه این باشد:

```django
<form method="post" action="{% raw %}{% url 'admin:logout' %}{% endraw %}">
    {% csrf_token %}
    <button type="submit">{% raw %}{% trans 'Log out' %}{% endraw %}</button>
</form>
```

## datepicker شمسی ظاهر نمی‌شود

بررسی کن:

- `persian-datepicker.css` در `base.html` لود شده باشد.
- `persian-datepicker.js` و `persian-datepicker.fa.js` لود شده باشند.
- فیلد کلاس `vDateField` یا `nova-jalali-date` داشته باشد.
- خطای JS در console نباشد.

## time picker زیر کارت می‌رود

باید `.nova-time-menu` به `body` append شود و z-index بالا داشته باشد. در `main.js` دنبال `document.body.appendChild(menu)` بگرد.

## خطای migration برای NovaAdminTheme

اگر نسخه‌های قبلی را migrate کرده‌ای و ساختار مدل عوض شده، احتمال خطای duplicate column وجود دارد. در محیط dev یکی از راه‌ها:

```bash
python manage.py migrate jazzmin zero
python manage.py migrate jazzmin
```

اگر دیتای مهم داری، قبل از این کار backup بگیر.

## متن‌ها ترجمه نشده‌اند

بعد از ویرایش `.po`:

```bash
django-admin compilemessages
```

و مطمئن شو:

```python
USE_I18N = True
LANGUAGE_CODE = "fa-ir"
```

## فیلدهای فرم ظاهر ندارند

احتمالاً widget سفارشی پروژه classهای غیرمنتظره تولید می‌کند. CSS فرم‌ها در `main.css` باید selectorهای عمومی زیر را پوشش دهد:

```css
input[type="text"],
input[type="email"],
input[type="number"],
select,
textarea
```

## دکمه‌ها نامرتب هستند

صفحه را مشخص کن:

- صفحه لیست مدل: `change_list.html` و کلاس‌های `nova-list-*`
- صفحه فرم: `submit_line.html` و `nova-submit-row`
- داشبورد: `index.html` و `nova-app-card`

## گزارش‌ها نمایش داده نمی‌شوند

در active theme بررسی کن:

```text
show_dashboard_reports = True
```

یا در دیتابیس یک theme فعال بساز.

## هیچ تمی فعال نیست

در admin وارد `Nova admin themes` شو و یکی را active کن. اگر به admin دسترسی نداری، در shell:

```bash
python manage.py shell
```

```python
from jazzmin.models import NovaAdminTheme
NovaAdminTheme.objects.create(name="Default", is_active=True)
```

---

# USAGE.md

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
