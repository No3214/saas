#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load templates index
const TEMPLATES_DIR = join(__dirname, "..", "n8n-templates");
let templatesIndex;

try {
  templatesIndex = JSON.parse(
    readFileSync(join(TEMPLATES_DIR, "index.json"), "utf-8")
  );
} catch (error) {
  console.error("Failed to load templates index:", error);
  templatesIndex = { count: 0, categories: {}, files: [] };
}

// Create MCP Server
const server = new Server(
  {
    name: "grain-n8n-templates",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_templates",
        description: "List all available n8n workflow templates with their categories and descriptions",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Filter by category (optional). Available: hospitality, agency, marketing, ai_content, analytics, customer_success, growth, operations, intelligence, seo, local_seo, restaurant, ai_productivity, document_processing, finance, media",
            },
          },
        },
      },
      {
        name: "get_template",
        description: "Get a specific n8n workflow template by filename",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "The template filename (e.g., 'Grain_AI_Chatbot_Builder_v1.json')",
            },
          },
          required: ["filename"],
        },
      },
      {
        name: "search_templates",
        description: "Search templates by keyword in name or description",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query (e.g., 'chatbot', 'SEO', 'email')",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_categories",
        description: "Get all available template categories with template counts",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "deploy_template",
        description: "Deploy a template to an n8n instance via API",
        inputSchema: {
          type: "object",
          properties: {
            filename: {
              type: "string",
              description: "Template filename to deploy",
            },
            n8n_url: {
              type: "string",
              description: "n8n instance URL (e.g., 'https://your-n8n.com')",
            },
            api_key: {
              type: "string",
              description: "n8n API key for authentication",
            },
          },
          required: ["filename", "n8n_url", "api_key"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "list_templates": {
      const category = args?.category;
      let templates = templatesIndex.files.filter(f => f.filename.startsWith("Grain_"));

      if (category) {
        templates = templates.filter(t => t.category === category);
      }

      const result = templates.map(t => ({
        filename: t.filename,
        category: t.category,
        description: t.description,
        roi: t.roi || "N/A",
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              total: result.length,
              templates: result,
            }, null, 2),
          },
        ],
      };
    }

    case "get_template": {
      const { filename } = args;
      try {
        const templatePath = join(TEMPLATES_DIR, filename);
        const template = JSON.parse(readFileSync(templatePath, "utf-8"));

        // Get metadata from index
        const meta = templatesIndex.files.find(f => f.filename === filename);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                metadata: meta || {},
                workflow: template,
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Template '${filename}' not found. Use list_templates to see available templates.`,
            },
          ],
          isError: true,
        };
      }
    }

    case "search_templates": {
      const { query } = args;
      const queryLower = query.toLowerCase();

      const results = templatesIndex.files
        .filter(t =>
          t.filename.toLowerCase().includes(queryLower) ||
          (t.description && t.description.toLowerCase().includes(queryLower))
        )
        .map(t => ({
          filename: t.filename,
          category: t.category,
          description: t.description,
          roi: t.roi || "N/A",
        }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              query,
              total: results.length,
              results,
            }, null, 2),
          },
        ],
      };
    }

    case "get_categories": {
      const categories = Object.entries(templatesIndex.categories).map(([name, templates]) => ({
        name,
        count: templates.length,
        templates: templates,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              total_categories: categories.length,
              total_templates: templatesIndex.count,
              categories,
            }, null, 2),
          },
        ],
      };
    }

    case "deploy_template": {
      const { filename, n8n_url, api_key } = args;

      try {
        // Load template
        const templatePath = join(TEMPLATES_DIR, filename);
        const template = JSON.parse(readFileSync(templatePath, "utf-8"));

        // Deploy to n8n
        const response = await fetch(`${n8n_url}/api/v1/workflows`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-N8N-API-KEY": api_key,
          },
          body: JSON.stringify(template),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`n8n API error: ${response.status} - ${error}`);
        }

        const result = await response.json();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: `Template '${filename}' deployed successfully!`,
                workflow_id: result.id,
                workflow_name: result.name,
                n8n_url: `${n8n_url}/workflow/${result.id}`,
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Deployment failed: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }

    default:
      return {
        content: [
          {
            type: "text",
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// List resources (templates as resources)
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const resources = templatesIndex.files
    .filter(f => f.filename.startsWith("Grain_"))
    .map(t => ({
      uri: `template://${t.filename}`,
      name: t.filename.replace("Grain_", "").replace("_v1.json", "").replace(/_/g, " "),
      description: t.description,
      mimeType: "application/json",
    }));

  return { resources };
});

// Read resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  const filename = uri.replace("template://", "");

  try {
    const templatePath = join(TEMPLATES_DIR, filename);
    const template = readFileSync(templatePath, "utf-8");

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: template,
        },
      ],
    };
  } catch (error) {
    throw new Error(`Template not found: ${filename}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Grain n8n Templates MCP Server running...");
  console.error(`Loaded ${templatesIndex.count} templates in ${Object.keys(templatesIndex.categories).length} categories`);
}

main().catch(console.error);
