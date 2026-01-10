#!/bin/bash
# Grain SaaS - Session Start Hook
# Bu hook her Claude Code oturumu başladığında çalışır

echo "🚀 Grain SaaS Automation Suite v5.1.0"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Proje durumu
WORKFLOW_COUNT=$(ls -1 n8n-templates/*.json 2>/dev/null | wc -l)
echo "📦 Workflows: $WORKFLOW_COUNT"

# Git durumu
BRANCH=$(git branch --show-current 2>/dev/null)
UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l)
echo "🌿 Branch: $BRANCH"
if [ "$UNCOMMITTED" -gt 0 ]; then
    echo "⚠️  Uncommitted changes: $UNCOMMITTED files"
fi

# Son commit
LAST_COMMIT=$(git log -1 --format="%h - %s" 2>/dev/null)
echo "📝 Last commit: $LAST_COMMIT"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Available Skills:"
echo "   • workflow-creator    - n8n workflow oluşturma"
echo "   • module-system       - Modül mimarisi"
echo "   • turkish-localization - Türkçe yerelleştirme"
echo "   • api-integrations    - API entegrasyonları"
echo "   • claude-code-plugins - Plugin rehberi"
echo ""
echo "⚡ Quick Commands:"
echo "   /new-workflow  - Yeni workflow oluştur"
echo "   /audit         - Proje denetimi"
echo ""
