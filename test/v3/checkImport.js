import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');
    
    // Check for the import statement matching './api/...'
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"]\.\/api\/.*?['"]/g;
    const isImportPresent = importRegex.test(fileContent);

    console.log(JSON.stringify({
        hasApiImport: isImportPresent
    }, null, 2));
} catch (error) {
    console.error("Error reading file:", error.message);
}
