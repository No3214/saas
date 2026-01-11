# MCP Integration Guide

**Version:** 5.8.0 | **Last Updated:** 2026-01-11

Bu dokuman Grain SaaS projesi icin Model Context Protocol (MCP) entegrasyonunu aciklar.

---

## MCP Nedir?

Model Context Protocol (MCP), AI modellerinin harici araclarla (tools) iletisim kurmasini saglayan bir protokoldur. Grain SaaS'ta n8n workflow'lari, browser otomasyonu ve dosya erisimi icin kullanilir.

---

## Mevcut MCP Serverlari

### 1. Playwright MCP (Browser Otomasyonu)

```json
{
    "playwright": {
        "command": "docker",
        "args": ["run", "-i", "--rm", "--network", "grain-network", "mcp/playwright"]
    }
}
```

**Yetenekler:**
- Web sayfalarini gezme
- Screenshot alma
- Form doldurma
- Accessibility snapshot
- JavaScript calistirma

**Kullanim Alanlari:**
- Rakip website analizi
- Sosyal medya profil takibi
- E-commerce fiyat izleme
- SEO SERP kontrolu

### 2. n8n Cloud MCP

```json
{
    "n8n": {
        "url": "https://globaldigital.app.n8n.cloud/mcp-server/http"
    }
}
```

**Yetenekler:**
- Workflow calistirma
- Workflow yonetimi
- Execution izleme

### 3. Filesystem MCP

```json
{
    "grain-filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/saas/templates"]
    }
}
```

**Yetenekler:**
- Workflow template dosyalarini okuma
- JSON dosyalarini duzenleme

---

## Docker Entegrasyonu

### Production Ortami

```yaml
# docker-compose.yml
playwright:
  image: mcp/playwright:latest
  container_name: grain-playwright
  environment:
    - HEADLESS=true
    - BROWSER=chromium
    - TIMEOUT_ACTION=5000
    - TIMEOUT_NAVIGATION=60000
  networks:
    - grain-network
  deploy:
    resources:
      limits:
        memory: 1G
        cpus: '1'
```

### Playwright'i Baslatma

```bash
# Docker ile calistir
docker run -i --rm --network grain-network mcp/playwright

# Veya docker-compose ile
docker-compose up -d playwright
```

---

## Playwright Araclari (22 Tool)

| Tool | Aciklama |
|------|----------|
| `browser_navigate` | URL'ye git |
| `browser_snapshot` | Accessibility snapshot al |
| `browser_take_screenshot` | Ekran goruntusu al |
| `browser_click` | Elemente tikla |
| `browser_fill_form` | Form doldur |
| `browser_type` | Metin yaz |
| `browser_press_key` | Tus bas |
| `browser_wait_for` | Bekle (text/time) |
| `browser_evaluate` | JavaScript calistir |
| `browser_close` | Browser kapat |
| `browser_tabs` | Sekme yonet |
| `browser_network_requests` | Network isteklerini listele |
| `browser_console_messages` | Console mesajlarini al |
| `browser_hover` | Mouse hover |
| `browser_drag` | Surukle-birak |
| `browser_select_option` | Dropdown sec |
| `browser_file_upload` | Dosya yukle |
| `browser_resize` | Pencere boyutlandir |
| `browser_navigate_back` | Geri git |
| `browser_handle_dialog` | Dialog yonet |
| `browser_run_code` | Playwright kodu calistir |
| `browser_install` | Browser kur |

---

## Workflow Entegrasyonu

### Playwright Competitor Scraper

```
Schedule → Navigate → Snapshot → Screenshot → AI Analyze → PostgreSQL → Slack
```

**Ozellikler:**
- Her 6 saatte otomatik calisir
- Rakip sitesinin tam ekran goruntusunu alir
- AI ile rekabet analizi yapar
- Sonuclari PostgreSQL'e kaydeder
- Slack'e bildirim gonderir

### Playwright Social Monitor

```
Schedule → Get Profiles → Loop → Navigate → Wait → Snapshot → AI Extract → Save → Alert
```

**Ozellikler:**
- Her 2 saatte calisir
- Veritabanindaki profilleri tarar
- Takipci/engagement degisimlerini tespit eder
- Buyuk degisikliklerde Slack alert gonderir

---

## Guvenlik

### Izin Verilen Domain'ler

```json
{
    "allowed_domains": [
        "*.google.com",
        "*.instagram.com",
        "*.tiktok.com",
        "*.twitter.com",
        "*.trendyol.com",
        "*.hepsiburada.com"
    ]
}
```

### En Iyi Uygulamalar

1. **Headless Mode:** Production'da her zaman `HEADLESS=true` kullanin
2. **Network Isolation:** `grain-network` icinde calistirin
3. **Timeout:** Uzun islemler icin timeout degerlerini ayarlayin
4. **Rate Limiting:** Siteleri fazla yuklemekten kacinin
5. **Error Handling:** Her workflow'da hata yakalama ekleyin

---

## Claude Code Entegrasyonu

Claude Code'da Playwright MCP kullanmak icin:

**macOS/Linux:**
```bash
# ~/.config/claude-code/settings.json
```

**Windows:**
```bash
# %APPDATA%\claude-code\settings.json
```

```json
{
    "mcpServers": {
        "playwright": {
            "command": "docker",
            "args": ["run", "-i", "--rm", "mcp/playwright"]
        }
    }
}
```

---

## Sorun Giderme

### Browser Kurulu Degil

```bash
# Playwright browser'i kur
docker exec -it grain-playwright npx playwright install chromium
```

### Network Erisim Hatasi

```bash
# Docker network'u kontrol et
docker network inspect grain-network
```

### Timeout Hatasi

```yaml
# docker-compose.yml'de timeout artir
environment:
  - TIMEOUT_NAVIGATION=120000
```

---

## Ileri Seviye Kullanim

### Custom Playwright Script

```javascript
// n8n'de browser_run_code ile
await page.goto('https://example.com');
await page.waitForSelector('.product-list');
const products = await page.$$eval('.product', els =>
    els.map(el => ({
        name: el.querySelector('.name').textContent,
        price: el.querySelector('.price').textContent
    }))
);
return products;
```

### Screenshot ile AI Analiz

```
1. browser_take_screenshot → base64 image
2. OpenAI Vision API → Gorsel analiz
3. PostgreSQL → Sonuc kayit
```

---

*Bu dokuman Grain SaaS v5.8.0 icin gecerlidir.*
