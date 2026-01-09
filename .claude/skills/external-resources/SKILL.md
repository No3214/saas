# External Resources & Legacy Products

Grain SaaS'a entegre edilebilecek dış kaynaklar ve araçlar.

## 🔌 MCP Servers (1200+)

### Resmi Dizinler
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) - Official
- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) - 500+
- [mcp-awesome.com](https://mcp-awesome.com) - 1200+ verified
- [mcpservers.org](https://mcpservers.org) - Community directory

### İş Otomasyonu MCP'leri

#### CRM & Satış
| MCP Server | Açıklama | Kurulum |
|------------|----------|---------|
| **HubSpot** | CRM data, contacts, deals | `npx @anthropic/hubspot-mcp` |
| **Salesforce** | Sales pipeline, analytics | `npx salesforce-mcp` |
| **Pipedrive** | Deal management | `npx pipedrive-mcp-server` |
| **Attio** | Modern CRM | `npx attio-mcp` |

#### Marketing
| MCP Server | Açıklama | Kurulum |
|------------|----------|---------|
| **Mailchimp** | Email campaigns | `npx mailchimp-mcp` |
| **Smartlead** | Cold outreach | `npx smartlead-mcp` |
| **Meta Ads** | Facebook/Instagram ads | `npx meta-ads-mcp` |
| **Google Ads** | Ad campaigns | `npx google-ads-mcp` |

#### Analytics
| MCP Server | Açıklama | Kurulum |
|------------|----------|---------|
| **Google Analytics 4** | Web analytics | `npx ga4-mcp` |
| **Ahrefs** | SEO data | `npx ahrefs-mcp` |
| **Search Console** | GSC data | `npx gsc-mcp` |

### Database MCP'leri

| MCP Server | Açıklama | Kurulum |
|------------|----------|---------|
| **PostgreSQL** | SQL queries, schema | `npx @modelcontextprotocol/server-postgres` |
| **Supabase** | Full Supabase access | `npx supabase-mcp` |
| **MySQL** | MySQL database | `npx mysql-mcp-server` |
| **MongoDB** | NoSQL queries | `npx mongodb-mcp` |
| **Redis** | Cache & data | `npx redis-mcp` |

### Communication MCP'leri

| MCP Server | Açıklama | Kurulum |
|------------|----------|---------|
| **Slack** | Channels, messages | `npx @anthropic/slack-mcp` |
| **Gmail** | Email access | `npx gmail-mcp` |
| **Notion** | Workspace search | `npx notion-mcp` |
| **Discord** | Bot integration | `npx discord-mcp` |

### Developer Tools MCP'leri

| MCP Server | Açıklama | Kurulum |
|------------|----------|---------|
| **GitHub** | Repos, PRs, issues | `npx @modelcontextprotocol/server-github` |
| **GitLab** | GitLab access | `npx gitlab-mcp` |
| **Linear** | Issue tracking | `npx linear-mcp` |
| **Jira** | Project management | `npx jira-mcp` |

### Browser Automation MCP'leri

| MCP Server | Açıklama | Kurulum |
|------------|----------|---------|
| **Playwright** | Browser automation | `npx @anthropic/playwright-mcp` |
| **Puppeteer** | Headless Chrome | `npx puppeteer-mcp` |
| **Firecrawl** | Web scraping | `npx firecrawl-mcp` |

---

## 📦 n8n Community Nodes (5,276+)

### Resmi Dizinler
- [awesome-n8n](https://github.com/restyler/awesome-n8n) - Top 100 nodes
- [NCNodes](https://ncnodes.com) - AI-powered directory
- [n8n Integrations](https://n8n.io/integrations/) - 400+ official

### En Popüler Community Nodes

#### Communication & Messaging
| Node | Downloads/ay | Açıklama |
|------|--------------|----------|
| **Evolution API** | 8.6M | WhatsApp Business |
| **WhatsApp Cloud** | 2M+ | Official WhatsApp |
| **Telegram Extended** | 500K | Advanced Telegram |

#### AI & LLM
| Node | Açıklama |
|------|----------|
| **ElevenLabs** | Voice synthesis |
| **DeepSeek** | AI model |
| **Perplexity** | AI search |
| **OpenRouter** | Multi-model router |

#### Document & PDF
| Node | Açıklama |
|------|----------|
| **pdforge** | PDF reports |
| **PDF.co** | PDF manipulation |
| **DocuSign** | E-signatures |

#### Web Scraping
| Node | Açıklama |
|------|----------|
| **ScrapeNinja** | Smart crawler |
| **Firecrawl** | Modern scraper |
| **Apify** | Actor-based scraping |

#### Utilities
| Node | Açıklama |
|------|----------|
| **Tesseract.js** | OCR |
| **Logger** | Advanced logging |
| **Supadata** | YouTube transcripts |

### Kurulum
```bash
# n8n Community Node kurulumu
npm install n8n-nodes-evolution-api
npm install n8n-nodes-elevenlabs
npm install n8n-nodes-perplexity
```

---

## 🤖 Claude Code Extensions

### Resmi Kaynaklar
- [Claude Code Docs](https://code.claude.com/docs/)
- [Claude Plugins Official](https://github.com/anthropics/claude-plugins-official)
- [Claude Agent SDK](https://github.com/anthropics/claude-code)

### Önemli Extensions

| Extension | Açıklama |
|-----------|----------|
| **Claude Squad** | Multiple agent management |
| **Swarm SDK** | Agent swarms |
| **Command Suite** | 119+ slash commands |
| **Desktop Commander** | System integration |

### SDK Features
- **Subagents** - Paralel task delegation
- **Hooks** - Auto-trigger actions
- **Background Tasks** - Long-running processes
- **Skills** - Reusable knowledge modules

---

## 🏢 White-Label SaaS Platforms

### Agency Tools
| Platform | Açıklama | Fiyat |
|----------|----------|-------|
| **GoHighLevel** | All-in-one agency | $97-497/mo |
| **Vendasta** | SMB marketplace | Custom |
| **DashClicks** | White-label dashboard | $99-499/mo |

### Reputation Management
| Platform | Açıklama |
|----------|----------|
| **Birdeye** | Review management |
| **Podium** | Customer messaging |
| **ReviewTrackers** | Multi-platform |

### Appointment Booking
| Platform | Açıklama |
|----------|----------|
| **Calendly** | Scheduling |
| **Acuity** | Appointments |
| **SimplyBook.me** | Booking system |

---

## 🎯 Grain SaaS için Önerilen Entegrasyonlar

### Öncelik 1 - Hemen Ekle
```bash
# MCP Servers
npx @modelcontextprotocol/server-postgres  # Database
npx @anthropic/slack-mcp                   # Notifications
npx gmail-mcp                              # Email

# n8n Nodes
npm install n8n-nodes-evolution-api        # WhatsApp
npm install n8n-nodes-elevenlabs           # Voice AI
```

### Öncelik 2 - Yakında Ekle
```bash
# CRM MCP
npx hubspot-mcp                            # HubSpot CRM

# Analytics MCP
npx ga4-mcp                                # Google Analytics

# Browser MCP
npx @anthropic/playwright-mcp              # Automation
```

### Öncelik 3 - Gelecek
```bash
# Advanced
npx supabase-mcp                           # Supabase
npx linear-mcp                             # Project management
npx notion-mcp                             # Documentation
```

---

## 📚 Kaynaklar

### MCP
- [MCP Specification](https://modelcontextprotocol.io/)
- [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
- [mcp-awesome.com](https://mcp-awesome.com)

### n8n
- [awesome-n8n](https://github.com/restyler/awesome-n8n)
- [n8n Docs](https://docs.n8n.io/)
- [NCNodes Directory](https://ncnodes.com)

### Claude Code
- [Claude Code Docs](https://code.claude.com/docs/)
- [Plugin Guide](https://code.claude.com/docs/en/plugins)
- [Agent SDK](https://github.com/anthropics/claude-code)
