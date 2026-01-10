#!/bin/bash
# Grain SaaS - Hızlı n8n Cloud Import Script
# Bu scripti kendi bilgisayarında çalıştır

# API Key (zaten dolduruldu)
API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWQ3OTM1OC04M2FkLTQ3NGQtYWI3OC1lODM1NjQwY2ZkZTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY4MDQ1NjIwLCJleHAiOjE3NzA2MTMyMDB9.-sumc5kXiIEc8VEG1bUkHiIfJz-4y1wBOKrCn17sF5Q"

# n8n Cloud URL
N8N_URL="https://globaldigital.app.n8n.cloud"

echo "🚀 Grain SaaS - n8n Cloud Import"
echo "================================"
echo ""

# Repo'yu clone et (yoksa)
if [ ! -d "saas" ]; then
    echo "📥 Repo indiriliyor..."
    git clone https://github.com/No3214/saas.git
    cd saas
else
    echo "📂 Mevcut repo kullanılıyor..."
    cd saas
    git pull
fi

echo ""
echo "📤 60 workflow import ediliyor..."
echo ""

# Import çalıştır
node scripts/import-workflows.js --url "$N8N_URL" --api-key "$API_KEY" --verbose

echo ""
echo "✅ Tamamlandı!"
echo "🔗 n8n Cloud: $N8N_URL"
