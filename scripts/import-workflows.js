#!/usr/bin/env node

/**
 * Grain SaaS - Workflow Import Script
 * Imports all workflow templates to n8n via API
 *
 * Usage: node scripts/import-workflows.js [--url http://localhost:5678] [--api-key YOUR_API_KEY]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const config = {
  n8nUrl: process.env.N8N_URL || 'http://localhost:5678',
  apiKey: process.env.N8N_API_KEY || '',
  templatesDir: path.join(__dirname, '..', 'templates'),
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose')
};

// Parse command line arguments
process.argv.forEach((arg, i) => {
  if (arg === '--url' && process.argv[i + 1]) {
    config.n8nUrl = process.argv[i + 1];
  }
  if (arg === '--api-key' && process.argv[i + 1]) {
    config.apiKey = process.argv[i + 1];
  }
});

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function logSuccess(msg) { log(`✓ ${msg}`, 'green'); }
function logError(msg) { log(`✗ ${msg}`, 'red'); }
function logWarning(msg) { log(`⚠ ${msg}`, 'yellow'); }
function logInfo(msg) { log(`ℹ ${msg}`, 'cyan'); }

// Make HTTP request
function makeRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, config.n8nUrl);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (config.apiKey) {
      options.headers['X-N8N-API-KEY'] = config.apiKey;
    }

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(json);
          } else {
            reject({ statusCode: res.statusCode, body: json });
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body);
          } else {
            reject({ statusCode: res.statusCode, body: body });
          }
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Check n8n connection
async function checkConnection() {
  try {
    await makeRequest('/healthz');
    return true;
  } catch (e) {
    return false;
  }
}

// Get existing workflows
async function getExistingWorkflows() {
  try {
    const response = await makeRequest('/api/v1/workflows');
    return response.data || [];
  } catch (e) {
    if (e.statusCode === 401) {
      throw new Error('API authentication required. Please provide --api-key');
    }
    return [];
  }
}

// Import a workflow
async function importWorkflow(workflow) {
  try {
    // Clean workflow for n8n API - remove custom meta fields
    const cleanWorkflow = {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings: workflow.settings || {}
    };

    const response = await makeRequest('/api/v1/workflows', 'POST', cleanWorkflow);
    return { success: true, id: response.id, name: response.name };
  } catch (e) {
    const errorMsg = e.body?.message || e.body?.error || JSON.stringify(e.body) || e.message || 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

// Main function
async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║        Grain SaaS - Workflow Import Script                    ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Check connection
  logInfo(`Checking connection to ${config.n8nUrl}...`);
  const connected = await checkConnection();

  if (!connected) {
    logError(`Cannot connect to n8n at ${config.n8nUrl}`);
    logInfo('Make sure n8n is running and accessible');
    logInfo('You can start n8n with: npx n8n');
    process.exit(1);
  }
  logSuccess('Connected to n8n');

  // Get workflow files
  const files = fs.readdirSync(config.templatesDir)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .filter(f => f.startsWith('Grain_'));

  logInfo(`Found ${files.length} workflow templates\n`);

  if (config.dryRun) {
    logWarning('DRY RUN - No workflows will be imported\n');
  }

  // Get existing workflows
  let existingNames = [];
  try {
    const existing = await getExistingWorkflows();
    existingNames = existing.map(w => w.name);
    logInfo(`Found ${existing.length} existing workflows in n8n`);
  } catch (e) {
    logWarning(e.message);
  }

  // Import workflows
  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(config.templatesDir, file);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const workflow = JSON.parse(content);

      // Check if already exists
      if (existingNames.includes(workflow.name)) {
        if (config.verbose) {
          logWarning(`Skipping ${workflow.name} (already exists)`);
        }
        skipped++;
        continue;
      }

      if (config.dryRun) {
        logInfo(`Would import: ${workflow.name}`);
        imported++;
        continue;
      }

      // Import
      const result = await importWorkflow(workflow);

      if (result.success) {
        logSuccess(`Imported: ${result.name}`);
        imported++;
      } else {
        logError(`Failed: ${workflow.name} - ${result.error}`);
        failed++;
      }
    } catch (e) {
      logError(`Error reading ${file}: ${e.message}`);
      failed++;
    }
  }

  // Summary
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                      Import Summary                           ║');
  console.log('╠═══════════════════════════════════════════════════════════════╣');
  console.log(`║  Imported: ${imported.toString().padEnd(49)}║`);
  console.log(`║  Skipped:  ${skipped.toString().padEnd(49)}║`);
  console.log(`║  Failed:   ${failed.toString().padEnd(49)}║`);
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  if (imported > 0 && !config.dryRun) {
    logSuccess(`Open ${config.n8nUrl} to see your workflows!`);
  }
}

main().catch(e => {
  logError(e.message);
  process.exit(1);
});
