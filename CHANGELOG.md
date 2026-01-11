# 📅 Değişim Günlüğü

Tüm önemli değişiklikler bu dosyada belgelenir.

## [5.2.0] - 2026-01-10

### Eklendi
- 🏢 **Enterprise Restructuring:** Kurumsal dizin yapısına geçildi
- 📁 `templates/` - n8n-templates'den taşındı
- 📁 `templates/bundles/` - Full suite bundle'lar
- 📁 `mcp-setup/claude-code/` - Claude Code konfigürasyonu
- 📁 `config/` - Merkezi konfigürasyon
- 📁 `assets/` - Statik dosyalar (images, logos, icons)
- 📝 GitHub Issue Templates (bug, feature, workflow request)
- 📝 Pull Request Template
- 🔧 `scripts/import-workflows.js` - Toplu workflow import aracı
- 🐳 `docker/docker-compose.main.yml` - Production-ready Docker yapısı

### Değiştirildi
- 📂 `n8n-templates/` → `templates/` olarak yeniden adlandırıldı
- 📂 `.claude/` → `mcp-setup/claude-code/` altına taşındı
- 📂 `.env.example` → `config/.env.example` altına taşındı
- 📂 `docker-compose.yml` → `docker/` altına taşındı
- 📖 README kurumsal yapıya göre güncellendi
- ⚡ Script path referansları güncellendi

### Düzeltildi
- 🧹 index.json temizlendi (54 phantom entry silindi)
- 🧹 Gereksiz dosyalar organize edildi

---

## [2.0.0] - 2026-01-07

### Eklendi
- 🔧 **Modüler Altyapı:** `templates/`, `subflows/`, `docker/` yapısına geçildi.
- 🐳 **Docker Support:** `docker-compose.yml` ve `.env` yapılandırması.
- 🛡️ **Sub-Workflows:** AI Executor, Error Handler, Notification Hub.
- 🚀 **CI/CD:** GitHub Actions pipeline (`ci.yml`).
- 🤖 **Yeni Agentik Modüller:** Phase 1 tamamlandı.

### Değiştirildi
- 📂 Proje yapısı tamamen yeniden düzenlendi.
- 📖 Dokümantasyon (README, CONTRIBUTING) güncellendi.
- ⚡ Hata yönetimi standardize edilmeye başlandı.

## [1.5.0] - 2026-01-07

### Eklendi
- Multi-Platform Publisher v2 (9 platform)
- RevOps Hub v1
- Self-Healing Pipeline v1
- Master Orchestrator v1
- API-Free SEO Tools

## [1.0.0] - 2025-12-01

### Eklendi
- İlk 21 workflow
- Temel dokümantasyon
