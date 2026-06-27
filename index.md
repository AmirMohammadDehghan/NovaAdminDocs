---
layout: default
title: Nova Admin Documentation
description: مستندات توسعه و استفاده از Nova Admin برای Django Admin
permalink: /
nav_order: 0
---

# Nova Admin Documentation

مستندات Markdown-based برای توسعه، نصب، نگه‌داری و شخصی‌سازی Nova Admin. این سایت برای GitHub Pages آماده شده و بدون وابستگی به CDN یا Bootstrap خارجی کار می‌کند.

<div class="hero-grid" markdown="0">
  <a class="hero-card" href="{{ '/docs/usage/' | relative_url }}">
    <span class="hero-card__eyebrow">شروع سریع</span>
    <strong>نصب و استفاده</strong>
    <small>مسیر نصب root-ready، تنظیمات Django و collectstatic</small>
  </a>
  <a class="hero-card" href="{{ '/docs/development-guide/' | relative_url }}">
    <span class="hero-card__eyebrow">توسعه</span>
    <strong>معماری و توسعه</strong>
    <small>ساختار template، static، customizer و گزارش‌ها</small>
  </a>
  <a class="hero-card" href="{{ '/docs/theme-customizer/' | relative_url }}">
    <span class="hero-card__eyebrow">شخصی‌سازی</span>
    <strong>Theme customizer</strong>
    <small>تنظیم رنگ، برندینگ، sidebar و حالت‌های پنل</small>
  </a>
</div>

## نقشه مستندات

| بخش | توضیح |
|---|---|
| [راهنمای استفاده]({{ '/docs/usage/' | relative_url }}) | نصب، settings.py، migrate، collectstatic و اجرای پروژه |
| [راهنمای توسعه]({{ '/docs/development-guide/' | relative_url }}) | معماری کلی، جریان رندر و قراردادهای توسعه |
| [مرجع فایل‌ها]({{ '/docs/file-reference/' | relative_url }}) | معرفی پوشه‌ها و فایل‌های مهم اپ |
| [قالب‌ها]({{ '/docs/template-guide/' | relative_url }}) | نحوه توسعه templateهای Django Admin |
| [Static assets]({{ '/docs/static-assets-guide/' | relative_url }}) | CSS، JS، date/time picker و نمودارها |
| [Theme customizer]({{ '/docs/theme-customizer/' | relative_url }}) | تنظیمات دیتابیسی مشابه admin_interface |
| [چندزبانه و RTL/LTR]({{ '/docs/i18n-bidi-guide/' | relative_url }}) | زبان‌ها، جهت صفحه و متن فارسی |
| [گزارش‌ها و چارت‌ها]({{ '/docs/reports-and-charts/' | relative_url }}) | KPIها، چارت‌ها و داده‌های dashboard |
| [دیت‌پیکر شمسی]({{ '/docs/jalali-datetime-picker/' | relative_url }}) | تنظیمات و توسعه Jalali Date/Time Picker |
| [تست و انتشار]({{ '/docs/testing-and-release/' | relative_url }}) | چک‌های فنی قبل از release |
| [رفع خطا]({{ '/docs/troubleshooting/' | relative_url }}) | خطاهای رایج نصب و UI |
| [انتشار روی GitHub Pages]({{ '/deployment/' | relative_url }}) | راه‌اندازی سایت مستندات روی GitHub |

## ساختار سایت

```text
.
├── _config.yml
├── _data/navigation.yml
├── _layouts/default.html
├── assets/
│   ├── css/site.css
│   └── js/site.js
├── docs/*.md
├── examples/*.py
├── index.md
└── deployment.md
```

## اصل نگه‌داری

محتوا را در فایل‌های Markdown تغییر بده. اگر صفحه جدید اضافه کردی، فقط کافی است فایل `.md` جدید و یک آیتم در `_data/navigation.yml` اضافه شود.
