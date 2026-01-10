# Grain SaaS - Manuel Workflow Import Rehberi

n8n'e workflow'ları toplu yüklemek için bu adımları takip edin.

## Yöntem 1: n8n CLI ile Import (En Kolay)

```bash
# Yerel bilgisayarınızda n8n kurulu ise:
cd /path/to/saas/templates

# Tüm workflow'ları import et
for f in Grain_*.json; do
  n8n import:workflow --input="$f"
  echo "Imported: $f"
done
```

## Yöntem 2: n8n API ile Import

```bash
# n8n API key oluşturun: Settings > API > Create API Key

# API ile import
N8N_URL="http://localhost:5678"
N8N_API_KEY="your-api-key"

for f in templates/Grain_*.json; do
  curl -X POST "$N8N_URL/api/v1/workflows" \
    -H "X-N8N-API-KEY: $N8N_API_KEY" \
    -H "Content-Type: application/json" \
    -d @"$f"
  echo "Imported: $f"
done
```

## Yöntem 3: n8n UI ile Manuel Import

1. n8n'i açın: `http://localhost:5678`
2. **Settings** (⚙️) > **Import from File**
3. `templates/` klasöründen workflow seçin
4. Her workflow için tekrarlayın

## Yöntem 4: Bulk Import Script (Node.js)

```bash
# Proje dizininde
cd /path/to/saas

# Import scriptini çalıştır
N8N_URL=http://localhost:5678 N8N_API_KEY=your-key node scripts/import-workflows.js
```

## Yöntem 5: Docker ile n8n (Önerilen)

```bash
# Docker ile n8n başlat
cd /path/to/saas
docker-compose -f docker/docker-compose.main.yml up -d

# Import scriptini çalıştır
node scripts/import-workflows.js --url http://localhost:5678
```

---

## Workflow Listesi (57 adet)

| Kategori | Workflow Sayısı |
|----------|-----------------|
| Core | 3 |
| Voice AI | 2 |
| Turkish Local | 3 |
| Customer Success | 6 |
| Hospitality | 5 |
| SEO & Marketing | 6 |
| Operations | 4 |
| AI Productivity | 5 |
| Diğer | 23 |

## Önemli Notlar

1. **API Key**: n8n Settings > API > Create API Key
2. **MCP Server**: n8n Settings > AI > MCP Server > Enable
3. **Credentials**: Her workflow için gerekli API keylerini ayarlayın
4. **Test**: Import sonrası manuel test yapın

## Sorun Giderme

### Port 5678'e erişemiyorum
```bash
# n8n çalışıyor mu kontrol et
curl http://localhost:5678/healthz

# Firewall kontrolü
sudo ufw allow 5678

# Docker network kontrolü
docker network ls
```

### Import başarısız
- JSON dosyasının valid olduğunu kontrol edin
- API key'in geçerli olduğundan emin olun
- n8n loglarını kontrol edin: `docker logs grain-n8n`
