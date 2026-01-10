# Grain SaaS Automation Suite

57 AI-powered n8n workflow template koleksiyonu. Emlak, pazarlama, SEO ve iletisim otomasyonu icin.

## Proje Yapisi

```
/templates/          - n8n workflow JSON dosyalari (57 adet)
/templates/bundles/  - Full suite bundle'lar
/subflows/           - Paylasilan sub-workflow'lar
/scripts/            - Import, validate, bundle scriptleri
/mcp-setup/          - Claude Code skills ve MCP config
/config/             - Environment ve konfigurasyon
/docker/             - Docker compose dosyalari
/docs/               - Dokumantasyon
```

## Workflow Naming Convention

- Dosya: `Grain_[PascalCase]_v[version].json`
- Ornek: `Grain_AI_Appointment_Booking_v1.json`

## Tier Sistemi

| Tier | Kullanim |
|------|----------|
| Critical | Core, orchestrator, ana islevler |
| High | Modul ana workflow'lari |
| Medium | Utility, raporlama |

## Onemli Komutlar

```bash
# Workflow import (cloud)
node scripts/import-workflows.js --url https://globaldigital.app.n8n.cloud --api-key KEY

# Dry-run test
node scripts/import-workflows.js --dry-run

# Workflow listele
npm run list

# Validate
npm run validate
```

## n8n Cloud

- URL: https://globaldigital.app.n8n.cloud
- MCP: https://globaldigital.app.n8n.cloud/mcp-server/http

## Gelistirme Kurallari

- Workflow JSON'lari `templates/` klasorunde
- Her workflow'a `meta` alani ekle (grain_module, grain_tier, grain_version)
- Error handler node zorunlu
- Turkce dil destegi (grain_language: "tr")
- index.json'u guncelle

## Dosya Referanslari

- Import script: @scripts/import-workflows.js
- Workflow index: @templates/index.json
- Skills: @mcp-setup/claude-code/skills/
- Cloud import rehberi: @scripts/CLOUD-IMPORT.md
