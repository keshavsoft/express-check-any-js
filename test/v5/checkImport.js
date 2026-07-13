import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkApiImport } from './checkImport/check.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');
    console.log(JSON.stringify({
        hasApiImport: checkApiImport(fileContent)
    }, null, 2));
} catch (error) {
    console.error("Error reading file:", error.message);
}
