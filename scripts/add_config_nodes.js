const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'templates');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.json')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

const configNode = {
    "parameters": {
        "values": {
            "string": [
                {
                    "name": "tenant_id",
                    "value": "={{ $vars.GRAIN_TENANT_ID || 'default' }}"
                },
                {
                    "name": "dry_run",
                    "value": "={{ $vars.GRAIN_DRY_RUN || false }}"
                },
                {
                    "name": "webhook_prefix",
                    "value": "={{ $vars.GRAIN_WEBHOOK_PREFIX || '/webhook' }}/{{ $workflow.name.toLowerCase().replace(/[^a-z0-9]/g, '-') }}"
                }
            ]
        },
        "options": {}
    },
    "id": "grain-config",
    "name": "GRAIN_CONFIG",
    "type": "n8n-nodes-base.set",
    "typeVersion": 2,
    "position": [
        -200,
        -200
    ],
    "notesInFlow": true,
    "notes": "🔧 Central Config"
};

try {
    const files = getAllFiles(templatesDir);
    console.log(`Found ${files.length} workflow files.`);

    files.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const json = JSON.parse(content);

            // Check if GRAIN_CONFIG already exists
            const exists = json.nodes.some(n => n.name === 'GRAIN_CONFIG');
            if (exists) {
                console.log(`Skipping ${path.basename(filePath)} (Config exists)`);
                return;
            }

            // Ensure nodes array exists
            if (!json.nodes) json.nodes = [];

            // Add config node
            // Generate a unique ID if needed, but static ID is fine since names must be unique in flow
            // Actually, n8n IDs are usually UUIDs, but short strings work too.
            // Let's use a random ID to be safe
            const newConfigNode = JSON.parse(JSON.stringify(configNode));
            newConfigNode.id = 'grain-config-' + Math.random().toString(36).substr(2, 9);

            json.nodes.unshift(newConfigNode);

            fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
            console.log(`Updated ${path.basename(filePath)}`);

        } catch (err) {
            console.error(`Error processing ${path.basename(filePath)}: ${err.message}`);
        }
    });
    console.log('Finished updating workflows.');
} catch (err) {
    console.error('Error scanning directories:', err);
}
