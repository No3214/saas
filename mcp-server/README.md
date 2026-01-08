# Grain n8n Templates MCP Server

MCP (Model Context Protocol) server that provides access to 80+ AI-powered n8n workflow templates.

## Features

- **list_templates** - List all templates, optionally filter by category
- **get_template** - Get full workflow JSON by filename
- **search_templates** - Search by keyword
- **get_categories** - View all categories with counts
- **deploy_template** - Deploy directly to n8n instance via API

## Quick Setup

### For Claude Desktop

Add to `~/.config/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "grain-n8n-templates": {
      "command": "node",
      "args": ["/path/to/saas/mcp-server/index.js"],
      "env": {
        "MCP_MODE": "stdio"
      }
    }
  }
}
```

### For Claude Code CLI

```bash
claude mcp add grain-n8n-templates node /path/to/saas/mcp-server/index.js
```

## Available Categories

| Category | Templates | Description |
|----------|-----------|-------------|
| hospitality | 5 | Hotel/property management |
| agency | 3 | Digital agency workflows |
| marketing | 6 | Marketing automation |
| ai_content | 5 | AI content generation |
| analytics | 4 | Data & analytics |
| customer_success | 3 | Customer retention |
| growth | 4 | Growth & conversion |
| operations | 3 | Business operations |
| intelligence | 2 | Competitive intel |
| seo | 5 | SEO automation |
| local_seo | 2 | Local SEO |
| restaurant | 3 | Restaurant marketing |
| ai_productivity | 3 | AI productivity tools |
| document_processing | 2 | OCR & translation |
| finance | 2 | Financial automation |
| media | 1 | Podcast production |

## Example Usage

```
User: List all AI productivity templates
Claude: [Uses list_templates with category="ai_productivity"]

User: Deploy the chatbot template to my n8n
Claude: [Uses deploy_template with your n8n URL and API key]
```

## License

MIT
