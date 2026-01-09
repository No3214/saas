# Claude Code Plugins Skill

Claude Code için önerilen plugin'ler ve kullanım rehberi.

## Plugin Kurulumu

```bash
# Marketplace'den ekle
/plugin marketplace add anthropics/claude-code

# Plugin kur
/plugin install [plugin-name]
```

## Önerilen Plugin'ler

### 1. code-simplifier (PR Review Toolkit)
```bash
/plugin install code-simplifier
```
- PR'ları temizler ve basitleştirir
- Uzun kodlama oturumlarından sonra kullan
- Karmaşık PR'ları sadeleştirir

**Kullanım:**
```
Claude'a "use the code simplifier agent" de
```

### 2. frontend-design
```bash
/plugin install frontend-design@claude-code-plugins
```
- Production-grade UI tasarımı
- Generic AI estetiğinden kaçınır
- Tipografi ve görsel detaylar

**Özellikleri:**
- Bold, distinctive tasarımlar
- Modern CSS patterns
- Responsive layouts
- Dark/Light mode desteği

### 3. code-review
```bash
/plugin install code-review
```
- 5 özel agent ile paralel PR review
- Security, performance, style kontrolleri

### 4. feature-dev
```bash
/plugin install feature-dev
```
- 7 aşamalı yapılandırılmış geliştirme
- Planning → Implementation → Testing → Deploy

### 5. commit-commands
```bash
/plugin install commit-commands
```
- Git workflow otomasyonu
- Conventional commits
- Auto-staging

### 6. hookify
```bash
/plugin install hookify
```
- Custom hook'lar oluştur
- İstenmeyen davranışları engelle

### 7. security-guidance
```bash
/plugin install security-guidance
```
- Security pattern monitoring
- Vulnerability detection
- Best practices enforcement

## Tüm Resmi Plugin'ler (14)

| Plugin | Açıklama |
|--------|----------|
| agent-sdk-dev | SDK geliştirme toolkit |
| claude-opus-4-5-migration | Model migrasyon yardımcısı |
| code-review | 5 agent ile paralel review |
| commit-commands | Git otomasyon |
| explanatory-output-style | Açıklamalı output |
| feature-dev | 7-fazlı feature geliştirme |
| frontend-design | Production UI tasarımı |
| hookify | Custom hook oluşturma |
| learning-output-style | Öğretici mod |
| plugin-dev | Plugin geliştirme toolkit |
| pr-review-toolkit | PR analiz agent'ları |
| ralph-wiggum | İteratif geliştirme |
| security-guidance | Güvenlik monitoring |

## Grain SaaS için Önerilen Kurulum

```bash
# Temel plugin'ler
/plugin install code-simplifier
/plugin install frontend-design
/plugin install commit-commands
/plugin install security-guidance

# Geliştirme için
/plugin install feature-dev
/plugin install code-review
```

## Plugin Yapılandırma

`.claude/settings.json` içine ekle:

```json
{
  "plugins": {
    "enabled": [
      "code-simplifier",
      "frontend-design",
      "commit-commands"
    ],
    "config": {
      "frontend-design": {
        "style": "modern",
        "darkMode": true,
        "language": "tr"
      }
    }
  }
}
```

## Kaynaklar

- [GitHub: anthropics/claude-code/plugins](https://github.com/anthropics/claude-code/tree/main/plugins)
- [Plugin Marketplace](https://github.com/anthropics/claude-code)
