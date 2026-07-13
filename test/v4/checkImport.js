import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

// Robust function to check if any import from the api folder exists in the given content
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

// Only execute the file check and self-tests if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    // 1. Check the actual app.js file
    try {
        const fileContent = fs.readFileSync(appPath, 'utf8');
        console.log("Checking app.js:");
        console.log(JSON.stringify({
            hasApiImport: checkApiImport(fileContent)
        }, null, 2));
    } catch (error) {
        console.error("Error reading file:", error.message);
    }

    // 2. Run self-tests on different import variations to verify robustness
    console.log("\nRunning robustness tests on various import scenarios:");
    
    const scenarios = [
        {
            name: "Default Import",
            content: "import routerFromapi from './api/routes.js';",
            expected: true
        },
        {
            name: "Named Import",
            content: "import { router } from './api/routes.js';",
            expected: true
        },
        {
            name: "Renamed Named Import",
            content: "import { router as routerFromapi } from './api/routes.js';",
            expected: true
        },
        {
            name: "Namespace/Star Import",
            content: "import * as apiRoutes from './api/routes.js';",
            expected: true
        },
        {
            name: "Direct/Empty Import",
            content: "import './api/routes.js';",
            expected: true
        },
        {
            name: "Mixed Default and Named Import",
            content: "import defaultRouter, { otherRoute } from './api/routes.js';",
            expected: true
        },
        {
            name: "Mixed Default and Namespace Import",
            content: "import defaultRouter, * as apiRoutes from './api/routes.js';",
            expected: true
        },
        {
            name: "No Extension Import",
            content: "import router from './api/routes';",
            expected: true
        },
        {
            name: "Double Quotes Import",
            content: 'import router from "./api/routes.js";',
            expected: true
        },
        {
            name: "Deep API Route Import",
            content: "import users from './api/v1/users.js';",
            expected: true
        },
        {
            name: "Parent Directory Relative Route Import",
            content: "import routes from '../api/routes.js';",
            expected: true
        },
        {
            name: "Multiline Import",
            content: `import {
    router,
    otherHandler
} from './api/routes.js';`,
            expected: true
        },
        {
            name: "Unrelated Import (Should fail)",
            content: "import express from 'express';",
            expected: false
        },
        {
            name: "Similar but Unrelated Import path (Should fail)",
            content: "import tapir from './tapir/routes.js';",
            expected: false
        }
    ];

    let passedCount = 0;
    scenarios.forEach(scenario => {
        const result = checkApiImport(scenario.content);
        const passed = result === scenario.expected;
        if (passed) passedCount++;
        console.log(`- ${scenario.name}: ${passed ? "PASSED ✅" : "FAILED ❌"} (Result: ${result}, Expected: ${scenario.expected})`);
    });

    console.log(`\nRobustness Tests Summary: ${passedCount}/${scenarios.length} passed.`);
}
