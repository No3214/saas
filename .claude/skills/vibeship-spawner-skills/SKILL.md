# VibeShip Spawner Skills Integration

462 production-grade skill sistemi entegrasyonu.

## Değerlendirme

### Güçlü Yönler ✅

| Özellik | Açıklama |
|---------|----------|
| **462 Skill** | 35 kategoride kapsamlı kapsama |
| **4-Dosya Sistemi** | skill.yaml, sharp-edges.yaml, validations.yaml, collaboration.yaml |
| **Production-Grade** | Battle-tested patterns, anti-patterns |
| **Offline Çalışır** | Zero API cost, local YAML files |
| **MCP Entegrasyonu** | Model Context Protocol desteği |

### Kategoriler (35)

**Development:**
- game-dev (51 skill)
- backend (21)
- frontend (8)
- frameworks (12)

**Business:**
- marketing (36)
- startup (3)
- strategy (24)
- finance (6)

**Operations:**
- devops (22)
- security (13)
- testing (8)
- enterprise (6)

**Specialized:**
- blockchain (20)
- AI/agents (47)
- biotech (6)
- space (5)

## Kurulum

```bash
# Tek komutla tüm skill'leri kur + MCP server
npx github:vibeforge1111/vibeship-spawner-skills install --mcp

# Sadece essentials paketi
npx github:vibeforge1111/vibeship-spawner-skills install --pack essentials

# Sadece agents paketi
npx github:vibeforge1111/vibeship-spawner-skills install --pack agents
```

## Skill Yapısı

Her skill 4 YAML dosyasından oluşur:

### 1. skill.yaml
```yaml
name: "skill-name"
role: "Expert in X domain"
patterns:
  - name: "Pattern Name"
    description: "When to use"
    code: |
      // Implementation example
anti_patterns:
  - name: "Anti-Pattern"
    why_bad: "Explanation"
    fix: "Better approach"
```

### 2. sharp-edges.yaml
```yaml
gotchas:
  - id: "gotcha-001"
    severity: "critical"
    detection: "regex pattern"
    description: "What goes wrong"
    fix: "How to avoid"
```

### 3. validations.yaml
```yaml
validators:
  - name: "check-something"
    pattern: "regex"
    message: "Error message"
    severity: "error|warning|info"
```

### 4. collaboration.yaml
```yaml
delegates_to:
  - skill: "other-skill"
    when: "Condition to delegate"
receives_from:
  - skill: "another-skill"
    for: "What it receives"
```

## Grain SaaS ile Entegrasyon

### İlgili Skill Kategorileri

| Spawner Kategori | Grain Modül | Kullanım |
|------------------|-------------|----------|
| backend | core | API design, n8n patterns |
| ai-agents | ai_engine | Agent orchestration |
| marketing | marketing | Campaign automation |
| security | security-compliance | KVKK, data protection |
| devops | core | CI/CD, deployment |
| testing | testing-debugging | Workflow testing |

### Önerilen Skill Paketleri

```bash
# n8n geliştirme için
npx github:vibeforge1111/vibeship-spawner-skills install \
  backend \
  ai-agents \
  testing \
  security

# Marketing otomasyon için
npx github:vibeforge1111/vibeship-spawner-skills install \
  marketing \
  strategy \
  analytics
```

## MCP Server Bağlantısı

### n8n MCP Server
```bash
# n8n'in MCP server'ına bağlan
claude mcp add n8n-local http://localhost:5678/mcp-server/http
```

### Spawner MCP Server
```bash
# Spawner skills MCP server (kurulum sonrası)
npx github:vibeforge1111/vibeship-spawner-skills install --mcp
```

## Karşılaştırma

| Özellik | Grain Skills | Spawner Skills |
|---------|--------------|----------------|
| Format | Markdown | YAML (4-file) |
| Sayı | 11 | 462 |
| Odak | n8n workflow | Genel geliştirme |
| Validations | ❌ | ✅ Regex-based |
| Sharp Edges | ❌ | ✅ Severity levels |
| Collaboration | ❌ | ✅ Cross-skill |
| MCP | ❌ | ✅ Built-in |

## Hibrit Yaklaşım

Grain'in n8n-specific skill'leri + Spawner'ın genel skill'leri:

```
.claude/skills/
├── [Grain skills - n8n focused]
│   ├── workflow-creator/
│   ├── api-integrations/
│   └── ...
│
└── [Spawner skills - general dev]
    ├── backend/
    ├── ai-agents/
    ├── marketing/
    └── ...
```

## Kaynaklar

- [GitHub: vibeforge1111/vibeship-spawner-skills](https://github.com/vibeforge1111/vibeship-spawner-skills)
- [Apache 2.0 License](https://github.com/vibeforge1111/vibeship-spawner-skills/blob/main/LICENSE)
