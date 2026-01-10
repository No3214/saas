# Install n8n Community Nodes

n8n community node'larını kurma komutu.

## Önerilen Node'lar

### Kurulum Scripti
```bash
#!/bin/bash
# n8n dizinine git
cd ~/.n8n

# Communication
npm install n8n-nodes-evolution-api      # WhatsApp (8.6M/mo)
npm install n8n-nodes-whatsapp-cloud     # WhatsApp Official

# AI & Voice
npm install n8n-nodes-elevenlabs         # Voice AI
npm install n8n-nodes-perplexity         # AI Search
npm install n8n-nodes-deepseek           # DeepSeek AI
npm install n8n-nodes-openrouter         # Multi-model

# Documents
npm install n8n-nodes-pdforge            # PDF Reports
npm install n8n-nodes-pdf-co             # PDF Tools

# Scraping
npm install n8n-nodes-scrapeninja        # Web Scraper
npm install n8n-nodes-firecrawl          # Modern Crawler

# Utilities
npm install n8n-nodes-tesseractjs        # OCR
npm install n8n-nodes-supadata           # YouTube Transcripts

# n8n'i yeniden başlat
pm2 restart n8n
# veya
systemctl restart n8n
```

## Kategoriler

### Communication & Messaging
| Node | NPM Package | Açıklama |
|------|-------------|----------|
| Evolution API | n8n-nodes-evolution-api | WhatsApp Business |
| WhatsApp Cloud | n8n-nodes-whatsapp-cloud | Official API |
| Telegram Extended | n8n-nodes-telegram-extended | Advanced Telegram |

### AI & Voice
| Node | NPM Package | Açıklama |
|------|-------------|----------|
| ElevenLabs | n8n-nodes-elevenlabs | Voice synthesis |
| Perplexity | n8n-nodes-perplexity | AI search |
| DeepSeek | n8n-nodes-deepseek | AI model |
| OpenRouter | n8n-nodes-openrouter | Multi-model |

### Documents & PDF
| Node | NPM Package | Açıklama |
|------|-------------|----------|
| pdforge | n8n-nodes-pdforge | PDF reports |
| PDF.co | n8n-nodes-pdf-co | PDF tools |
| DocuSign | n8n-nodes-docusign | E-signatures |

### Web Scraping
| Node | NPM Package | Açıklama |
|------|-------------|----------|
| ScrapeNinja | n8n-nodes-scrapeninja | Smart crawler |
| Firecrawl | n8n-nodes-firecrawl | Modern scraper |
| Apify | n8n-nodes-apify | Actor-based |

### Utilities
| Node | NPM Package | Açıklama |
|------|-------------|----------|
| Tesseract.js | n8n-nodes-tesseractjs | OCR |
| Logger | n8n-nodes-logger | Advanced logging |
| Supadata | n8n-nodes-supadata | YouTube transcripts |

## Docker Kurulumu

```dockerfile
# Dockerfile
FROM n8nio/n8n:latest

USER root

RUN npm install -g \
  n8n-nodes-evolution-api \
  n8n-nodes-elevenlabs \
  n8n-nodes-perplexity \
  n8n-nodes-pdforge \
  n8n-nodes-scrapeninja \
  n8n-nodes-tesseractjs

USER node
```

## Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
    volumes:
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"
```

## Doğrulama

```bash
# Kurulu node'ları listele
n8n list:installed

# Node'u test et
n8n execute --file=test-workflow.json
```

## Grain Workflow'ları için

Bu node'lar şu workflow'larda kullanılabilir:
- `Grain_ElevenLabs_WhatsApp_Voice_Agent_v1.json` → elevenlabs
- `Grain_Web_Scraper_Agent_v1.json` → scrapeninja, firecrawl
- `Grain_AI_Chatbot_Web_Search_v1.json` → perplexity
- `Grain_Reputation_Management_Suite_v1.json` → evolution-api
