const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../temp_saas_compare/n8n-templates');
const destRootDir = path.resolve(__dirname, '../templates');
const newImportsDir = path.join(destRootDir, 'new_from_remote');

// Create new imports directory if it doesn't exist
if (!fs.existsSync(newImportsDir)) {
    fs.mkdirSync(newImportsDir, { recursive: true });
}

// Function to get all files recursively
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(file);
        }
    });

    return arrayOfFiles;
}

// Get flattened list of all filenames in destination (to check for existence)
const destFiles = getAllFiles(destRootDir);
const destFileNames = new Set(destFiles.map(f => path.basename(f)));

// Get source files (flat)
const sourceFiles = fs.readdirSync(sourceDir).filter(f => fs.statSync(path.join(sourceDir, f)).isFile());

let copiedCount = 0;

console.log('Starting synchronization...');
console.log(`Source: ${sourceDir}`);
console.log(`Destination Root: ${destRootDir}`);

sourceFiles.forEach(file => {
    if (!destFileNames.has(file)) {
        console.log(`New file found: ${file}`);
        fs.copyFileSync(path.join(sourceDir, file), path.join(newImportsDir, file));
        copiedCount++;
    }
});

console.log(`Sync complete. ${copiedCount} new files copied to ${newImportsDir}`);
