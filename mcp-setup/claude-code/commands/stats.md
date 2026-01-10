# Stats Command

Proje istatistiklerini göster.

## Kullanım
```
/stats
```

## Çıktı

```
📊 Grain SaaS Automation Suite - Statistics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Version: 5.1.0
Last Updated: 2026-01-09

📦 WORKFLOWS
   Total: 57
   ├── Critical: 22 (39%)
   ├── High: 28 (49%)
   └── Medium: 7 (12%)

📁 MODULES (16)
   ├── core                 5 workflows
   ├── ai_engine            8 workflows
   ├── data_intelligence    5 workflows
   ├── customer_success     6 workflows
   ├── sales_revenue        4 workflows
   ├── marketing            6 workflows
   ├── seo                  4 workflows
   ├── local_seo_turkey     4 workflows
   ├── hospitality          3 workflows
   ├── real_estate          1 workflow
   ├── ecommerce            1 workflow
   ├── voice_ai             1 workflow
   ├── agency_tools         3 workflows
   ├── hr_operations        1 workflow
   ├── finance              2 workflows
   └── communication        3 workflows

🏷️ VERTICALS
   ├── General SaaS
   ├── E-commerce
   ├── Hospitality
   ├── Real Estate
   └── Local Business (Turkey)

📈 GROWTH
   v5.0.0 → v5.1.0: +4 workflows (+7.5%)

🔧 CONFIGURATION
   ├── Skills: 11
   ├── Commands: 6
   └── Hooks: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Hesaplama Script'i

```javascript
const index = require('./index.json');
const fs = require('fs');
const path = require('path');

// Workflow counts
let stats = { critical: 0, high: 0, medium: 0, total: 0 };
let moduleStats = {};

for (const [name, module] of Object.entries(index.modules)) {
  moduleStats[name] = module.workflows.length;
  for (const wf of module.workflows) {
    stats.total++;
    if (wf.tier === 'Critical') stats.critical++;
    else if (wf.tier === 'High') stats.high++;
    else stats.medium++;
  }
}

// Skills count
const skillsDir = '.claude/skills';
const skills = fs.readdirSync(skillsDir).filter(f =>
  fs.statSync(path.join(skillsDir, f)).isDirectory()
).length;

// Commands count
const commandsDir = '.claude/commands';
const commands = fs.readdirSync(commandsDir).filter(f =>
  f.endsWith('.md')
).length;

console.log(JSON.stringify({ stats, moduleStats, skills, commands }, null, 2));
```

## Export Options

### JSON
```bash
jq '{
  version: .version,
  total: .statistics.total_workflows,
  modules: .statistics.modules,
  tiers: {
    critical: .statistics.critical_tier,
    high: .statistics.high_tier,
    medium: .statistics.medium_tier
  }
}' index.json
```

### CSV
```bash
echo "Module,Workflows,Tier"
jq -r '.modules | to_entries[] | .key as $m | .value.workflows[] | [$m, .name, .tier] | @csv' index.json
```

### Markdown Table
```bash
echo "| Module | Workflows |"
echo "|--------|-----------|"
jq -r '.modules | to_entries[] | "| \(.key) | \(.value.workflows | length) |"' index.json
```
