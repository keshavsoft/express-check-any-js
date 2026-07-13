import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');

    // Check for mounting point
    const isMountPresent = fileContent.includes("app.use('/api'");

    console.log(JSON.stringify({
        hasApiMount: isMountPresent
    }, null, 2));
} catch (error) {
    console.error("Error reading file:", error.message);
}
