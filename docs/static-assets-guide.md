---
layout: default
title: Static assets
permalink: /docs/static-assets-guide/
nav_order: 5
description: CSS، JS، date/time picker، چارت‌ها و assetهای بدون CDN.
---

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
