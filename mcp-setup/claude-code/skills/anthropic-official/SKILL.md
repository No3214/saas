---
name: Anthropic Official
description: Anthropic resmi kaynakları - claude-code, skills, mcp-servers, cookbooks ve SDK entegrasyonu.
triggers:
  - "anthropic"
  - "claude"
  - "official"
  - "resmi"
---

# Anthropic Official Resources

Anthropic'in resmi GitHub kaynakları ve projeye entegrasyonu.

## Resmi Repolar

| Repo | Stars | Açıklama |
|------|-------|----------|
| [claude-code](https://github.com/anthropics/claude-code) | 54k | Terminal-based agentic coding tool |
| [skills](https://github.com/anthropics/skills) | 36k | Agent Skills kütüphanesi |
| [claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 2.3k | Resmi plugin directory |
| [claude-cookbooks](https://github.com/anthropics/claude-cookbooks) | 31k | Pratik örnekler ve notebook'lar |
| [courses](https://github.com/anthropics/courses) | 18k | Eğitim materyalleri |

## Resmi Skills (16)

### Document Skills
```bash
/plugin install document-skills@anthropic-agent-skills
```

| Skill | Açıklama |
|-------|----------|
| **pdf** | PDF oluşturma ve düzenleme |
| **docx** | Word dokümanı işleme |
| **pptx** | PowerPoint sunumları |
| **xlsx** | Excel spreadsheet'leri |

### Design Skills
| Skill | Açıklama |
|-------|----------|
| **frontend-design** | UI/UX tasarımı |
| **canvas-design** | Canvas tabanlı tasarım |
| **brand-guidelines** | Marka standartları |
| **theme-factory** | Tema oluşturma |
| **algorithmic-art** | Algoritmik sanat |

### Development Skills
| Skill | Açıklama |
|-------|----------|
| **mcp-builder** | MCP server oluşturma |
| **webapp-testing** | Web app test etme |
| **web-artifacts-builder** | Web artifact'ları |
| **skill-creator** | Yeni skill oluşturma |

### Communication Skills
| Skill | Açıklama |
|-------|----------|
| **doc-coauthoring** | Doküman işbirliği |
| **internal-comms** | İç iletişim |
| **slack-gif-creator** | Slack GIF'leri |

## Resmi Plugins (25)

### Development Plugins
```bash
/plugin install code-review@claude-plugin-directory
/plugin install code-simplifier@claude-plugin-directory
/plugin install feature-dev@claude-plugin-directory
/plugin install pr-review-toolkit@claude-plugin-directory
```

| Plugin | Açıklama |
|--------|----------|
| **code-review** | 5 agent ile paralel PR review |
| **code-simplifier** | Kod sadeleştirme |
| **feature-dev** | 7-aşamalı feature geliştirme |
| **pr-review-toolkit** | PR analiz araçları |
| **commit-commands** | Git workflow otomasyonu |
| **security-guidance** | Güvenlik kontrolleri |

### LSP Plugins (Language Server Protocol)
```bash
/plugin install typescript-lsp@claude-plugin-directory
/plugin install pyright-lsp@claude-plugin-directory
```

| Plugin | Dil |
|--------|-----|
| **typescript-lsp** | TypeScript/JavaScript |
| **pyright-lsp** | Python |
| **gopls-lsp** | Go |
| **rust-analyzer-lsp** | Rust |
| **clangd-lsp** | C/C++ |
| **jdtls-lsp** | Java |
| **kotlin-lsp** | Kotlin |
| **swift-lsp** | Swift |
| **csharp-lsp** | C# |
| **php-lsp** | PHP |
| **lua-lsp** | Lua |

### Output Style Plugins
```bash
/plugin install explanatory-output-style@claude-plugin-directory
/plugin install learning-output-style@claude-plugin-directory
```

| Plugin | Açıklama |
|--------|----------|
| **explanatory-output-style** | Açıklamalı çıktı |
| **learning-output-style** | Öğretici mod |

### Utility Plugins
| Plugin | Açıklama |
|--------|----------|
| **hookify** | Custom hook oluşturma |
| **plugin-dev** | Plugin geliştirme toolkit |
| **agent-sdk-dev** | Agent SDK geliştirme |
| **ralph-loop** | İteratif geliştirme döngüsü |
| **frontend-design** | Production UI tasarımı |
| **example-plugin** | Plugin örneği/template |

## Grain SaaS için Önerilen Kurulum

### Temel Plugin'ler
```bash
# Development
/plugin install code-review@claude-plugin-directory
/plugin install code-simplifier@claude-plugin-directory
/plugin install commit-commands@claude-plugin-directory
/plugin install security-guidance@claude-plugin-directory

# Output
/plugin install explanatory-output-style@claude-plugin-directory

# Design
/plugin install frontend-design@claude-plugin-directory
```

### Document Skills (Raporlama için)
```bash
/plugin install document-skills@anthropic-agent-skills

# Kullanım:
# "Generate a PDF report for this workflow"
# "Create an Excel export of analytics data"
# "Build a PowerPoint presentation for the client"
```

### MCP Builder (Özel MCP server'lar için)
```bash
# mcp-builder skill'ini kullan
# "Build an MCP server for our custom API"
```

## SDK'lar

### Python SDK
```bash
pip install anthropic
```

```python
from anthropic import Anthropic

client = Anthropic()
message = client.messages.create(
    model="claude-opus-4-5-20251101",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}]
)
```

### TypeScript SDK
```bash
npm install @anthropic-ai/sdk
```

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();
const message = await client.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello" }]
});
```

## Kaynaklar

- [anthropics/skills](https://github.com/anthropics/skills)
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)
- [anthropics/claude-code](https://github.com/anthropics/claude-code)
- [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks)
- [Anthropic API Docs](https://docs.anthropic.com)
