---
name: MCP Integration
description: Model Context Protocol entegrasyonu - n8n, PostgreSQL, GitHub, Slack, Playwright MCP server yapılandırması ve kullanımı.
triggers:
  - "mcp server"
  - "mcp bağlantı"
  - "mcp integration"
  - "model context protocol"
---

# MCP Integration Skill

Model Context Protocol (MCP) entegrasyon rehberi.

## MCP Nedir?

MCP (Model Context Protocol), AI asistanlarının harici sistemlerle iletişim kurmasını sağlayan bir protokoldür. Claude Code, MCP server'lara bağlanarak:

- Veritabanlarına erişim
- API çağrıları
- Dosya sistemleri
- Özel araçlar

gibi kaynaklara erişebilir.

## Yapılandırılmış MCP Server'lar

### 1. n8n MCP Server (JWT Auth)

```json
{
  "n8n-mcp": {
    "command": "npx",
    "args": [
      "-y",
      "supergateway",
      "--streamableHttp",
      "http://localhost:5678/mcp-server/http",
      "--header",
      "authorization:Bearer YOUR_JWT_TOKEN"
    ]
  }
}
```

**n8n'den Token Alma:**
```
n8n Settings → MCP Server → Enable → Copy Access Token
```

**Supergateway Nedir?**
- HTTP MCP endpoint'lerini stdio'ya çevirir
- JWT authentication destekler
- Claude Code ile n8n arasında köprü görevi görür

**Kurulum:**
```bash
# Supergateway otomatik indirilir (npx -y ile)
# Token'ı .claude/settings.json'a ekle
```

**Kullanım:**
```
"List all workflows in n8n"
"Execute the Customer Onboarding workflow"
"Get node information for HTTP Request"
```

### 2. VibeShip Spawner Skills MCP

```json
{
  "spawner-skills": {
    "command": "npx github:vibeforge1111/vibeship-spawner-skills serve"
  }
}
```

**Kurulum:**
```bash
# Tüm skill'leri kur + MCP server başlat
npx github:vibeforge1111/vibeship-spawner-skills install --mcp

# Sadece belirli paketler
npx github:vibeforge1111/vibeship-spawner-skills install --pack agents --mcp
```

**Kullanım:**
```
"Use the backend skill for API design"
"Apply security skill validations"
"Get marketing skill patterns"
```

## MCP Server Ekleme

### CLI ile
```bash
# HTTP endpoint
claude mcp add [name] [url]

# Stdio command
claude mcp add [name] --command "[command]"

# Listele
claude mcp list

# Kaldır
claude mcp remove [name]
```

### Settings ile
```json
{
  "mcp_servers": {
    "server-name": {
      "url": "http://...",
      "description": "...",
      "capabilities": [...]
    },
    "command-server": {
      "command": "npx some-package serve",
      "args": ["--flag"],
      "env": {
        "API_KEY": "..."
      }
    }
  }
}
```

## n8n MCP Capabilities

### workflow_list
```
Tüm workflow'ları listele
```

### workflow_execute
```
Belirli bir workflow'u çalıştır
Input: workflow_id, input_data
Output: execution_result
```

### workflow_get
```
Workflow detaylarını getir
Input: workflow_id
Output: workflow_json
```

### node_info
```
Node bilgilerini getir
Input: node_type
Output: parameters, credentials, documentation
```

### credentials_list
```
Mevcut credential'ları listele (hassas bilgiler hariç)
```

## Örnek Kullanımlar

### n8n Workflow Çalıştırma
```
User: "Run the customer onboarding workflow for test@example.com"

Claude: [MCP call to n8n-local]
→ workflow_execute("Grain_Customer_Onboarding_v1", {"email": "test@example.com"})
→ Returns execution result
```

### Spawner Skill Kullanma
```
User: "Apply backend skill best practices to this API"

Claude: [MCP call to spawner-skills]
→ get_skill("backend")
→ Returns patterns, anti-patterns, validations
→ Applies to code
```

## Güvenlik

### İzin Verilen İşlemler
- workflow_list (read-only)
- workflow_get (read-only)
- node_info (read-only)

### Onay Gerektiren İşlemler
- workflow_execute (side effects)
- workflow_create
- workflow_update
- workflow_delete

### Yasaklı İşlemler
- credentials_get (secret values)
- direct database access
- file system modification

## Troubleshooting

### n8n MCP Bağlanamıyor
```bash
# n8n çalışıyor mu?
curl http://localhost:5678/healthz

# MCP endpoint aktif mi?
curl http://localhost:5678/mcp-server/http

# n8n'i MCP ile başlat
N8N_MCP_SERVER_ENABLED=true n8n start
```

### Spawner MCP Bağlanamıyor
```bash
# Node.js version kontrolü (>=16 gerekli)
node --version

# Yeniden kur
npx github:vibeforge1111/vibeship-spawner-skills install --mcp --force

# Log'ları kontrol et
npx github:vibeforge1111/vibeship-spawner-skills serve --verbose
```

## Kaynaklar

- [MCP Specification](https://modelcontextprotocol.io/)
- [n8n MCP Documentation](https://docs.n8n.io/mcp/)
- [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)
