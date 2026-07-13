import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getAllImports
} from '../check/getAllImports.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, '../../app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');
    const matches = getAllImports(fileContent);
    console.log(matches);
} catch (error) {
    console.error("Error reading file:", error.message);
}
