# Session Start Hook

Bu hook, Claude Code oturumu başladığında otomatik çalışır ve proje durumunu gösterir.

## Hook Çıktısı

```
🚀 Grain SaaS Automation Suite v5.1.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Workflows: 57
🌿 Branch: claude/n8n-agency-automation-T31zr
📝 Last commit: abc123 - Add feature X
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Available Skills:
   • workflow-creator    - n8n workflow oluşturma
   • module-system       - Modül mimarisi
   • turkish-localization - Türkçe yerelleştirme
   • api-integrations    - API entegrasyonları
   • claude-code-plugins - Plugin rehberi

⚡ Quick Commands:
   /new-workflow  - Yeni workflow oluştur
   /audit         - Proje denetimi
```

## Aktivasyon

`.claude/settings.json` içinde:

```json
{
  "hooks": {
    "session_start": ".claude/hooks/session-start.sh"
  }
}
```

## Özelleştirme

Hook'u düzenleyerek:
- Ek kontroller ekle (test durumu, lint sonuçları)
- API sağlık kontrolü
- Dependency güncellemelerini kontrol et
