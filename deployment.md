---
layout: default
title: انتشار روی GitHub Pages
permalink: /deployment/
nav_order: 14
description: راه‌اندازی مخزن، تنظیم Pages، build محلی و نکات نگه‌داری.
---

# انتشار مستندات روی GitHub Pages

این سایت با Jekyll و Markdown ساخته شده است. محتوای اصلی داخل فایل‌های `.md` قرار دارد و ظاهر سایت از `_layouts/default.html` و فایل‌های `assets/css/site.css` و `assets/js/site.js` می‌آید.

## روش پیشنهادی: GitHub Pages از روی Branch

1. یک repository بساز یا از repository فعلی پروژه استفاده کن.
2. فایل‌های این پوشه را در ریشه repository قرار بده.
3. اگر repository از نوع project site است، در `_config.yml` مقدار `baseurl` را برابر نام repository بگذار:

```yaml
baseurl: "/your-repo-name"
```

برای repositoryهایی مثل `username.github.io` مقدار `baseurl` را خالی بگذار:

```yaml
baseurl: ""
```

4. تغییرات را push کن.
5. در GitHub برو به:

```text
Settings → Pages
```

6. Source را روی branch اصلی و مسیر `/` قرار بده.

## روش جایگزین: GitHub Actions

داخل این بسته یک workflow آماده در مسیر زیر وجود دارد:

```text
.github/workflows/pages.yml
```

اگر از GitHub Actions استفاده می‌کنی، در Settings → Pages، منبع انتشار را روی GitHub Actions بگذار.

## اجرای محلی

اگر Ruby و Bundler داری:

```bash
bundle install
bundle exec jekyll serve
```

بعد سایت را در این آدرس ببین:

```text
http://127.0.0.1:4000
```

## افزودن صفحه جدید

1. یک فایل Markdown جدید در پوشه `docs/` بساز.
2. بالای فایل front matter اضافه کن:

```yaml
---
layout: default
title: عنوان صفحه
permalink: /docs/new-page/
nav_order: 15
description: توضیح کوتاه صفحه
---
```

3. فایل `_data/navigation.yml` را به‌روزرسانی کن تا صفحه در sidebar نمایش داده شود.

## نکات مهم

- برای حفظ GitHub Pages ساده و پایدار، از plugin اختصاصی استفاده نشده است.
- فایل‌ها بدون CDN و بدون Bootstrap خارجی هستند.
- محتوای قابل ویرایش اصلی Markdown است.
- مسیرها با `relative_url` ساخته شده‌اند تا با `baseurl` هم درست کار کنند.
