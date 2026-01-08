#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'n8n-templates');
const indexPath = path.join(templatesDir, 'index.json');

program
    .name('grain')
    .description('Grain n8n Workflow Suite CLI - 95+ automation templates')
    .version('2.1.0');

program
    .command('list')
    .description('List all workflows by category')
    .option('-c, --category <category>', 'Filter by category')
    .action((options) => {
        console.log(chalk.bold.yellow('\n Grain Workflow Suite\n'));
        console.log(chalk.gray('='.repeat(50)));

        try {
            const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

            if (options.category) {
                const cat = options.category;
                if (index.categories[cat]) {
                    console.log(chalk.cyan(`\n ${cat.toUpperCase()}`));
                    index.categories[cat].forEach(f => {
                        console.log(`   - ${f}`);
                    });
                } else {
                    console.log(chalk.red(`Category not found: ${cat}`));
                    console.log(chalk.gray('Available: ' + Object.keys(index.categories).join(', ')));
                }
            } else {
                Object.keys(index.categories).forEach(cat => {
                    const files = index.categories[cat];
                    console.log(chalk.cyan(`\n ${cat.toUpperCase()} (${files.length})`));
                    files.slice(0, 5).forEach(f => {
                        console.log(`   - ${f}`);
                    });
                    if (files.length > 5) {
                        console.log(chalk.gray(`   ... and ${files.length - 5} more`));
                    }
                });
            }

            console.log(chalk.gray(`\n Total: ${index.count} templates in ${Object.keys(index.categories).length} categories\n`));
        } catch (e) {
            console.log(chalk.red('Error reading index.json:', e.message));
        }
    });

program
    .command('categories')
    .description('List all available categories')
    .action(() => {
        try {
            const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
            console.log(chalk.bold.yellow('\n Categories\n'));
            Object.keys(index.categories).forEach(cat => {
                const count = index.categories[cat].length;
                console.log(`  ${chalk.cyan(cat.padEnd(25))} ${count} templates`);
            });
            console.log('');
        } catch (e) {
            console.log(chalk.red('Error:', e.message));
        }
    });

program
    .command('search <keyword>')
    .description('Search for workflows by name')
    .action((keyword) => {
        console.log(chalk.yellow(`\n Searching for "${keyword}"...\n`));

        const files = fs.readdirSync(templatesDir).filter(f =>
            f.endsWith('.json') && f.toLowerCase().includes(keyword.toLowerCase())
        );

        if (files.length === 0) {
            console.log(chalk.red('No workflows found.'));
        } else {
            files.forEach(f => console.log(`  - ${f}`));
            console.log(chalk.gray(`\n Found ${files.length} workflow(s)\n`));
        }
    });

program
    .command('info <workflow>')
    .description('Show details about a specific workflow')
    .action((workflow) => {
        try {
            const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
            const fileInfo = index.files.find(f =>
                f.filename.toLowerCase().includes(workflow.toLowerCase())
            );

            if (fileInfo) {
                console.log(chalk.bold.yellow(`\n ${fileInfo.filename}\n`));
                console.log(`  ${chalk.cyan('Category:')} ${fileInfo.category}`);
                if (fileInfo.description) {
                    console.log(`  ${chalk.cyan('Description:')} ${fileInfo.description}`);
                }
                if (fileInfo.roi) {
                    console.log(`  ${chalk.cyan('ROI:')} ${fileInfo.roi}`);
                }
                if (fileInfo.features) {
                    console.log(`  ${chalk.cyan('Features:')} ${fileInfo.features.join(', ')}`);
                }
                console.log(`  ${chalk.cyan('URL:')} ${fileInfo.raw_url}`);
                console.log('');
            } else {
                console.log(chalk.red(`Workflow not found: ${workflow}`));
            }
        } catch (e) {
            console.log(chalk.red('Error:', e.message));
        }
    });

program
    .command('install <workflow>')
    .description('Install a workflow to n8n instance')
    .option('-u, --url <url>', 'n8n URL', 'http://localhost:5678')
    .option('-k, --api-key <key>', 'n8n API Key')
    .action(async (workflow, options) => {
        const spinner = ora(`Searching for ${workflow}...`).start();

        // Find file
        let foundPath = null;
        const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));

        for (const file of files) {
            if (file.toLowerCase().includes(workflow.toLowerCase())) {
                foundPath = path.join(templatesDir, file);
                break;
            }
        }

        if (!foundPath) {
            spinner.fail(`Workflow not found: ${workflow}`);
            return;
        }

        spinner.text = `Installing ${path.basename(foundPath)} to n8n...`;

        if (!options.apiKey) {
            spinner.warn('No API key provided. Use --api-key <key>');
            console.log(chalk.gray(`\n  Manual install: Copy the workflow from:\n  ${foundPath}\n`));
            return;
        }

        try {
            const workflowData = JSON.parse(fs.readFileSync(foundPath, 'utf8'));
            const fetch = require('node-fetch');

            const response = await fetch(`${options.url}/api/v1/workflows`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-N8N-API-KEY': options.apiKey
                },
                body: JSON.stringify(workflowData)
            });

            if (response.ok) {
                const result = await response.json();
                spinner.succeed(`Installed: ${result.name} (ID: ${result.id})`);
            } else {
                const error = await response.text();
                spinner.fail(`Installation failed: ${error}`);
            }
        } catch (e) {
            spinner.fail(`Installation failed: ${e.message}`);
        }
    });

program.parse(process.argv);
