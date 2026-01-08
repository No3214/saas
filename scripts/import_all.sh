#!/bin/bash
# ============================================
# n8n Workflow Bulk Importer (Linux/Mac)
# Grain SaaS Automation Suite
# ============================================

N8N_URL="${N8N_URL:-http://localhost:5678}"
API_KEY="${N8N_API_KEY}"

echo "========================================"
echo "  Grain n8n Bulk Workflow Importer"
echo "========================================"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Count workflow files
WORKFLOW_FILES=(${SCRIPT_DIR}/Grain_*.json)
TOTAL_FILES=${#WORKFLOW_FILES[@]}
SUCCESS_COUNT=0
FAIL_COUNT=0

echo "Bulunan workflow sayisi: $TOTAL_FILES"
echo ""

# Check if API key exists
if [ -z "$API_KEY" ]; then
    echo "UYARI: N8N_API_KEY bulunamadi!"
    echo "n8n CLI yontemi kullaniliyor..."
    USE_CLI=true
else
    USE_CLI=false
fi

for file in "${WORKFLOW_FILES[@]}"; do
    filename=$(basename "$file")
    CURRENT=$((SUCCESS_COUNT + FAIL_COUNT + 1))
    echo -n "[$CURRENT/$TOTAL_FILES] Importing: $filename... "
    
    if [ "$USE_CLI" = true ]; then
        # Use n8n CLI
        if n8n import:workflow --input="$file" 2>/dev/null; then
            echo "OK"
            ((SUCCESS_COUNT++))
        else
            echo "HATA"
            ((FAIL_COUNT++))
        fi
    else
        # Use API
        RESPONSE=$(curl -s -X POST "$N8N_URL/api/v1/workflows" \
            -H "X-N8N-API-KEY: $API_KEY" \
            -H "Content-Type: application/json" \
            -d @"$file")
        
        if echo "$RESPONSE" | grep -q '"id"'; then
            ID=$(echo "$RESPONSE" | grep -o '"id":[0-9]*' | grep -o '[0-9]*')
            echo "OK (ID: $ID)"
            ((SUCCESS_COUNT++))
        else
            echo "HATA"
            ((FAIL_COUNT++))
        fi
    fi
done

echo ""
echo "========================================"
echo "  IMPORT TAMAMLANDI"
echo "========================================"
echo ""
echo "Basarili: $SUCCESS_COUNT / $TOTAL_FILES"
if [ $FAIL_COUNT -gt 0 ]; then
    echo "Basarisiz: $FAIL_COUNT"
fi
echo ""
echo "Sonraki adimlar:"
echo "1. n8n arayuzunu acin: $N8N_URL"
echo "2. Credentials'lari ayarlayin"
echo "3. Environment variables'lari kontrol edin"
echo ""
