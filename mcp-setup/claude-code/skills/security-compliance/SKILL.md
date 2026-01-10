---
name: Security & Compliance
description: KVKK uyumu, API güvenliği, veri şifreleme, credential yönetimi ve güvenlik best practices.
triggers:
  - "güvenlik"
  - "security"
  - "kvkk"
  - "compliance"
  - "encryption"
---

# Security & Compliance Skill

n8n workflow güvenlik ve uyumluluk rehberi.

## KVKK (Kişisel Verilerin Korunması)

### Veri Toplama
```javascript
// Minimum veri ilkesi
const userData = {
  // ✅ Sadece gerekli alanlar
  email: customer.email,
  name: customer.name,

  // ❌ Gereksiz hassas veri
  // tcNo: customer.tcNo,
  // birthDate: customer.birthDate
};
```

### Veri Saklama
```javascript
// Otomatik silme
const retentionDays = 365;
const deleteDate = new Date();
deleteDate.setDate(deleteDate.getDate() + retentionDays);

await db.insert({
  ...userData,
  delete_after: deleteDate.toISOString()
});
```

### Veri Maskeleme
```javascript
// Log'larda maskeleme
function maskEmail(email) {
  const [name, domain] = email.split('@');
  return `${name[0]}***@${domain}`;
}

function maskPhone(phone) {
  return phone.replace(/(\+90)(\d{3})(\d{3})(\d{4})/, '$1***$3****');
}

// +905551234567 → +90***123****
```

## API Security

### Authentication
```javascript
// API Key validation
const apiKey = $input.headers['x-api-key'];
const validKeys = await getValidApiKeys();

if (!validKeys.includes(apiKey)) {
  return { statusCode: 401, body: { error: 'Unauthorized' }};
}
```

### Rate Limiting
```javascript
// Redis-based rate limiting
const key = `rate_limit:${clientId}`;
const requests = await redis.incr(key);

if (requests === 1) {
  await redis.expire(key, 60); // 1 dakika
}

if (requests > 100) { // 100 req/min
  return { statusCode: 429, body: { error: 'Too many requests' }};
}
```

### Input Validation
```javascript
// Zod schema validation
const schema = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+90[5][0-9]{9}$/,
  name: /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]{2,100}$/
};

function validate(data, schema) {
  const errors = [];
  for (const [field, pattern] of Object.entries(schema)) {
    if (data[field] && !pattern.test(data[field])) {
      errors.push(`Invalid ${field}`);
    }
  }
  return errors;
}
```

### SQL Injection Prevention
```javascript
// ❌ Kötü
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ İyi - Parameterized query
const query = 'SELECT * FROM users WHERE email = $1';
const result = await db.query(query, [email]);
```

### XSS Prevention
```javascript
// HTML escape
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
```

## Webhook Security

### Signature Verification
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expected}`)
  );
}
```

### IP Whitelisting
```javascript
const allowedIPs = [
  '52.31.0.0/16',    // WhatsApp
  '35.200.0.0/16',   // Google
  '104.16.0.0/12'    // Cloudflare
];

function isAllowedIP(ip) {
  // IP range kontrolü
  return allowedIPs.some(range => ipInRange(ip, range));
}
```

## Credentials Management

### Environment Variables
```bash
# .env.example (template)
OPENAI_API_KEY=sk-xxx
WHATSAPP_TOKEN=xxx
ELEVENLABS_API_KEY=xxx

# ❌ Asla commit etme
# .gitignore
.env
.env.*
!.env.example
```

### Secrets Rotation
```yaml
# Rotation schedule
credentials:
  - name: OPENAI_API_KEY
    rotate_every: 90_days
    last_rotated: 2026-01-01
  - name: WHATSAPP_TOKEN
    rotate_every: 180_days
```

## Audit Logging

```javascript
// Her kritik işlemi logla
const auditLog = {
  timestamp: new Date().toISOString(),
  action: 'customer_data_access',
  actor: {
    type: 'workflow',
    id: $workflow.id,
    name: $workflow.name
  },
  resource: {
    type: 'customer',
    id: customerId
  },
  result: 'success',
  ip: $input.headers['x-forwarded-for']
};

await logToAuditSystem(auditLog);
```

## Compliance Checklist

### KVKK
- [ ] Açık rıza alındı
- [ ] Veri işleme amacı belirlendi
- [ ] Minimum veri ilkesi uygulandı
- [ ] Silme prosedürü tanımlı
- [ ] Veri ihlali prosedürü hazır

### GDPR (EU müşteriler için)
- [ ] Consent management
- [ ] Right to erasure
- [ ] Data portability
- [ ] Privacy by design

### PCI-DSS (Ödeme)
- [ ] Kart bilgisi saklanmıyor
- [ ] Tokenization kullanılıyor
- [ ] TLS 1.2+ zorunlu
