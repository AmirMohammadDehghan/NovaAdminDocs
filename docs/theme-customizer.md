---
layout: default
title: شخصی‌سازی تم
permalink: /docs/theme-customizer/
nav_order: 6
description: مدل NovaAdminTheme و تنظیمات رنگ، برندینگ و layout.
---

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
