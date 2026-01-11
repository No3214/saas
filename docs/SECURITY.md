# 🛡️ Security & Configuration Guide

## 🔐 Secret Management

Grain SaaS Suite follows the "Zero Trust" and "12-Factor App" methodologies.

### 🚫 Anti-Patterns (NEVER DO THIS)
- ❌ Hardcoding API keys in nodes
- ❌ Committing `.env` files to Git
- ❌ Sharing webhook URLs publicly
- ❌ Running workflows as root in Docker

### ✅ Best Practices
- Use **n8n Variables** for all credentials
- Use **Role-Based Access Control (RBAC)** if available (Enterprise n8n)
- Rotate API keys every 90 days
- Use `GRAIN_CONFIG` node for standard settings

---

## 🌍 Environment Variables

Configure these in your `docker/.env` file or n8n cloud dashboard.

### Core System
| Variable | Description | Default |
|----------|-------------|---------|
| `GRAIN_TENANT_ID` | Identifier for multi-tenant setups | `default` |
| `GRAIN_DRY_RUN` | If true, workflows skip write actions | `false` |
| `GRAIN_WEBHOOK_PREFIX` | Base path for webhooks | `/grain` |
| `N8N_ENCRYPTION_KEY` | Key to encrypt credentials DB | **REQUIRED** |

### AI Providers
| Variable | Required By | Description |
|----------|-------------|-------------|
| `OPENAI_API_KEY` | AI Agents, Content Gen | GPT-4o access key |
| `ANTHROPIC_API_KEY` | AI Agents | Claude 3.5 Sonnet key |
| `SERPER_API_KEY` | SEO Engine | Google Search API |

### Integrations
| Variable | Service |
|----------|---------|
| `SLACK_BOT_TOKEN` | Slack Notifications |
| `SLACK_ALERTS_CHANNEL`| Error Logging Channel |
| `GSC_SITE_URL` | Google Search Console |
| `STRIPE_API_KEY` | RevOps & Payments |

---

## 🛡️ Input Validation

All critical workflows include input validation nodes.
- **Webhook Security:** Verify `X-Grain-Signature` header if possible.
- **Data Sanitization:** All user inputs are sanitized before being passed to SQL/Shell nodes.

## 🚨 Incident Response

If a key is compromised:
1. **Rotate the key** immediately at the provider (e.g., OpenAI Dashboard).
2. **Update the variable** in n8n (`Settings > Variables`).
3. **Restart n8n** container to flush caches.
4. **Check logs** for unauthorized usage.
