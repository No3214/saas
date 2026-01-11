# Claude Agent SDK Integration Guide

> Grain SaaS workflow'larını Claude Agent SDK ile geliştirme rehberi

## Overview

Claude Agent SDK, Claude Code'un arkasındaki altyapıyı açık kaynak olarak sunar. Bu SDK ile:
- Otonom kod analizi
- Workflow validasyonu
- Akıllı hata tespiti
- Otomatik düzeltme önerileri

yapan agent'lar oluşturulabilir.

---

## Grain SaaS için Kullanım Alanları

### 1. Workflow Validator Agent

n8n workflow JSON'larını otomatik doğrulayan agent:

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

async function validateWorkflow(workflowPath: string) {
  for await (const message of query({
    prompt: `Validate the n8n workflow at ${workflowPath}:

    Check for:
    - Required fields (name, nodes, connections)
    - Grain meta fields (grain_module, grain_tier)
    - Error handler presence
    - Node naming conventions
    - Credential references`,
    options: {
      model: "sonnet",
      allowedTools: ["Read", "Glob"],
      permissionMode: "bypassPermissions",
      maxTurns: 50
    }
  })) {
    // Handle validation results
  }
}
```

### 2. Code Review Agent for Workflows

Workflow'lardaki JavaScript kodunu analiz eden agent:

```typescript
const reviewSchema = {
  type: "object",
  properties: {
    issues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          severity: { type: "string", enum: ["low", "medium", "high", "critical"] },
          node: { type: "string" },
          description: { type: "string" },
          suggestion: { type: "string" }
        }
      }
    },
    score: { type: "number" }
  }
};

async function reviewWorkflowCode(directory: string) {
  for await (const message of query({
    prompt: `Review all Code nodes in n8n workflows at ${directory}/templates/

    Check for:
    - Input validation
    - Error handling
    - Turkish character handling
    - Performance issues`,
    options: {
      model: "opus",
      allowedTools: ["Read", "Glob", "Grep"],
      outputFormat: { type: "json_schema", schema: reviewSchema }
    }
  })) {
    if (message.type === "result" && message.structured_output) {
      return message.structured_output;
    }
  }
}
```

### 3. API Integration Tester

API entegrasyonlarını test eden agent:

```typescript
async function testApiIntegration(apiName: string) {
  for await (const message of query({
    prompt: `Test the ${apiName} integration:

    1. Check credential configuration
    2. Verify API endpoint URLs
    3. Test authentication flow
    4. Validate response handling`,
    options: {
      model: "sonnet",
      allowedTools: ["Read", "Bash", "Grep"],
      permissionMode: "default"
    }
  })) {
    // Handle test results
  }
}
```

---

## Subagent Architecture

Karmaşık görevler için subagent'lar kullanılabilir:

```typescript
const agents = {
  "security-scanner": {
    description: "Workflow'lardaki güvenlik açıklarını tarar",
    prompt: `Sen bir güvenlik uzmanısın. Şunları kontrol et:
    - Hardcoded credentials
    - SQL injection riskleri
    - XSS açıkları
    - Sensitive data logging`,
    tools: ["Read", "Grep", "Glob"],
    model: "sonnet"
  },

  "performance-analyzer": {
    description: "Workflow performansını analiz eder",
    prompt: `Performans analizi yap:
    - Gereksiz API çağrıları
    - N+1 sorgu problemleri
    - Batch işlem fırsatları
    - Cache kullanımı`,
    tools: ["Read", "Grep"],
    model: "haiku"
  },

  "turkish-localizer": {
    description: "Türkçe içerik kalitesini kontrol eder",
    prompt: `Türkçe içeriği kontrol et:
    - Yazım hataları
    - Karakter encoding
    - Mesaj kalitesi
    - Emoji kullanımı`,
    tools: ["Read", "Grep"],
    model: "sonnet"
  }
};
```

---

## MCP Integration

Custom tool'lar için MCP server oluşturulabilir:

```typescript
import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const grainMcpServer = createSdkMcpServer({
  name: "grain-tools",
  version: "1.0.0",
  tools: [
    tool(
      "validate_workflow_json",
      "Validates a Grain workflow JSON file",
      {
        filePath: z.string().describe("Path to workflow JSON")
      },
      async (args) => {
        const fs = require('fs');
        const content = fs.readFileSync(args.filePath, 'utf8');
        const workflow = JSON.parse(content);

        const issues = [];

        // Check required fields
        if (!workflow.name) issues.push("Missing: name");
        if (!workflow.nodes) issues.push("Missing: nodes");
        if (!workflow.meta?.grain_module) issues.push("Missing: grain_module");
        if (!workflow.meta?.grain_tier) issues.push("Missing: grain_tier");

        // Check for error handler
        const hasErrorHandler = workflow.nodes.some(
          n => n.type === "n8n-nodes-base.errorTrigger"
        );
        if (!hasErrorHandler) issues.push("Missing: Error Trigger node");

        return {
          content: [{
            type: "text",
            text: issues.length === 0
              ? "✅ Workflow is valid"
              : `❌ Issues found:\n${issues.join('\n')}`
          }]
        };
      }
    ),

    tool(
      "count_workflows",
      "Counts workflows by tier",
      {},
      async () => {
        const fs = require('fs');
        const path = require('path');
        const dir = './templates';

        const stats = { Critical: 0, High: 0, Medium: 0 };
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

        for (const file of files) {
          if (file === 'index.json') continue;
          const content = JSON.parse(fs.readFileSync(path.join(dir, file)));
          const tier = content.meta?.grain_tier || 'Unknown';
          stats[tier] = (stats[tier] || 0) + 1;
        }

        return {
          content: [{
            type: "text",
            text: JSON.stringify(stats, null, 2)
          }]
        };
      }
    )
  ]
});
```

---

## Production Example: Full Workflow Review

```typescript
import { query, AgentDefinition } from "@anthropic-ai/claude-agent-sdk";

