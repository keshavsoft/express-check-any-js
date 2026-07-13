// Core check function
export function checkApiImport(fileContent) {
    // Regex matches:
    // - import './api/...'
    // - import x from './api/...'
    // - import { x } from './api/...'
    // - import * as x from './api/...'
    // Handles single/double quotes, multiple lines, and optional file extensions or deep routes
    const importRegex = /import\s+(?:[\s\S]*?\s+from\s+)?['"](?:\.\/|\.\.\/)*api\/[^'"]+['"]/g;
    return importRegex.test(fileContent);
}
