# Nova Admin Documentation Site

این repository یک سایت مستندات Markdown-based برای Nova Admin است و برای GitHub Pages آماده شده است.

## شروع سریع

```bash
git init
git add .
git commit -m "Add Nova Admin docs site"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

سپس در GitHub:

```text
Settings → Pages → Build and deployment
```

برای branch publishing، مسیر root را انتخاب کن. اگر repository از نوع project site است، در `_config.yml` مقدار `baseurl` را برابر نام repository قرار بده.

## ویرایش محتوا

تمام محتوای اصلی داخل فایل‌های Markdown است:

```text
index.md
docs/*.md
deployment.md
```

برای افزودن صفحه جدید، فایل Markdown جدید بساز و آن را در `_data/navigation.yml` ثبت کن.
