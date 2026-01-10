# Grain SaaS Automation Suite v5.2

> **Agentic AI Workflow Automation Platform** - KOBİ'ler ve Ajanslar için n8n tabanlı otomasyon çözümü

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n Version](https://img.shields.io/badge/n8n-1.70+-blue.svg)](https://n8n.io)
[![MCP Enabled](https://img.shields.io/badge/MCP-Enabled-green.svg)](https://modelcontextprotocol.io)
[![Workflows](https://img.shields.io/badge/Workflows-57+-purple.svg)](#workflow-kategorileri)

---

## Proje Özeti

Grain SaaS, küçük ve orta ölçekli işletmeler ile dijital ajanslar için tasarlanmış kapsamlı bir **AI-powered otomasyon platformudur**. n8n workflow engine üzerine inşa edilmiş 57+ hazır workflow template ile işletmelerin:

- Müşteri iletişimini otomatikleştirmesini
- İtibar yönetimini AI ile güçlendirmesini
- Yerel SEO ve GBP optimizasyonu yapmasını
- Sesli AI asistanları WhatsApp üzerinden kullanmasını
- Tüm süreçleri MCP protokolü ile Claude Code'a bağlamasını sağlar.

---

## Ana Bileşenler

### 1. n8n Workflow Templates (`/n8n-templates`)

| Kategori | Workflow Sayısı | Açıklama |
|----------|-----------------|----------|
| **Core** | 3 | Master orchestrator, MCP connector, self-healing pipeline |
| **Voice AI** | 2 | ElevenLabs WhatsApp sesli asistan, toplantı notları |
| **Turkish Local** | 3 | Türk işletmeleri için GBP, itibar yönetimi |
| **Agency** | 4 | Kampanya takibi, raporlama, white-label dashboard |
| **Customer Success** | 6 | Churn prediction, destek, NPS, onboarding |
| **Hospitality** | 5 | Dinamik fiyatlandırma, housekeeping, rezervasyon |
| **SEO & Marketing** | 6 | Site audit, keyword research, multi-platform publisher |
| **Analytics** | 2 | A/B testing, unified dashboard |
| **Operations** | 4 | RevOps, faturalama, CDP, sözleşme analizi |
| **AI Productivity** | 5 | Chatbot, RAG, web search, content generator |

### 2. Claude Code Skills (`/.claude/skills`)

15 özelleştirilmiş skill seti:
- `workflow-creator` - Yeni workflow oluşturma rehberi
- `turkish-localization` - Türkçe içerik optimizasyonu
- `mcp-integration` - MCP server entegrasyonu
- `vibeship-spawner-skills` - 462 harici skill erişimi
- `external-resources` - MCP serverlar, community node'lar

### 3. Slash Commands (`/.claude/commands`)

| Komut | Açıklama |
|-------|----------|
| `/new-workflow` | Yeni workflow oluştur |
| `/audit` | Mevcut workflow'ları denetle |
| `/test-workflow` | Workflow'u test et |
| `/deploy` | Production'a deploy et |
| `/health-check` | Sistem sağlık kontrolü |
| `/backup` | Workflow yedekleme |
| `/stats` | İstatistikleri görüntüle |
| `/install-nodes` | Community node kurulumu |

### 4. MCP Server Entegrasyonu

```json
{
  "n8n-mcp": "n8n workflow automation (JWT auth)",
  "spawner-skills": "462 production-grade skills",
  "postgres": "Database queries",
  "github": "Repo, PR, issue management",
  "slack": "Channel & message automation",
  "playwright": "Browser automation",
  "filesystem": "Local file access",
  "memory": "Persistent memory"
}
```

---

## Kurulum

### Gereksinimler

- Node.js 18+
- n8n 1.70+ (self-hosted veya cloud)
- Docker (opsiyonel)
- Claude Code CLI

### 🚀 Otomatik Kurulum (Önerilen)

```bash
# Repository'yi klonla
git clone https://github.com/No3214/saas.git
cd saas

# Environment ayarla
cp .env.example .env
nano .env  # API keylerini ekle

# n8n'i başlat (Docker ile)
docker-compose up -d

# Community node'ları kur
npm install n8n-nodes-evolution-api n8n-nodes-elevenlabs
```

### 🛠️ Manuel Kurulum

1. **n8n Kurulumu**: [n8n Docs](https://docs.n8n.io/hosting/)
2. **Workflow Import**: n8n UI > Settings > Import > `n8n-templates/*.json`
3. **MCP Aktivasyonu**: n8n Settings > AI > MCP Server > Enable
4. **Credentials**: Her workflow için gerekli API keylerini ayarla

---

## Workflow Kategorileri

### Voice AI & WhatsApp
- `Grain_ElevenLabs_WhatsApp_Voice_Agent_v1` - Türkçe sesli asistan
- `Grain_AI_Meeting_Notes_v1` - Toplantı transkripsiyon ve özet

### Turkish Local Business
- `Grain_Turkish_Local_Business_Manager_v1` - Çoklu platform yönetimi
- `Grain_Turkish_GBP_Optimizer_v1` - Google Business Profile
- `Grain_Reputation_Management_Suite_v1` - İtibar yönetimi

### Agency & White-Label
- `Grain_WhiteLabel_Agency_Dashboard_v1` - Müşteri portalı
- `Grain_Client_Reporting_Dashboard_v1` - Otomatik raporlama
- `Grain_Campaign_Performance_Monitor_v1` - Reklam takibi

### AI Productivity
- `Grain_AI_Chatbot_Web_Search_v1` - Gerçek zamanlı web arama
- `Grain_Web_Scraper_Agent_v1` - AI destekli scraping
- `Grain_RAG_Company_Chatbot_v1` - Şirket doküman chatbot

---

## Community Nodes

Bazı workflow'lar ek node paketi gerektirir:

```bash
# WhatsApp (Evolution API)
npm install n8n-nodes-evolution-api

# ElevenLabs Voice AI
npm install n8n-nodes-elevenlabs

# AI Search
npm install n8n-nodes-perplexity

# PDF & OCR
npm install n8n-nodes-pdforge n8n-nodes-tesseractjs

# Web Scraping
npm install n8n-nodes-scrapeninja
```

---

## Dosya Yapısı

```
saas/
├── .claude/
│   ├── settings.json      # Claude Code yapılandırması
│   ├── skills/            # 15 skill dizini
│   ├── commands/          # 8 slash command
│   └── hooks/             # Session hooks
├── n8n-templates/
│   ├── index.json         # Workflow kataloğu
│   └── Grain_*.json       # 57 workflow template
├── .env.example           # Environment template
├── .gitignore
└── README.md
```

---

## Kullanım

### Claude Code ile

```bash
# Proje dizinine git
cd /path/to/saas

# Claude Code başlat
claude

# Örnek komutlar
> /new-workflow "Müşteri onboarding otomasyonu oluştur"
> /audit
> /stats
```

### n8n ile

1. Workflow'u import et
2. Credentials ayarla (OpenAI, WhatsApp, Google, etc.)
3. Workflow'u aktifleştir
4. Webhook URL'ini kopyala ve entegre et

---

## API Gereksinimleri

| Servis | Gerekli | Kullanım |
|--------|---------|----------|
| OpenAI/OpenRouter | Evet | AI analiz ve yanıtlar |
| WhatsApp Business | Opsiyonel | Müşteri iletişimi |
| ElevenLabs | Opsiyonel | Sesli asistan |
| Google Places | Opsiyonel | GBP workflow'ları |
| SerpAPI | Opsiyonel | Web arama |
| Slack | Opsiyonel | Bildirimler |

---

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-workflow`)
3. Commit edin (`git commit -m 'Yeni workflow eklendi'`)
4. Push edin (`git push origin feature/yeni-workflow`)
5. Pull Request açın

---

## Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## İletişim

- **GitHub Issues**: Bug report ve feature request için
- **Discussions**: Sorular ve öneriler için

---

*Grain SaaS Automation Suite - Professional workflow automation for Turkish businesses*

*Developed with Claude Code & n8n*
