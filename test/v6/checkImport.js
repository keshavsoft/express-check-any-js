import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ImportParser } from './checkImport/parser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');
    const parser = new ImportParser(fileContent);

    console.log("=== FLAVOUR 1: Show all imports ===");
    const allImports = parser.getAllImports();
    allImports.forEach((imp, index) => {
        console.log(`[Import ${index + 1}]`);
        console.log(`  Source:    ${imp.source}`);
        console.log(`  Lines:     ${imp.startLine} to ${imp.endLine}`);
        console.log(`  Metadata:  isDefault=${imp.isDefault}, isNamed=${imp.isNamed}, isNamespace=${imp.isNamespace}, isSideEffect=${imp.isSideEffect}`);
        console.log(`  Raw:       ${imp.raw.trim().replace(/\n/g, ' ')}`);
        console.log();
    });

    console.log("=== FLAVOUR 2: Find in imports (query: 'api') ===");
    const apiImports = parser.findImports('api');
    if (apiImports.length > 0) {
        console.log(`Found ${apiImports.length} matching import(s):`);
        apiImports.forEach((imp, index) => {
            console.log(`  - Match ${index + 1}: ${imp.raw.trim()} (Lines ${imp.startLine}-${imp.endLine})`);
        });
    } else {
        console.log("No imports matching 'api' found.");
    }
    console.log();

    console.log("=== FLAVOUR 3: Overall imports start line and end line ===");
    const bounds = parser.getImportBlockBounds();
    console.log(`Overall import block starts at line ${bounds.startLine} and ends at line ${bounds.endLine}.`);
    console.log();

} catch (error) {
    console.error("Error reading file:", error.message);
}
