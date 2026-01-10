---
name: Claude Code Plugins
description: Claude Code resmi plugin'leri - code-simplifier, code-review, security-guidance, frontend-design ve kurulum rehberi.
triggers:
  - "plugin"
  - "claude code plugin"
  - "code review"
  - "code simplifier"
---

# Claude Code Plugins Skill

Claude Code için tüm resmi plugin'ler ve kullanım rehberi.

## Plugin Kurulumu

```bash
# Marketplace'den ekle (ilk seferde)
/plugin marketplace add anthropics/claude-code

# Marketplace güncelle
/plugin marketplace update claude-plugins-official

# Plugin kur
/plugin install [plugin-name]

# Plugin listele
/plugin list
```

---

## 14 Resmi Plugin - Detaylı Rehber

### 1. agent-sdk-dev
```bash
/plugin install agent-sdk-dev
```
**Açıklama:** Claude Agent SDK geliştirme toolkit'i

**Özellikler:**
- SDK setup komutları
- Validation agent'ları
- Agent geliştirme şablonları
- Test ve debug araçları

**Kullanım:**
```
"Set up a new Claude Agent SDK project"
"Validate my agent configuration"
```

---

### 2. claude-opus-4-5-migration
```bash
/plugin install claude-opus-4-5-migration
```
**Açıklama:** Sonnet 4.x ve Opus 4.1'den otomatik migrasyon

**Özellikler:**
- API değişiklik analizi
- Otomatik kod güncelleme
- Breaking changes uyarıları
- Rollback planı

**Kullanım:**
```
"Migrate my code to Claude Opus 4.5"
"Check for Opus 4.5 compatibility issues"
```

---

### 3. code-review
```bash
/plugin install code-review
```
**Açıklama:** 5 özel agent ile paralel PR review

**Agent'lar:**
1. **Security Agent** - Güvenlik açıkları
2. **Performance Agent** - Performans sorunları
3. **Style Agent** - Kod stili ve convention
4. **Logic Agent** - Mantıksal hatalar
5. **Documentation Agent** - Dokümantasyon eksiklikleri

**Kullanım:**
```
"Review my PR with all agents"
"Run security review only"
```

---

### 4. code-simplifier
```bash
/plugin install code-simplifier
```
**Açıklama:** PR ve kod sadeleştirme agent'ı

**Özellikler:**
- Karmaşık kodu basitleştirir
- Gereksiz abstraction'ları kaldırır
- DRY prensibini uygular
- Okunabilirliği artırır

**Kullanım:**
```
"Use the code simplifier agent on this PR"
"Simplify the complex functions in this file"
```

---

### 5. commit-commands
```bash
/plugin install commit-commands
```
**Açıklama:** Git workflow otomasyonu

**Komutlar:**
- `/commit` - Akıllı commit mesajı oluştur
- `/amend` - Son commit'i düzenle
- `/squash` - Commit'leri birleştir
- `/revert` - Güvenli geri al

**Özellikler:**
- Conventional Commits formatı
- Auto-staging
- Semantic versioning

---

### 6. explanatory-output-style
```bash
/plugin install explanatory-output-style
```
**Açıklama:** Açıklamalı output modu

**Özellikler:**
- Implementation kararlarını açıklar
- Codebase pattern'lerini tanımlar
- Alternatif yaklaşımları sunar
- Debugging insight'ları verir

**Aktivasyon:**
```
/config → Output Style → Explanatory
```

---

### 7. feature-dev
```bash
/plugin install feature-dev
```
**Açıklama:** 7 aşamalı yapılandırılmış feature geliştirme

**Aşamalar:**
1. **Discovery** - Gereksinim analizi
2. **Design** - Teknik tasarım
3. **Planning** - Task breakdown
4. **Implementation** - Kod yazma
5. **Testing** - Test yazma
6. **Review** - Code review
7. **Deploy** - Deployment

**Kullanım:**
```
"Start feature development for user authentication"
```

---

### 8. frontend-design
```bash
/plugin install frontend-design
```
**Açıklama:** Production-grade UI tasarımı

