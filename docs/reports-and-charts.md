---
layout: default
title: گزارش‌ها و چارت‌ها
permalink: /docs/reports-and-charts/
nav_order: 8
description: توسعه KPIها، نمودارها و داده‌های dashboard.
---

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
            <span class="nova-report-label">{% trans 'My chart' %}</span>
            <h3>{% trans 'Readable Persian title' %}</h3>
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
