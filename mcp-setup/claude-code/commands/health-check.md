# Health Check Command

Sistem sağlık kontrolü yap.

## Kullanım
```
/health-check
```

## Kontrol Noktaları

### 1. Repository Status
```bash
# Git durumu
git status
git log -5 --oneline

# Değişiklik sayısı
git diff --stat
```

### 2. Workflow Inventory
```bash
# Toplam workflow sayısı
ls -la n8n-templates/*.json | wc -l

# index.json ile karşılaştır
jq '.statistics.total_workflows' index.json
```

### 3. File Integrity
```bash
# JSON syntax kontrolü
for f in n8n-templates/*.json; do
  jq '.' "$f" > /dev/null 2>&1 || echo "Invalid JSON: $f"
done
```

### 4. index.json Consistency
```javascript
// Tüm dosyalar mevcut mu?
const index = require('./index.json');
const fs = require('fs');

for (const module of Object.values(index.modules)) {
  for (const workflow of module.workflows) {
    const path = `n8n-templates/${workflow.file}`;
    if (!fs.existsSync(path)) {
      console.error(`Missing: ${path}`);
    }
  }
}
```

### 5. Statistics Validation
```javascript
// İstatistikler doğru mu?
let critical = 0, high = 0, medium = 0;

for (const module of Object.values(index.modules)) {
  for (const workflow of module.workflows) {
    if (workflow.tier === 'Critical') critical++;
    else if (workflow.tier === 'High') high++;
    else if (workflow.tier === 'Medium') medium++;
  }
}

console.log(`Critical: ${critical}, High: ${high}, Medium: ${medium}`);
```

## Health Report

```markdown
# 🏥 Grain SaaS Health Report

Generated: [Date]
Version: [Version]

## Summary
| Metric | Value | Status |
|--------|-------|--------|
| Total Workflows | 57 | ✅ |
| JSON Valid | 57/57 | ✅ |
| Index Sync | 100% | ✅ |
| Git Clean | Yes | ✅ |

## Modules
| Module | Workflows | Issues |
|--------|-----------|--------|
| core | 5 | 0 |
| ai_engine | 8 | 0 |
| ... | ... | ... |

## Recent Changes
- [commit hash] [message]
- [commit hash] [message]

## Recommendations
- [ ] [If any issues found]

## Status: 🟢 HEALTHY / 🟡 WARNING / 🔴 CRITICAL
```

## Auto-Fix Options

### Fix index.json statistics
```bash
# Recalculate and update
node scripts/update-stats.js
```

### Sync missing workflows
```bash
# Add missing files to index
node scripts/sync-index.js
```
