# Grain SaaS - Hızlı Başlangıç

## 🚀 3 Adımda Çalıştır

### Adım 1: Projeyi İndir (Kendi Bilgisayarında)

```bash
git clone https://github.com/No3214/saas.git
cd saas
```

### Adım 2: n8n'i Başlat

**Seçenek A - Docker (Önerilen):**
```bash
docker run -it --rm \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -e N8N_AI_ENABLED=true \
  n8nio/n8n
```

**Seçenek B - NPX:**
```bash
npx n8n
```

**Seçenek C - Kurulu n8n:**
```bash
n8n start
```

### Adım 3: Workflow'ları Yükle

```bash
# API Key oluştur: n8n > Settings > API > Create API Key

# Import scriptini çalıştır
N8N_API_KEY="your-key-here" node scripts/import-workflows.js
```

---

## 📊 Ne Yükleniyor?

| Kategori | Sayı | Açıklama |
|----------|------|----------|
| Core | 3 | Master Orchestrator, MCP Connector |
| Voice AI | 2 | ElevenLabs WhatsApp Agent |
| Turkish Local | 3 | GBP, İtibar Yönetimi |
| Customer Success | 6 | Churn, NPS, Destek |
| SEO & Marketing | 6 | Site Audit, Publisher |
| Diğer | 37 | Toplam 57 workflow |

---

## 🔧 MCP Bağlantısı (Claude Code için)

n8n çalıştıktan sonra:

1. n8n'de: **Settings > AI > MCP Server > Enable**
2. JWT token al
3. Claude Code'da MCP bağlantısı otomatik çalışacak

---

## ❓ Sorun Giderme

**n8n açılmıyor:**
```bash
# Port kontrolü
lsof -i :5678

# Docker kontrolü
docker ps | grep n8n
```

**Import başarısız:**
```bash
# API key doğru mu?
curl -H "X-N8N-API-KEY: your-key" http://localhost:5678/api/v1/workflows
```

**MCP bağlanmıyor:**
- n8n'in çalıştığından emin ol
- JWT token'ın geçerli olduğunu kontrol et

---

## 📁 Proje Yapısı

```
saas/
├── templates/          # 57 workflow JSON
├── subflows/           # Reusable components
├── mcp-setup/          # Claude Code config
├── scripts/            # Import & setup scripts
├── docker/             # Docker compose
└── docs/               # Documentation
```

---

*Grain SaaS Automation Suite v5.2.0*
