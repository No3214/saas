#!/bin/bash
# Grain SaaS - Hızlı n8n Cloud Import Script
# Bu scripti kendi bilgisayarında çalıştır

# n8n Cloud URL
N8N_URL="https://globaldigital.app.n8n.cloud"

# API Key - environment variable veya parametre olarak al
API_KEY="${N8N_API_KEY:-$1}"

if [ -z "$API_KEY" ]; then
    echo "❌ API Key gerekli!"
    echo ""
    echo "Kullanım:"
    echo "  export N8N_API_KEY='your-api-key'"
    echo "  bash scripts/quick-import.sh"
    echo ""
    echo "veya:"
    echo "  bash scripts/quick-import.sh 'your-api-key'"
    echo ""
    echo "API Key almak için:"
    echo "  n8n Cloud > Settings > API > Create API Key"
    exit 1
fi

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
