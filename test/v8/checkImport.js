import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getAllImports,
    getImportCount,
    isImportPresent,
    getImportStartLine,
    getImportEndLine
} from './checkImport/check/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');

    console.log("=== 1. How many imports are there? ===");
    console.log(`Total imports: ${getImportCount(fileContent)}`);
    console.log();

    console.log("=== 2. Show all imports ===");
    const allImports = getAllImports(fileContent);
    allImports.forEach((imp, index) => {
        console.log(`  [${index + 1}] ${imp.trim().replace(/\n/g, ' ')}`);
    });
    console.log();

    console.log("=== 3. Is import present or not? ===");
    console.log(`  Is 'dotenv' present?                 ${isImportPresent(fileContent, 'dotenv')}`);
    console.log(`  Is 'express' present?                ${isImportPresent(fileContent, 'express')}`);
    console.log(`  Is './api/routes.js' present?        ${isImportPresent(fileContent, './api/routes.js')}`);
    console.log(`  Is 'non-existent-module' present?    ${isImportPresent(fileContent, 'non-existent-module')}`);
    console.log();

    console.log("=== 4. What is the import start line? ===");
    console.log(`  Start line of 'dotenv':              ${getImportStartLine(fileContent, 'dotenv')}`);
    console.log(`  Start line of 'express':             ${getImportStartLine(fileContent, 'express')}`);
    console.log(`  Start line of './api/routes.js':     ${getImportStartLine(fileContent, './api/routes.js')}`);
    console.log();

    console.log("=== 5. What is the import end line? ===");
    console.log(`  End line of 'dotenv':                ${getImportEndLine(fileContent, 'dotenv')}`);
    console.log(`  End line of 'express':               ${getImportEndLine(fileContent, 'express')}`);
    console.log(`  End line of './api/routes.js':       ${getImportEndLine(fileContent, './api/routes.js')}`);
    console.log();

} catch (error) {
    console.error("Error reading file:", error.message);
}