**Özellikler:**
- Generic AI estetiğinden kaçınır
- Bold, distinctive tasarımlar
- Modern CSS patterns
- Tipografi ve spacing rehberi
- Dark/Light mode
- Responsive layouts
- Accessibility (a11y)

**Kullanım:**
```
"Design a modern dashboard UI"
"Create a landing page with bold design"
```

---

### 9. hookify
```bash
/plugin install hookify
```
**Açıklama:** Custom hook oluşturma

**Hook Tipleri:**
- `pre-tool` - Tool çalışmadan önce
- `post-tool` - Tool çalıştıktan sonra
- `session-start` - Oturum başlangıcı
- `pre-commit` - Commit öncesi

**Kullanım:**
```
"Create a hook to prevent rm -rf commands"
"Add a pre-commit hook for linting"
```

---

### 10. learning-output-style
```bash
/plugin install learning-output-style
```
**Açıklama:** İnteraktif öğretici mod

**Özellikler:**
- Kod yazmayı size bırakır
- Adım adım rehberlik
- Açıklamalı örnekler
- Quiz ve pratik

**Aktivasyon:**
```
/config → Output Style → Learning
```

---

### 11. plugin-dev
```bash
/plugin install plugin-dev
```
**Açıklama:** Plugin geliştirme toolkit'i

**Araçlar:**
- Plugin şablonu oluştur
- Manifest generator
- Test harness
- Documentation generator

**Kullanım:**
```
"Create a new Claude Code plugin"
"Generate plugin manifest"
```

---

### 12. pr-review-toolkit
```bash
/plugin install pr-review-toolkit
```
**Açıklama:** Kapsamlı PR analiz agent'ları

**Agent'lar:**
- **Diff Analyzer** - Değişiklikleri analiz et
- **Impact Assessor** - Etki değerlendirmesi
- **Test Coverage** - Test kapsama analizi
- **Code Simplifier** - Sadeleştirme önerileri
- **Merge Advisor** - Merge tavsiyesi

---

### 13. ralph-wiggum
```bash
/plugin install ralph-wiggum
```
**Açıklama:** Self-referential AI loops

**Özellikler:**
- İteratif geliştirme
- Kendi kodunu analiz eder
- Sürekli iyileştirme döngüsü
- Meta-programming

---

### 14. security-guidance
```bash
/plugin install security-guidance
```
**Açıklama:** Güvenlik pattern monitoring hook

**Kontroller:**
- OWASP Top 10
- SQL Injection
- XSS
- CSRF
- Credentials exposure
- Insecure dependencies

**Kullanım:**
```
"Check this code for security issues"
"Run security audit on the project"
```

---

## Grain SaaS için Önerilen Kurulum

```bash
# 1. Marketplace ekle
/plugin marketplace add anthropics/claude-code

# 2. Temel plugin'ler
/plugin install code-simplifier
/plugin install frontend-design
/plugin install commit-commands
/plugin install security-guidance

# 3. Geliştirme için
/plugin install feature-dev
/plugin install code-review
/plugin install hookify

# 4. Output style (opsiyonel)
/plugin install explanatory-output-style
```

## Plugin Yapılandırma

`.claude/settings.json`:

```json
{
  "plugins": {
    "recommended": [
      "code-simplifier",
      "frontend-design",
      "commit-commands",
      "security-guidance",
      "feature-dev"
    ],
    "install_commands": [
      "/plugin marketplace add anthropics/claude-code",
      "/plugin install code-simplifier",
      "/plugin install frontend-design"
    ]
  }
}
```

## Quick Reference

| Plugin | Komut | Kullanım |
|--------|-------|----------|
| code-simplifier | "simplify this code" | PR cleanup |
| frontend-design | "design a UI" | UI/UX |
| code-review | "review my PR" | PR review |
| feature-dev | "start feature X" | Development |
| commit-commands | `/commit` | Git workflow |
| security-guidance | "security check" | Security |

## Kaynaklar

- [GitHub: anthropics/claude-code/plugins](https://github.com/anthropics/claude-code/tree/main/plugins)
- [Plugin Marketplace](https://github.com/anthropics/claude-code)
- [Claude Code Docs](https://docs.anthropic.com/claude-code)
