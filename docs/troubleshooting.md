---
layout: default
title: رفع خطا
permalink: /docs/troubleshooting/
nav_order: 11
description: خطاهای رایج نصب، logout، layout، collectstatic و migration.
---

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
    {% raw %}{% csrf_token %}{% endraw %}
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
