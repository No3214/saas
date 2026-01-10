# n8n Cloud Import Rehberi

Bu rehber, Grain SaaS workflow'larını n8n Cloud instance'ınıza import etmenizi sağlar.

## Hızlı Başlangıç (Önerilen)

### Adım 1: n8n Cloud API Key Oluşturma

1. https://globaldigital.app.n8n.cloud adresine gidin
2. **Settings** (Dişli ikonu) > **API** bölümüne gidin
3. **Create API Key** butonuna tıklayın
4. Key'i kopyalayın (bir kez gösterilir!)

### Adım 2: Projeyi Clone'layın

```bash
git clone https://github.com/No3214/saas.git
cd saas
```

### Adım 3: Import Script'ini Çalıştırın

```bash
# API Key ile import
node scripts/import-workflows.js \
  --url https://globaldigital.app.n8n.cloud \
  --api-key YOUR_API_KEY_HERE

# Önce test etmek için (dry-run):
node scripts/import-workflows.js \
  --url https://globaldigital.app.n8n.cloud \
  --api-key YOUR_API_KEY_HERE \
  --dry-run
```

### Beklenen Çıktı

```
╔═══════════════════════════════════════════════════════════════╗
║        Grain SaaS - Workflow Import Script                    ║
╚═══════════════════════════════════════════════════════════════╝

✓ Connected to n8n
ℹ Found 57 workflow templates
✓ Imported: Grain_AI_Appointment_Booking_v1
✓ Imported: Grain_AI_Content_Generator_v1
...

╔═══════════════════════════════════════════════════════════════╗
║                      Import Summary                           ║
╠═══════════════════════════════════════════════════════════════╣
║  Imported: 57                                                 ║
║  Skipped:  0                                                  ║
║  Failed:   0                                                  ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Manuel Import (Alternatif)

### Tek Workflow Import

1. n8n Cloud'da **Workflows** > **Add Workflow** > **Import from File**
2. `templates/` klasöründen `.json` dosyası seçin
3. **Import** butonuna tıklayın

### Toplu Import (Manuel)

Browser console'da çalıştırın:

```javascript
// templates/ klasöründeki JSON dosyalarını sırayla yükleyin
// Her dosya için: Workflows > Import from File
```

---

## MCP Server Entegrasyonu

Claude Code ile n8n Cloud entegrasyonu için:

### Adım 1: JWT Token Alın

1. n8n Cloud'da **Settings** > **AI** > **MCP Server**
2. **Enable MCP Server** seçeneğini aktifleştirin
3. **Generate Token** butonuna tıklayın
4. JWT token'ı kopyalayın

### Adım 2: MCP Config Güncelleyin

`~/.mcp.json` dosyasını düzenleyin:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": [
        "-y", "supergateway", "--streamableHttp",
        "https://globaldigital.app.n8n.cloud/mcp-server/http",
        "--header", "authorization:Bearer YOUR_JWT_TOKEN_HERE"
      ],
      "description": "n8n cloud workflow automation"
    }
  }
}
```

### Adım 3: Claude Code'u Yeniden Başlatın

MCP server'ı aktifleştirmek için Claude Code'u yeniden başlatın.

---

## Troubleshooting

### "401 Unauthorized" Hatası
- API Key doğru mu kontrol edin
- API Key'in expired olmadığından emin olun
- Yeni bir API Key oluşturun

### "403 Forbidden" Hatası
- n8n Cloud plan limitlerini kontrol edin
- API erişiminin aktif olduğundan emin olun

### "ECONNREFUSED" Hatası
- Internet bağlantısını kontrol edin
- URL'nin doğru olduğundan emin olun

### "Workflow already exists" Uyarısı
- Script otomatik olarak mevcut workflow'ları atlar
- `--verbose` flag'i ile detaylı bilgi alın

---

## Workflow Listesi

Import edilecek 57 workflow:

| Kategori | Adet | Örnekler |
|----------|------|----------|
| AI & LLM | 15 | Content Generator, Chat Assistant |
| Marketing | 12 | Multi-Platform Publisher, SEO Tools |
| Real Estate | 10 | Lead Capture, Property Sync |
| Communication | 8 | WhatsApp Bot, Email Automation |
| Analytics | 7 | Dashboard, Reports |
| Core | 5 | Orchestrator, Error Handler |

---

## Destek

- GitHub Issues: https://github.com/No3214/saas/issues
- n8n Docs: https://docs.n8n.io/api/
- n8n Community: https://community.n8n.io/
