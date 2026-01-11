---
name: Testing & Debugging
description: n8n workflow test stratejileri - unit testing, integration testing, debugging teknikleri ve monitoring.
triggers:
  - "test"
  - "debug"
  - "workflow test"
  - "hata ayıklama"
---

# Testing & Debugging Skill

n8n workflow'larını test etme ve debug etme rehberi.

## Test Stratejisi

### 1. Unit Testing (Node Seviyesi)
```javascript
// Her node'u izole test et
const testInput = {
  json: {
    email: "test@example.com",
    name: "Test User"
  }
};

const result = await executeNode('Transform Data', testInput);
expect(result.json.email).toBe('test@example.com');
```

### 2. Integration Testing
```javascript
// Birden fazla node'u birlikte test et
const workflow = loadWorkflow('Grain_Customer_Onboarding_v1.json');
const result = await executeWorkflow(workflow, mockInput);
expect(result.status).toBe('success');
```

### 3. E2E Testing
```bash
# Webhook trigger ile tam akış testi
curl -X POST https://n8n.domain.com/webhook/test-onboarding \
  -H "Content-Type: application/json" \
  -d '{"email": "test@test.com", "name": "Test"}'
```

## Mock Data

### Türkçe Test Verileri
```json
{
  "customer": {
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "phone": "+905551234567",
    "address": {
      "street": "Atatürk Cad. No: 123",
      "district": "Kadıköy",
      "city": "İstanbul",
      "postal_code": "34710"
    }
  },
  "business": {
    "name": "Yılmaz Ticaret",
    "tax_id": "1234567890",
    "sector": "Perakende"
  }
}
```

### Edge Cases
```json
{
  "empty_fields": { "name": "", "email": null },
  "unicode": { "name": "Şükrü Öztürk" },
  "long_text": { "description": "A".repeat(10000) },
  "special_chars": { "name": "O'Connor & Co." },
  "html_injection": { "name": "<script>alert('xss')</script>" }
}
```

## Debugging Teknikleri

### 1. Console Logging
```javascript
// Code node içinde
console.log('=== DEBUG START ===');
console.log('Input:', JSON.stringify($input.all(), null, 2));
console.log('Item count:', $input.all().length);
console.log('=== DEBUG END ===');
```

### 2. Execution Data Inspection
```
n8n UI → Executions → Failed execution → Her node'un output'unu kontrol et
```

### 3. Sticky Notes
```
Workflow'a Sticky Note ekle:
- Bilinen sorunlar
- Çözüm notları
- TODO'lar
```

### 4. Error Logging Node
```json
{
  "name": "Log Error Details",
  "type": "n8n-nodes-base.code",
  "parameters": {
    "jsCode": "const error = $input.first().json;\nconsole.error('WORKFLOW ERROR:', {\n  workflow: $workflow.name,\n  node: error.node,\n  message: error.message,\n  timestamp: new Date().toISOString(),\n  execution_id: $execution.id\n});\nreturn items;"
  }
}
```

## Common Issues & Solutions

### 1. "Cannot read property of undefined"
```javascript
// Problem
const name = $json.data.customer.name;

// Solution
const name = $json.data?.customer?.name ?? 'Unknown';
```

### 2. Rate Limiting
```javascript
// Problem: 429 Too Many Requests

// Solution: Add delay between requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
for (const item of items) {
  await processItem(item);
  await delay(100); // 100ms delay
}
```

### 3. Memory Issues
```javascript
// Problem: Large data sets cause memory errors

// Solution: Process in chunks
const chunkSize = 100;
for (let i = 0; i < items.length; i += chunkSize) {
  const chunk = items.slice(i, i + chunkSize);
  await processChunk(chunk);
}
```

### 4. Timezone Issues
```javascript
// Problem: Wrong dates

// Solution: Always use UTC
const date = new Date();
const utcDate = date.toISOString();
const turkeyDate = new Intl.DateTimeFormat('tr-TR', {
  timeZone: 'Europe/Istanbul'
}).format(date);
```

## Performance Profiling

```javascript
// Execution time measurement
const startTime = Date.now();

// ... workflow code ...

const duration = Date.now() - startTime;
console.log(`Execution time: ${duration}ms`);

if (duration > 5000) {
  console.warn('SLOW EXECUTION WARNING');
}
```

## Monitoring Dashboard Metrics

| Metric | Hedef | Alarm |
|--------|-------|-------|
| Success Rate | >99% | <95% |
| Avg Duration | <5s | >10s |
| Error Rate | <1% | >5% |
| Queue Size | <100 | >500 |
