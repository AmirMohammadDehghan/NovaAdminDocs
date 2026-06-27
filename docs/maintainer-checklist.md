---
layout: default
title: چک‌لیست نگه‌داری
permalink: /docs/maintainer-checklist/
nav_order: 12
description: چک‌لیست عملی برای تغییرات آینده.
---

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
