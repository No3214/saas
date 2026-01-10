# New Workflow Command

Yeni bir n8n workflow oluştur.

## Kullanım

Bu komut çalıştığında:

1. Workflow adını ve modülünü sor
2. Tier seviyesini belirle (Critical/High/Medium)
3. Ana özellikleri listele
4. Workflow JSON şablonunu oluştur
5. index.json'ı güncelle
6. Git commit yap

## Workflow Şablonu

```json
{
  "name": "Grain_{{WorkflowName}}_v1",
  "nodes": [
    {
      "id": "{{uuid}}",
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300],
      "parameters": {
        "httpMethod": "POST",
        "path": "grain/{{endpoint}}"
      }
    },
    {
      "id": "{{uuid}}",
      "name": "Process Data",
      "type": "n8n-nodes-base.code",
      "position": [450, 300],
      "parameters": {
        "jsCode": "// Process incoming data\nreturn items;"
      }
    },
    {
      "id": "{{uuid}}",
      "name": "Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "position": [650, 300],
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ {\"success\": true, \"data\": $json} }}"
      }
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [[{"node": "Process Data", "type": "main", "index": 0}]]
    },
    "Process Data": {
      "main": [[{"node": "Response", "type": "main", "index": 0}]]
    }
  },
  "settings": {
    "executionOrder": "v1"
  },
  "meta": {
    "grain_module": "{{module}}",
    "grain_tier": "{{tier}}",
    "grain_version": "1.0.0",
    "grain_features": [],
    "grain_language": "tr"
  }
}
```

## Sorulacak Sorular

1. **Workflow adı nedir?** (PascalCase, örn: CustomerOnboarding)
2. **Hangi modüle eklenecek?** (core, ai_engine, marketing, vb.)
3. **Tier seviyesi?** (Critical/High/Medium)
4. **Ana özellikler?** (virgülle ayrılmış liste)
5. **Türkçe desteği gerekli mi?** (evet/hayır)
