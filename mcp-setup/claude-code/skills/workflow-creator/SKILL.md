---
name: Workflow Creator
description: Grain SaaS için n8n workflow'ları oluşturur. JSON yapısı, naming convention, tier sistemi ve best practices ile production-ready workflow'lar üretir.
triggers:
  - "yeni workflow oluştur"
  - "workflow yarat"
  - "n8n template"
  - "create workflow"
---

# Workflow Creator Skill

Bu skill, Grain SaaS Automation Suite için yeni n8n workflow'ları oluşturmayı sağlar.

## Workflow Yapısı

Her workflow JSON dosyası şu yapıda olmalı:

```json
{
  "name": "Grain_[ModuleName]_[Feature]_v1",
  "nodes": [...],
  "connections": {...},
  "settings": {
    "executionOrder": "v1"
  },
  "meta": {
    "grain_module": "[module_name]",
    "grain_tier": "Critical|High|Medium",
    "grain_version": "1.0.0",
    "grain_features": ["feature1", "feature2"],
    "grain_integrations": ["API1", "API2"],
    "grain_language": "tr|en|multi"
  }
}
```

## Naming Convention

- Dosya adı: `Grain_[PascalCase]_v[version].json`
- Örnek: `Grain_AI_Appointment_Booking_v1.json`

## Tier Sistemi

| Tier | Açıklama | Kullanım |
|------|----------|----------|
| Critical | Sistem için vazgeçilmez | Core, orchestrator, ana işlevler |
| High | Önemli iş fonksiyonları | Modül ana workflow'ları |
| Medium | Yardımcı özellikler | Utility, raporlama |

## Node Best Practices

### Trigger Node (İlk Node)
```json
{
  "id": "trigger-uuid",
  "name": "Trigger",
  "type": "n8n-nodes-base.webhook",
  "position": [250, 300],
  "parameters": {
    "httpMethod": "POST",
    "path": "grain/[endpoint]"
  }
}
```

### AI Node (GPT-4o)
```json
{
  "type": "@n8n/n8n-nodes-langchain.openAi",
  "parameters": {
    "model": "gpt-4o",
    "messages": {
      "values": [
        {
          "role": "system",
          "content": "Sen Grain AI asistanısın. Türkçe yanıt ver."
        }
      ]
    }
  }
}
```

### Error Handling
Her workflow'a error handler ekle:
```json
{
  "type": "n8n-nodes-base.errorTrigger",
  "name": "Error Handler"
}
```

## Modüle Ekleme

Yeni workflow oluşturduktan sonra `index.json`'a ekle:

```json
{
  "name": "[Workflow Name] v1",
  "file": "Grain_[Name]_v1.json",
  "tier": "[Tier]",
  "features": ["feature1", "feature2"]
}
```

## Checklist

- [ ] Dosya adı convention'a uygun
- [ ] Meta bilgileri ekli
- [ ] Error handler var
- [ ] Türkçe dil desteği (gerekirse)
- [ ] index.json güncellendi
- [ ] Statistics güncellendi
- [ ] Changelog'a eklendi
