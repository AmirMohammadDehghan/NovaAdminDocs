---
layout: default
title: دیت‌پیکر شمسی
permalink: /docs/jalali-datetime-picker/
nav_order: 9
description: selectorها، z-index، popup و توسعه date/time picker.
---

# دیت‌پیکر شمسی و تایم‌پیکر

## فایل‌های درگیر

| فایل | نقش |
|---|---|
| `static/jazzmin/js/persian-datepicker.js` | منطق datepicker |
| `static/jazzmin/js/persian-datepicker.fa.js` | locale/تقویم فارسی |
| `static/jazzmin/css/persian-datepicker.css` | ظاهر datepicker و time picker |
| `static/jazzmin/js/main.js` | auto-init و portal positioning |

## selectorهای تاریخ

`main.js` این فیلدها را به datepicker وصل می‌کند:

```js
input.vDateField
input.nova-jalali-date
input[data-jalali-datepicker]
input[type="text"][id="id_date"]
input[type="text"][id$="_date"]
input[type="text"][id*="date"]
input[type="text"][name$="_date"]
```

## selectorهای زمان

```js
input.vTimeField
input.nova-time-field
input[type="text"][id$="_time"]
input[type="text"][name$="_time"]
```

## auto-init

در `DOMContentLoaded`:

```js
initDateTimePickers(document);
```

برای inline formsetهای جدید:

```js
document.addEventListener('formset:added', function (event) {
    initDateTimePickers(event.target || document);
});
```

## مشکل z-index

برای اینکه picker زیر card/table نرود، datepicker و time picker به `body` منتقل می‌شوند و z-index بالا دارند:

```js
$('#ui-datepicker-div').appendTo(document.body).css('z-index', 2147483000)
```

برای time picker:

```js
document.body.appendChild(menu);
menu.style.position = 'fixed';
menu.style.zIndex = '2147483000';
```

## دلیل portal کردن time picker

اگر popup داخل card یا table بماند، ممکن است به دلیل این ویژگی‌ها بریده یا پنهان شود:

```css
overflow: hidden;
position: relative;
z-index پایین‌تر؛
```

پس time menu به `body` منتقل شده و موقعیتش با `getBoundingClientRect()` محاسبه می‌شود.

## تغییر interval زمان

در حال حاضر time picker هر ۱۵ دقیقه گزینه می‌سازد:

```js
for (let h = 0; h < 24; h += 1) {
    for (let m = 0; m < 60; m += 15) {
        ...
    }
}
```

برای ۳۰ دقیقه:

```js
for (let m = 0; m < 60; m += 30)
```

## فعال کردن datepicker برای فیلد سفارشی

در فرم یا widget خودت کلاس بده:

```html
<input type="text" class="nova-jalali-date" name="published_at">
```

یا attribute:

```html
<input type="text" data-jalali-datepicker name="date">
```

## نکات توسعه

- هرگز popup را داخل table نگه ندار.
- برای iframe/popup admin، `is_popup` را هم تست کن.
- در LTR موقعیت `left` و در RTL موقعیت `right` محاسبه می‌شود.
- اگر datepicker ظاهر نشد، بررسی کن `django.jQuery` یا jQuery داخلی admin موجود است.
- اگر فقط time picker لازم است، کلاس `nova-time-field` بده.
