#!/usr/bin/env node

/**
 * Grain SaaS - Workflow Validator
 * Validates all workflow JSON files for required fields and best practices
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const REQUIRED_FIELDS = ['name', 'nodes', 'connections'];
const REQUIRED_META = ['grain_module', 'grain_tier'];

let errors = 0;
let warnings = 0;
let validated = 0;

function log(type, file, message) {
  const icons = { error: '❌', warning: '⚠️', success: '✅', info: 'ℹ️' };
  console.log(`${icons[type]} [${path.basename(file)}] ${message}`);
}

function validateWorkflow(filePath) {
  const fileName = path.basename(filePath);

  // Skip index.json
  if (fileName === 'index.json') return;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const workflow = JSON.parse(content);

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!workflow[field]) {
        log('error', filePath, `Missing required field: ${field}`);
        errors++;
        return;
      }
    }

    // Check nodes array
    if (!Array.isArray(workflow.nodes) || workflow.nodes.length === 0) {
      log('error', filePath, 'Nodes array is empty or invalid');
      errors++;
      return;
    }

    // Check for error handler (warning only)
    const hasErrorHandler = workflow.nodes.some(
      node => node.type === 'n8n-nodes-base.errorTrigger'
    );
    if (!hasErrorHandler) {
      log('warning', filePath, 'No error handler node found');
      warnings++;
    }

    // Check meta fields (warning only for now)
    if (workflow.meta) {
      for (const field of REQUIRED_META) {
        if (!workflow.meta[field]) {
          log('warning', filePath, `Missing meta field: ${field}`);
          warnings++;
        }
      }
    }

    // Check naming convention
    if (!fileName.startsWith('Grain_')) {
      log('warning', filePath, 'File name should start with "Grain_"');
      warnings++;
    }

    validated++;
    log('success', filePath, 'Valid');

  } catch (e) {
    if (e instanceof SyntaxError) {
      log('error', filePath, `Invalid JSON: ${e.message}`);
    } else {
      log('error', filePath, `Error: ${e.message}`);
    }
    errors++;
  }
}

function main() {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║           Grain SaaS - Workflow Validator                     ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Get all JSON files
  const files = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .map(f => path.join(TEMPLATES_DIR, f));

  console.log(`Found ${files.length} workflow files\n`);

  for (const file of files) {
    validateWorkflow(file);
  }

  // Summary
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    Validation Summary                         ║');
  console.log('╠═══════════════════════════════════════════════════════════════╣');
  console.log(`║  Validated: ${validated.toString().padEnd(48)}║`);
  console.log(`║  Warnings:  ${warnings.toString().padEnd(48)}║`);
  console.log(`║  Errors:    ${errors.toString().padEnd(48)}║`);
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Exit with error code if errors found
  if (errors > 0) {
    console.log('❌ Validation failed with errors\n');
    process.exit(1);
  }

  console.log('✅ All workflows validated successfully\n');
  process.exit(0);
}

main();
