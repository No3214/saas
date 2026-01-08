const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'templates');
const outputFile = path.join(__dirname, '..', 'Grain_FULL_SUITE_BUNDLE.json');

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

try {
    const files = getAllFiles(templatesDir);
    const allWorkflows = [];

    console.log(`Scanning ${templatesDir}...`);
    console.log(`Found ${files.length} workflow files.`);

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        try {
            const json = JSON.parse(content);
            allWorkflows.push(json);
        } catch (e) {
            console.error(`Error parsing ${path.basename(file)}: ${e.message}`);
        }
    });

    // Also include subflows
    const subflowsDir = path.join(__dirname, '..', 'subflows');
    if (fs.existsSync(subflowsDir)) {
        const subFiles = getAllFiles(subflowsDir);
        subFiles.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            try {
                const json = JSON.parse(content);
                allWorkflows.push(json);
            } catch (e) {
                console.error(`Error parsing subflow ${path.basename(file)}: ${e.message}`);
            }
        });
        console.log(`Added ${subFiles.length} subflows.`);
    }

    fs.writeFileSync(outputFile, JSON.stringify(allWorkflows, null, 2));
    console.log(`Successfully created bundle: ${outputFile} with ${allWorkflows.length} workflows.`);
} catch (err) {
    console.error('Unable to scan directory: ' + err);
}
