# API Integrations Skill

Grain SaaS'ta kullanılan API entegrasyonları ve best practices.

## Temel Entegrasyonlar

### 1. OpenAI / GPT-4o

```json
{
  "type": "@n8n/n8n-nodes-langchain.openAi",
  "parameters": {
    "model": "gpt-4o",
    "temperature": 0.7,
    "maxTokens": 2000
  },
  "credentials": {
    "openAiApi": "OpenAI_Grain"
  }
}
```

**Maliyet Takibi:**
- Input: $2.50 / 1M token
- Output: $10.00 / 1M token
- `Grain_AI_Token_Cost_Tracker_v1` ile izle

### 2. ElevenLabs (Voice AI)

```json
{
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "url": "https://api.elevenlabs.io/v1/text-to-speech/{{voice_id}}",
    "method": "POST",
    "headers": {
      "xi-api-key": "{{$credentials.elevenLabsApi}}"
    },
    "body": {
      "text": "{{text}}",
      "model_id": "eleven_multilingual_v2",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.75
      }
    }
  }
}
```

**Voice IDs (Turkish):**
- `pNInz6obpgDQGcFmaJgB` - Adam (erkek)
- `21m00Tcm4TlvDq8ikWAM` - Rachel (kadın)

**Fiyatlandırma:**
- $0.08-0.10/dakika (Business plan)

### 3. WhatsApp Business API

```json
{
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "url": "https://graph.facebook.com/v18.0/{{phone_number_id}}/messages",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer {{$credentials.whatsappToken}}"
    },
    "body": {
      "messaging_product": "whatsapp",
      "to": "{{recipient_phone}}",
      "type": "text",
      "text": { "body": "{{message}}" }
    }
  }
}
```

**Template Mesaj:**
```json
{
  "type": "template",
  "template": {
    "name": "appointment_reminder",
    "language": { "code": "tr" },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "{{customer_name}}" },
          { "type": "text", "text": "{{date_time}}" }
        ]
      }
    ]
  }
}
```

### 4. Google Business Profile API

```json
{
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "url": "https://mybusinessbusinessinformation.googleapis.com/v1/{{location_name}}",
    "authentication": "oAuth2",
    "credentials": {
      "googleBusinessProfileOAuth2Api": "GBP_Grain"
    }
  }
}
```

**Endpoints:**
- Locations: `/accounts/{account}/locations`
- Reviews: `/accounts/{account}/locations/{location}/reviews`
- Posts: `/accounts/{account}/locations/{location}/localPosts`

### 5. Google Analytics 4

```json
{
  "type": "n8n-nodes-base.googleAnalytics",
  "parameters": {
    "resource": "report",
    "propertyId": "{{property_id}}",
    "dateRange": {
      "startDate": "30daysAgo",
      "endDate": "today"
    },
    "metrics": ["sessions", "users", "conversions"],
    "dimensions": ["date", "source"]
  }
}
```

### 6. Search Console API

```json
{
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "url": "https://searchconsole.googleapis.com/webmasters/v3/sites/{{site_url}}/searchAnalytics/query",
    "method": "POST",
    "body": {
      "startDate": "{{start_date}}",
      "endDate": "{{end_date}}",
      "dimensions": ["query", "page"],
      "rowLimit": 100
    }
  }
}
```

### 7. Slack Notifications

```json
{
  "type": "n8n-nodes-base.slack",
  "parameters": {
    "channel": "#grain-alerts",
    "text": "{{alert_message}}",
    "attachments": [
      {
        "color": "{{status_color}}",
        "fields": [
          { "title": "Workflow", "value": "{{workflow_name}}" },
          { "title": "Status", "value": "{{status}}" }
        ]
      }
    ]
  }
}
```

## Webhook Patterns

### Incoming Webhook
```json
{
  "type": "n8n-nodes-base.webhook",
  "parameters": {
    "httpMethod": "POST",
    "path": "grain/{{service}}/{{action}}",
    "responseMode": "responseNode",
    "options": {
      "rawBody": true
    }
  }
}
```

### Webhook Security
```javascript
// HMAC Signature Verification
const crypto = require('crypto');
const signature = $input.headers['x-signature'];
const payload = JSON.stringify($input.body);
const expected = crypto.createHmac('sha256', 'SECRET').update(payload).digest('hex');

if (signature !== expected) {
  throw new Error('Invalid signature');
}
```

## Rate Limiting

| API | Limit | Önerilen |
|-----|-------|----------|
| OpenAI | 10K RPM | Batch işlem kullan |
| ElevenLabs | 100 req/min | Queue sistemi |
| WhatsApp | 1K msg/sec | Template kullan |
| Google APIs | 600 req/min | Cache kullan |

## Error Handling Pattern

```json
{
  "nodes": [
    {
      "name": "Try",
      "type": "n8n-nodes-base.noOp"
    },
    {
      "name": "API Call",
      "type": "n8n-nodes-base.httpRequest",
      "continueOnFail": true
    },
    {
      "name": "Check Error",
      "type": "n8n-nodes-base.if",
      "parameters": {
        "conditions": {
          "boolean": [
            { "value1": "={{$json.error}}", "value2": true }
          ]
        }
      }
    },
    {
      "name": "Retry Logic",
      "type": "n8n-nodes-base.wait",
      "parameters": { "amount": 5, "unit": "seconds" }
    }
  ]
}
```
