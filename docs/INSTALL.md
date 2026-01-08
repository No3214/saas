# 🚀 N8N Workflow Kurulum Rehberi

## Hızlı Başlangıç

### Yöntem 1: PowerShell ile (Windows)
```powershell
cd n8n-templates
.\import_all.ps1
```

### Yöntem 2: Bash ile (Linux/Mac)
```bash
cd n8n-templates
chmod +x import_all.sh
./import_all.sh
```

### Yöntem 3: n8n CLI ile (Manuel)
```bash
n8n import:workflow --input=Grain_Master_Orchestrator_v1.json
# ... diğer dosyalar için tekrarla
```

---

## Gerekli Environment Variables

Workflow'ların çalışması için aşağıdaki değişkenleri ayarlayın:

```bash
# Temel
N8N_BASE_URL=https://your-n8n-instance.com
OPENAI_API_KEY=sk-...

# İletişim
SLACK_BOT_TOKEN=xoxb-...
SLACK_WEBHOOK_URL=https://hooks.slack.com/...

# Veri
GOOGLE_SHEETS_CREDENTIALS=...

# SEO
SERPER_API_KEY=...
GSC_SITE_URL=https://yoursite.com

# Opsiyonel
WHATSAPP_PHONE_ID=...
META_ACCESS_TOKEN=...
PINECONE_API_KEY=...
```

---

## Credentials Ayarlama

n8n arayüzünden şu credentials'ları oluşturun:

| Credential | Kullanıldığı Yer |
|:---|:---|
| OpenAI | Tüm AI workflow'ları |
| Gmail | Email gönderimi |
| Google Sheets | Veri saklama |
| Slack | Bildirimler |

---

## Import Sonrası Kontrol

1. n8n → Workflows → Tüm workflow'ların listelendiğini doğrula
2. Her workflow'u aç → Credentials hata veriyorsa bağla
3. Test: Master Orchestrator'ı manuel çalıştır
