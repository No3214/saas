# n8n Best Practices Skill

n8n workflow geliştirme için en iyi pratikler.

## Workflow Organizasyonu

### Naming Convention
```
Grain_[Module]_[Feature]_v[Version].json

Örnekler:
- Grain_Customer_Onboarding_v1.json
- Grain_SEO_Site_Audit_v2.json
- Grain_WhatsApp_Voice_Agent_v1.json
```

### Node Naming
```
✅ İyi: "Fetch Customer Data", "Send WhatsApp Message"
❌ Kötü: "HTTP Request", "Code", "IF"
```

### Positioning
```
Trigger: x=250
İlk işlem: x=450
Sonraki: +200 her adımda
Paralel dallar: y±150
```

## Performance

### 1. Batch Processing
```javascript
// Tek tek yerine batch işle
const batchSize = 50;
const batches = [];
for (let i = 0; i < items.length; i += batchSize) {
  batches.push(items.slice(i, i + batchSize));
}
return batches;
```

### 2. Parallel Execution
```json
{
  "settings": {
    "executionOrder": "v1",
    "maxParallelExecutions": 5
  }
}
```

### 3. Caching
```javascript
// Redis veya memory cache kullan
const cacheKey = `customer_${customerId}`;
const cached = await $cache.get(cacheKey);
if (cached) return cached;

const data = await fetchCustomer(customerId);
await $cache.set(cacheKey, data, 3600); // 1 saat
return data;
```

## Error Handling

### Try-Catch Pattern
```javascript
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  return {
    success: false,
    error: error.message,
    retryable: error.status === 429
  };
}
```

### Retry Logic
```json
{
  "retry": {
    "enabled": true,
    "maxTries": 3,
    "waitBetweenTries": 5000
  }
}
```

## Data Transformation

### Code Node Best Practices
```javascript
// Input validation
if (!$input.first().json.email) {
  throw new Error('Email is required');
}

// Clean transformation
const transformed = items.map(item => ({
  id: item.json.id,
  name: item.json.name?.trim(),
  email: item.json.email?.toLowerCase(),
  created: new Date().toISOString()
}));

return transformed;
```

### Expression Best Practices
```
✅ {{ $json.data?.customer?.name ?? 'Unknown' }}
❌ {{ $json.data.customer.name }}

✅ {{ $now.format('YYYY-MM-DD') }}
❌ {{ new Date().toISOString() }}
```

## Credentials Management

```
✅ Environment variables kullan
✅ Her ortam için ayrı credentials
❌ Hardcoded API keys
❌ Credentials'ı log'lama
```

## Webhook Security

```javascript
// HMAC Signature Verification
const crypto = require('crypto');

const signature = $input.headers['x-signature'];
const payload = JSON.stringify($input.body);
const secret = $credentials.webhookSecret;

const expected = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

if (signature !== `sha256=${expected}`) {
  throw new Error('Invalid webhook signature');
}
```

## Logging

```javascript
// Structured logging
console.log(JSON.stringify({
  workflow: 'Customer_Onboarding',
  action: 'send_welcome_email',
  customer_id: customerId,
  status: 'success',
  duration_ms: Date.now() - startTime
}));
```

## Testing Checklist

- [ ] Tüm edge case'ler test edildi
- [ ] Error handling çalışıyor
- [ ] Rate limit'ler hesaba katıldı
- [ ] Credentials doğru environment'ta
- [ ] Logging yeterli seviyede
- [ ] Performance kabul edilebilir
