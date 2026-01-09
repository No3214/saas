# Webhooks & Triggers Skill

n8n webhook ve trigger pattern'leri.

## Webhook Types

### 1. Standard Webhook
```json
{
  "name": "API Endpoint",
  "type": "n8n-nodes-base.webhook",
  "parameters": {
    "httpMethod": "POST",
    "path": "grain/customers/create",
    "responseMode": "responseNode",
    "options": {
      "rawBody": true
    }
  }
}
```

### 2. Form Trigger
```json
{
  "type": "n8n-nodes-base.formTrigger",
  "parameters": {
    "formTitle": "Müşteri Kayıt Formu",
    "formFields": {
      "values": [
        { "fieldLabel": "Ad Soyad", "fieldType": "text", "requiredField": true },
        { "fieldLabel": "E-posta", "fieldType": "email", "requiredField": true },
        { "fieldLabel": "Telefon", "fieldType": "tel" }
      ]
    }
  }
}
```

### 3. Chat Trigger
```json
{
  "type": "@n8n/n8n-nodes-langchain.chatTrigger",
  "parameters": {
    "mode": "webhook",
    "options": {
      "allowedOrigins": ["https://grain.com"]
    }
  }
}
```

## External Service Webhooks

### WhatsApp Business
```javascript
// Webhook handler
const body = $input.body;

if (body.object === 'whatsapp_business_account') {
  const entry = body.entry[0];
  const changes = entry.changes[0];
  const value = changes.value;

  if (value.messages) {
    const message = value.messages[0];
    return {
      type: 'message',
      from: message.from,
      text: message.text?.body,
      timestamp: message.timestamp
    };
  }

  if (value.statuses) {
    const status = value.statuses[0];
    return {
      type: 'status',
      message_id: status.id,
      status: status.status
    };
  }
}
```

### Stripe
```javascript
// Signature verification
const stripe = require('stripe');
const sig = $input.headers['stripe-signature'];
const webhookSecret = $credentials.stripeWebhookSecret;

const event = stripe.webhooks.constructEvent(
  $input.rawBody,
  sig,
  webhookSecret
);

switch (event.type) {
  case 'payment_intent.succeeded':
    return { action: 'payment_success', data: event.data.object };
  case 'customer.subscription.created':
    return { action: 'subscription_created', data: event.data.object };
  default:
    return { action: 'unknown', type: event.type };
}
```

### GitHub
```javascript
const event = $input.headers['x-github-event'];
const payload = $input.body;

const handlers = {
  'push': () => ({
    action: 'code_push',
    repo: payload.repository.full_name,
    branch: payload.ref.replace('refs/heads/', ''),
    commits: payload.commits.length
  }),
  'pull_request': () => ({
    action: `pr_${payload.action}`,
    repo: payload.repository.full_name,
    pr_number: payload.number,
    title: payload.pull_request.title
  }),
  'issues': () => ({
    action: `issue_${payload.action}`,
    repo: payload.repository.full_name,
    issue_number: payload.issue.number
  })
};

return handlers[event]?.() || { action: 'unknown', event };
```

### Linear
```javascript
const payload = $input.body;

return {
  action: payload.action,
  type: payload.type,
  data: {
    id: payload.data.id,
    title: payload.data.title,
    state: payload.data.state?.name,
    assignee: payload.data.assignee?.name,
    team: payload.data.team?.name
  }
};
```

## Schedule Triggers

### Cron Expression
```json
{
  "type": "n8n-nodes-base.scheduleTrigger",
  "parameters": {
    "rule": {
      "interval": [
        { "field": "cronExpression", "expression": "0 9 * * 1-5" }
      ]
    }
  }
}
```

### Common Schedules
```
Her gün 09:00          → 0 9 * * *
Hafta içi 09:00        → 0 9 * * 1-5
Her Pazartesi 08:00    → 0 8 * * 1
Her ayın 1'i           → 0 0 1 * *
Her 15 dakika          → */15 * * * *
Her saat başı          → 0 * * * *
```

## Polling Triggers

### Custom Polling
```json
{
  "type": "n8n-nodes-base.scheduleTrigger",
  "parameters": {
    "rule": {
      "interval": [{ "field": "minutes", "minutesInterval": 5 }]
    }
  }
}
```

```javascript
// Polling logic
const lastCheck = await $getWorkflowStaticData('lastCheck') || 0;
const newItems = await fetchNewItems(lastCheck);

if (newItems.length > 0) {
  await $setWorkflowStaticData('lastCheck', Date.now());
  return newItems;
}

return []; // No new items
```

## Webhook Response Patterns

### Immediate Response
```json
{
  "type": "n8n-nodes-base.respondToWebhook",
  "parameters": {
    "respondWith": "json",
    "responseBody": "={{ { \"status\": \"received\", \"id\": $json.id } }}"
  }
}
```

### Async Processing
```javascript
// 1. Hemen response dön
// 2. Arka planda işle
// 3. Callback ile bildir

// Webhook Response node
return {
  status: 'processing',
  tracking_id: crypto.randomUUID(),
  callback_url: `https://client.com/callback/${trackingId}`
};

// İşlem tamamlandığında
await fetch(callbackUrl, {
  method: 'POST',
  body: JSON.stringify({ status: 'completed', result })
});
```

## Rate Limiting Webhook

```javascript
// Redis-based rate limiting
const clientId = $input.headers['x-client-id'];
const key = `webhook_rate:${clientId}`;

const count = await redis.incr(key);
if (count === 1) {
  await redis.expire(key, 60);
}

if (count > 100) {
  return {
    statusCode: 429,
    body: {
      error: 'Too many requests',
      retry_after: 60
    }
  };
}
```

## Webhook URL Patterns

```
Base: https://n8n.grain.com/webhook

Endpoints:
├── /grain/customers/create     POST   Müşteri oluştur
├── /grain/customers/:id        GET    Müşteri getir
├── /grain/orders/webhook       POST   Sipariş webhook
├── /grain/whatsapp/incoming    POST   WhatsApp mesaj
├── /grain/stripe/webhook       POST   Stripe events
└── /grain/health               GET    Health check
```
