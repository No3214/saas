# Grain SaaS Automation Suite

63 AI-powered n8n workflow template koleksiyonu. E-commerce, pazarlama, SEO, emlak ve iletisim otomasyonu icin.

**Version:** 5.5.0 | **Workflows:** 63 | **Modules:** 17

## Proje Yapisi

```
/templates/          - n8n workflow JSON dosyalari (63 adet)
/templates/bundles/  - Full suite bundle'lar
/scripts/            - Import, validate, bundle scriptleri
/docker/             - Docker compose (production + dev)
/docs/               - Dokumantasyon
  /strategy/         - Strateji ve roadmap
/services/           - Microservices (grain-brain)
/.claude/            - Claude Code skills, commands, agents
```

## Hizli Baslangiç

```bash
# Development ortami
cd docker
cp .env.example .env
docker-compose -f docker-compose.main.yml up -d

# Production ortami (Traefik + SSL + Monitoring)
docker-compose up -d
```

## E-commerce Entegrasyonlari (Priority #1)

| Platform | Workflow | Ozellikler |
|----------|----------|------------|
| **Trendyol** | `Grain_Trendyol_Order_Sync_v1` | Siparis, stok, WhatsApp |
| **Trendyol** | `Grain_Trendyol_Stock_Manager_v1` | Stok sync, raporlar |
| **Hepsiburada** | `Grain_Hepsiburada_Order_Sync_v1` | Siparis, stok, bildirim |

## Workflow Conventions

### Naming
- Dosya: `Grain_[PascalCase]_v[version].json`
- Ornek: `Grain_AI_Appointment_Booking_v1.json`

### Tier Sistemi
| Tier | Kullanim |
|------|----------|
| Critical | Core, orchestrator, ana islevler |
| High | Modul ana workflow'lari |
| Medium | Utility, raporlama |

### Meta Fields (Zorunlu)
```json
{
  "meta": {
    "grain_module": "ecommerce",
    "grain_tier": "Critical",
    "grain_version": "1.0.0",
    "grain_language": "tr",
    "grain_features": ["feature1", "feature2"]
  }
}
```

## Onemli Komutlar

```bash
# Workflow import (cloud)
node scripts/import-workflows.js \
  --url https://globaldigital.app.n8n.cloud \
  --api-key $N8N_API_KEY

# Dry-run test
node scripts/import-workflows.js --dry-run --verbose

# JSON validation
node -e "JSON.parse(require('fs').readFileSync('templates/FILE.json'))"
```

## Docker Services

| Service | Port | Amac |
|---------|------|------|
| n8n | 5678 | Workflow engine |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Queue & cache |
| Traefik | 80/443 | Reverse proxy + SSL |
| Grafana | 3000 | Monitoring dashboard |
| Prometheus | 9090 | Metrics collection |

## Environment Variables

Tum credentials `.env` dosyasinda olmali:
```bash
# Required
N8N_USER, N8N_PASSWORD
POSTGRES_USER, POSTGRES_PASSWORD
GRAFANA_PASSWORD

# AI Providers
OPENAI_API_KEY, ANTHROPIC_API_KEY

# E-commerce
TRENDYOL_SELLER_ID, TRENDYOL_API_KEY
HEPSIBURADA_MERCHANT_ID, HEPSIBURADA_API_KEY

# Messaging
WHATSAPP_TOKEN, WHATSAPP_PHONE_ID
SLACK_BOT_TOKEN
```

## n8n Cloud

- URL: https://globaldigital.app.n8n.cloud
- MCP: https://globaldigital.app.n8n.cloud/mcp-server/http

## Gelistirme Kurallari

1. Workflow JSON'lari `templates/` klasorunde
2. Her workflow'a `meta` alani ekle
3. Error handler node zorunlu
4. Turkce dil destegi (grain_language: "tr")
5. `templates/index.json` guncelle
6. Hardcoded credentials YASAK - env var kullan

## Dokumantasyon

| Dosya | Icerik |
|-------|--------|
| `docs/strategy/MEGA_STRATEGY_v1.md` | 36-ay stratejik plan |
| `docs/strategy/ROADMAP_Q1_2026.md` | Q1 2026 aksiyon plani |
| `docs/STATE_MACHINES.md` | Workflow state diyagramlari |
| `docs/CLAUDE_AGENT_SDK.md` | Agent SDK entegrasyonu |
| `scripts/CLOUD-IMPORT.md` | n8n cloud import rehberi |

## Claude Code Skills

```bash
# Mevcut skill'ler
/workflow-creator     # Yeni workflow olustur
/n8n-best-practices   # Best practice kontrol
/api-integrations     # API entegrasyon rehberi
```

## Git Branch

- Development: `claude/n8n-agency-automation-T31zr`
- Main: `main`
