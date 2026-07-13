import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getAllImports,
    getImportCount,
    isImportPresent,
    getImportStartLine,
    getImportEndLine,
    version
} from '../../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');

    console.log("=== Verification of v9 imports tests ===");
    console.log("Exposed Version:                      ", version);
    console.log("All imports:");
    console.log(getAllImports(fileContent));
    console.log();

    console.log("Import count:                         ", getImportCount(fileContent));
    console.log("Is 'express' present?                 ", isImportPresent(fileContent, 'express'));
    console.log("Is 'non-existent' present?            ", isImportPresent(fileContent, 'non-existent'));
    console.log("Start line of './api/routes.js':      ", getImportStartLine(fileContent, './api/routes.js'));
    console.log("End line of './api/routes.js':        ", getImportEndLine(fileContent, './api/routes.js'));

} catch (error) {
    console.error("Error running test:", error.message);
}