interface ReviewResult {
  workflowName: string;
  score: number;
  issues: Array<{
    severity: string;
    category: string;
    description: string;
    suggestion: string;
  }>;
  summary: string;
}

async function comprehensiveWorkflowReview(
  workflowPath: string
): Promise<ReviewResult | null> {

  console.log(`\n🔍 Reviewing: ${workflowPath}\n`);

  for await (const message of query({
    prompt: `Perform a comprehensive review of the n8n workflow at ${workflowPath}.

    Analyze:
    1. Structure and naming conventions
    2. Error handling completeness
    3. Security best practices
    4. Performance optimization opportunities
    5. Turkish localization quality

    Be specific with node names and suggestions.`,
    options: {
      model: "opus",
      allowedTools: ["Read", "Glob", "Grep", "Task"],
      permissionMode: "bypassPermissions",
      maxTurns: 100,
      outputFormat: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            workflowName: { type: "string" },
            score: { type: "number" },
            issues: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  severity: { type: "string" },
                  category: { type: "string" },
                  description: { type: "string" },
                  suggestion: { type: "string" }
                }
              }
            },
            summary: { type: "string" }
          }
        }
      },
      agents: {
        "security-scanner": {
          description: "Deep security analysis",
          prompt: "Scan for security vulnerabilities in workflow code",
          tools: ["Read", "Grep"],
          model: "sonnet"
        } as AgentDefinition
      }
    }
  })) {
    if (message.type === "result" && message.subtype === "success") {
      console.log(`✅ Review complete! Cost: $${message.total_cost_usd.toFixed(4)}`);
      return message.structured_output as ReviewResult;
    }
  }

  return null;
}

// Usage
const result = await comprehensiveWorkflowReview(
  "./templates/Grain_Trendyol_Order_Sync_v1.json"
);

if (result) {
  console.log(`Score: ${result.score}/100`);
  console.log(`Issues: ${result.issues.length}`);
}
```

---

## CI/CD Integration

GitHub Actions ile entegrasyon:

```yaml
# .github/workflows/workflow-review.yml
name: Workflow Review

on:
  pull_request:
    paths:
      - 'templates/*.json'

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install @anthropic-ai/claude-agent-sdk

      - name: Run workflow review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: npx tsx scripts/review-workflows.ts
```

---

## Cost Optimization

| Model | Kullanım | Maliyet |
|-------|----------|---------|
| Opus | Karmaşık analiz, final review | $15/1M input |
| Sonnet | Genel tarama, subagent'lar | $3/1M input |
| Haiku | Basit kontroller, hızlı işler | $0.25/1M input |

**Önerilen Strateji:**
1. İlk tarama: Haiku
2. Detaylı analiz: Sonnet subagent'lar
3. Final rapor: Opus

---

## Next Steps

1. [ ] Workflow validator agent oluştur
2. [ ] CI/CD pipeline'a entegre et
3. [ ] Custom MCP tools geliştir
4. [ ] Performance benchmarks

---

*Last Updated: 2026-01-10*
