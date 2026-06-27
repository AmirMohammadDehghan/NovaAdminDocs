---
layout: default
title: مرجع فایل‌ها
permalink: /docs/file-reference/
nav_order: 3
description: نقشه فایل‌ها و پوشه‌های اپ برای توسعه‌دهندگان.
---

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
