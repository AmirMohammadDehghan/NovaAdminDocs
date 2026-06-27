---
layout: default
title: تست و انتشار
permalink: /docs/testing-and-release/
nav_order: 10
description: کنترل کیفیت، sanity check و release checklist.
---

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
