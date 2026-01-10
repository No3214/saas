# Error Handling Skill

n8n workflow hata yönetimi rehberi.

## Error Types

| Tip | Kod | Açıklama | Aksiyon |
|-----|-----|----------|---------|
| Validation | 400 | Geçersiz input | Kullanıcıya bildir |
| Auth | 401/403 | Yetki hatası | Credentials kontrol |
| NotFound | 404 | Kaynak yok | Fallback kullan |
| RateLimit | 429 | Limit aşıldı | Retry with backoff |
| Server | 500 | Sunucu hatası | Log + Alert |
| Timeout | 504 | Zaman aşımı | Retry veya queue |

## Error Handler Node

```json
{
  "name": "Global Error Handler",
  "type": "n8n-nodes-base.errorTrigger",
  "position": [250, 500],
  "parameters": {}
}
```

## Try-Catch Pattern

```javascript
// Code node içinde
async function safeExecute(fn, fallback = null) {
  try {
    return await fn();
  } catch (error) {
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    if (fallback !== null) {
      return fallback;
    }
    throw error;
  }
}

// Kullanım
const result = await safeExecute(
  () => fetchCustomerData(customerId),
  { name: 'Unknown', email: null } // fallback
);
```

## Retry Strategy

### Exponential Backoff
```javascript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;

      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      console.log(`Retry ${attempt}/${maxRetries} after ${delay}ms`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

### Conditional Retry
```javascript
function shouldRetry(error) {
  const retryableCodes = [408, 429, 500, 502, 503, 504];
  return retryableCodes.includes(error.statusCode);
}

async function smartRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!shouldRetry(error) || attempt === maxRetries) {
        throw error;
      }
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}
```

## Error Notification

### Slack Alert
```json
{
  "name": "Send Error to Slack",
  "type": "n8n-nodes-base.slack",
  "parameters": {
    "channel": "#workflow-alerts",
    "text": "🚨 Workflow Error",
    "attachments": [
      {
        "color": "danger",
        "fields": [
          { "title": "Workflow", "value": "={{ $workflow.name }}" },
          { "title": "Error", "value": "={{ $json.error.message }}" },
          { "title": "Node", "value": "={{ $json.error.node }}" },
          { "title": "Time", "value": "={{ $now.format('DD.MM.YYYY HH:mm') }}" }
        ]
      }
    ]
  }
}
```

### Email Alert
```json
{
  "name": "Send Error Email",
  "type": "n8n-nodes-base.emailSend",
  "parameters": {
    "to": "alerts@grain.com",
    "subject": "🚨 [{{ $workflow.name }}] Workflow Error",
    "text": "Error: {{ $json.error.message }}\n\nNode: {{ $json.error.node }}\n\nExecution ID: {{ $execution.id }}"
  }
}
```

## Graceful Degradation

```javascript
// Ana servis başarısız → Fallback servis
async function getCustomerData(customerId) {
  try {
    // Ana CRM
    return await primaryCRM.getCustomer(customerId);
  } catch (error) {
    console.warn('Primary CRM failed, using cache');

    try {
      // Cache'den dene
      return await cache.get(`customer:${customerId}`);
    } catch (cacheError) {
      console.warn('Cache failed, using minimal data');

      // Minimum veri
      return {
        id: customerId,
        name: 'Unknown',
        status: 'degraded'
      };
    }
  }
}
```

## Dead Letter Queue

```javascript
// Başarısız işlemleri kaydet
async function handleFailedItem(item, error) {
  await db.insert('dead_letter_queue', {
    item: JSON.stringify(item),
    error: error.message,
    workflow: $workflow.name,
    attempts: item._attempts || 1,
    created_at: new Date(),
    retry_after: new Date(Date.now() + 3600000) // 1 saat sonra
  });
}
```

## Circuit Breaker

```javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failures = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED';
    this.nextAttempt = null;
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF-OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}
```

## Error Logging Structure

```javascript
const errorLog = {
  // Identification
  id: crypto.randomUUID(),
  timestamp: new Date().toISOString(),

  // Context
  workflow: {
    id: $workflow.id,
    name: $workflow.name,
    execution_id: $execution.id
  },

  // Error details
  error: {
    type: error.name,
    message: error.message,
    code: error.code,
    stack: error.stack
  },

  // Request context
  request: {
    method: $input.method,
    path: $input.path,
    headers: sanitizeHeaders($input.headers),
    body_size: JSON.stringify($input.body).length
  },

  // Environment
  environment: process.env.NODE_ENV,
  version: '5.1.0'
};
```
