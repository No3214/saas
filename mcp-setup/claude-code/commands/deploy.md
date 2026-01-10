# Deploy Command

Workflow'u production'a deploy etmek için checklist.

## Kullanım
```
/deploy [workflow-name]
```

## Pre-Deploy Checklist

### 1. Code Review
- [ ] Tüm değişiklikler review edildi
- [ ] Best practices takip edildi
- [ ] Security kontrolleri yapıldı
- [ ] Error handling mevcut

### 2. Testing
- [ ] Unit testler geçti
- [ ] Integration testler geçti
- [ ] Edge case testleri yapıldı
- [ ] Performance kabul edilebilir (<5s)

### 3. Configuration
- [ ] Production credentials ayarlandı
- [ ] Environment variables doğru
- [ ] Webhook URL'leri production'a işaret ediyor
- [ ] Rate limit'ler ayarlandı

### 4. Documentation
- [ ] README güncellendi
- [ ] API documentation mevcut
- [ ] Changelog güncellendi
- [ ] index.json güncellendi

## Deploy Steps

### Step 1: Version Bump
```bash
# index.json version güncelle
jq '.version = "X.Y.Z"' index.json > tmp && mv tmp index.json
```

### Step 2: Git Operations
```bash
git add -A
git commit -m "Deploy: [Workflow Name] v[Version]"
git tag -a v[Version] -m "Release v[Version]"
git push origin main --tags
```

### Step 3: n8n Import
```bash
# n8n CLI ile import
n8n import:workflow --input=n8n-templates/[workflow].json

# veya API ile
curl -X POST https://n8n.domain.com/api/v1/workflows \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -d @n8n-templates/[workflow].json
```

### Step 4: Activate
```bash
# Workflow'u aktif et
curl -X PATCH https://n8n.domain.com/api/v1/workflows/[id] \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -d '{"active": true}'
```

### Step 5: Verify
```bash
# Health check
curl https://n8n.domain.com/webhook/grain/health

# Test webhook
curl -X POST https://n8n.domain.com/webhook/[endpoint] \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## Post-Deploy

### Monitoring
- [ ] Grafana dashboard kontrol
- [ ] Error rate normal
- [ ] Response time normal
- [ ] No alerts

### Rollback Plan
```bash
# Önceki versiyona dön
git checkout v[previous-version] -- n8n-templates/[workflow].json
n8n import:workflow --input=n8n-templates/[workflow].json
```

## Notification
```
🚀 Deployed: [Workflow Name] v[Version]
📅 Date: [Date]
👤 By: [User]
🔗 URL: https://n8n.domain.com/workflow/[id]
```
