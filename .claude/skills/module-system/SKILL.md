# Module System Skill

Grain SaaS Automation Suite modül mimarisi.

## Mevcut Modüller (16)

| Modül | Açıklama | Workflow Sayısı |
|-------|----------|-----------------|
| core | System infrastructure | 5 |
| ai_engine | AI-powered automation | 8 |
| data_intelligence | Data processing | 5 |
| customer_success | Customer lifecycle | 6 |
| sales_revenue | Sales pipeline | 4 |
| marketing | Marketing automation | 6 |
| seo | Search optimization | 4 |
| local_seo_turkey | Turkish local business | 4 |
| hospitality | Hotel/restaurant | 3 |
| real_estate | Property management | 1 |
| ecommerce | E-commerce ops | 1 |
| voice_ai | Voice agents | 1 |
| agency_tools | White-label agency | 3 |
| hr_operations | Human resources | 1 |
| finance | Financial ops | 2 |
| communication | Team communication | 3 |

## Yeni Modül Ekleme

### 1. index.json'a Modül Tanımla

```json
"module_name": {
  "description": "Modül açıklaması",
  "workflows": [
    {
      "name": "Workflow Name v1",
      "file": "Grain_Workflow_Name_v1.json",
      "tier": "Critical",
      "features": ["feature1", "feature2"]
    }
  ]
}
```

### 2. Statistics Güncelle

```json
"statistics": {
  "total_workflows": [+1],
  "critical_tier": [+1 if critical],
  "high_tier": [+1 if high],
  "medium_tier": [+1 if medium],
  "modules": [+1 if new module]
}
```

### 3. Changelog Ekle

```json
"changelog": {
  "v[X.Y.Z]": {
    "date": "[YYYY-MM-DD]",
    "changes": [
      "NEW: [Feature description]"
    ]
  }
}
```

## Modül Kategorileri

### Core (Altyapı)
- Master Orchestrator
- MCP Client/Monitor
- Self-Healing
- Backup

### Business (İş Fonksiyonları)
- customer_success
- sales_revenue
- marketing
- seo

### Vertical (Sektörel)
- hospitality
- real_estate
- ecommerce
- local_seo_turkey

### Tools (Araçlar)
- ai_engine
- data_intelligence
- voice_ai
- agency_tools

## Bağımlılık Matrisi

```
core ─────────────────┐
  │                   │
  ├── ai_engine       │
  │     │             │
  ├── data_intelligence
  │     │             │
  └─────┴── [business modules]
              │
              └── [vertical modules]
```

## Best Practices

1. **Tek Sorumluluk**: Her modül tek bir domain'e odaklansın
2. **Bağımsızlık**: Modüller arası minimum bağımlılık
3. **Tutarlılık**: Aynı modüldeki workflow'lar benzer pattern kullansın
4. **Dokümantasyon**: Her modülün features listesi güncel olsun
