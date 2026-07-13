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

    // Also check for mounting point
    const isMountPresent = fileContent.includes("app.use('/api'");

    console.log(JSON.stringify({
        hasApiImport: isImportPresent,
        hasApiMount: isMountPresent,
        success: isImportPresent && isMountPresent
    }, null, 2));
} catch (error) {
    console.error("Error reading file:", error.message);
}
