const fs = require('fs');
const path = require('path');

const directoryPath = '.';
const outputFile = 'Grain_FULL_SUITE_BUNDLE.json';

try {
    const files = fs.readdirSync(directoryPath).filter(file => file.startsWith('Grain_') && file.endsWith('.json') && file !== outputFile);
    const allWorkflows = [];

    console.log(`Found ${files.length} workflow files.`);

    files.forEach(file => {
        const content = fs.readFileSync(path.join(directoryPath, file), 'utf8');
        try {
            const json = JSON.parse(content);
            allWorkflows.push(json);
        } catch (e) {
            console.error(`Error parsing ${file}: ${e.message}`);
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(allWorkflows, null, 2));
    console.log(`Successfully created bundle: ${outputFile} with ${allWorkflows.length} workflows.`);
} catch (err) {
    console.error('Unable to scan directory: ' + err);
}
