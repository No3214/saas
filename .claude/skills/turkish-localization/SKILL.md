# Turkish Localization Skill

Grain SaaS için Türkçe dil desteği ve yerelleştirme kuralları.

## Genel Kurallar

### Mesaj Şablonları

```javascript
// WhatsApp mesajı
const whatsappMessage = `
Merhaba {{customer_name}},

{{message_content}}

Saygılarımızla,
{{business_name}}
`;

// Email şablonu
const emailSubject = "{{business_name}} - {{subject}}";
const emailBody = `
Sayın {{customer_name}},

{{content}}

İyi günler dileriz.

{{business_name}}
{{phone}} | {{email}}
`;
```

### Tarih/Saat Formatı

```javascript
// Türkiye formatı
const dateFormat = "DD.MM.YYYY";
const timeFormat = "HH:mm";
const dateTimeFormat = "DD.MM.YYYY HH:mm";

// Örnek: 09.01.2026 14:30
```

### Para Birimi

```javascript
const currency = "TRY";
const currencySymbol = "₺";
const currencyFormat = "{{amount}} ₺"; // 1.500,00 ₺
const decimalSeparator = ",";
const thousandsSeparator = ".";
```

## AI Prompt Şablonları

### Genel Asistan

```
Sen profesyonel bir Türk iş asistanısın.
- Kibar ve profesyonel Türkçe kullan
- "Siz" hitabını tercih et
- Kısa ve öz yanıtlar ver
- Emoji kullanma (istenmedikçe)
```

### Review Yanıtı

```
Sen bir müşteri ilişkileri uzmanısın.
Google/Facebook yorumlarına Türkçe yanıt yaz.

Kurallar:
- Olumsuz yorumlarda özür dile, çözüm öner
- Olumlu yorumlarda teşekkür et
- İşletme adını kullan: {{business_name}}
- 2-3 cümle ile sınırlı tut
- Profesyonel ve samimi ol
```

### Randevu Hatırlatma

```
Sayın {{customer_name}},

{{service_name}} randevunuz için hatırlatma:

📅 Tarih: {{date}}
⏰ Saat: {{time}}
📍 Adres: {{address}}

İptal veya değişiklik için: {{phone}}

{{business_name}}
```

## Sektörel Terimler

### Restoran/Otel
| English | Türkçe |
|---------|--------|
| Reservation | Rezervasyon |
| Check-in | Giriş |
| Check-out | Çıkış |
| Room service | Oda servisi |
| Menu | Menü |

### Emlak
| English | Türkçe |
|---------|--------|
| Property | Mülk |
| Land | Arazi / Parsel |
| Deed | Tapu |
| Zoning | İmar |
| Square meter | Metrekare (m²) |

### SEO/Dijital
| English | Türkçe |
|---------|--------|
| Keyword | Anahtar kelime |
| Ranking | Sıralama |
| Traffic | Trafik |
| Conversion | Dönüşüm |
| Lead | Potansiyel müşteri |

## Hata Mesajları

```javascript
const errors = {
  "not_found": "Kayıt bulunamadı",
  "invalid_input": "Geçersiz giriş",
  "server_error": "Sunucu hatası, lütfen tekrar deneyin",
  "auth_failed": "Kimlik doğrulama başarısız",
  "rate_limit": "Çok fazla istek, lütfen bekleyin",
  "validation": "Lütfen tüm alanları doldurun"
};
```

## Telefon Formatı

```javascript
// Türkiye telefon
const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
const phoneFormat = "+90 5XX XXX XX XX";

// Sabit hat
const landlineRegex = /^(\+90|0)?[2-4][0-9]{9}$/;
```

## Adres Formatı

```
{{street}} No: {{building_no}}
{{district}} / {{city}} {{postal_code}}
Türkiye
```
