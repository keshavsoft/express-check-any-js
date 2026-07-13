import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import index from "../../index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appJsPath = path.join(__dirname, "app.js");

const initialAppContent = `import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';

const app = express()

const server = http.createServer(app);

var port = normalizePort(process.env.PORT || 3000);
app.use(express.static('Public'));
app.use(cookieParser());

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

server.listen(port, () => {
    console.log(\`Example app listening on port \${port}\`);
    console.log(\`Open here http://localhost:\${port}\`);
});
`;

function resetAppJs() {
    fs.writeFileSync(appJsPath, initialAppContent, "utf8");
}

async function runTests() {
    console.log("Starting v5 tests...");

    // Test Case 1: String importLines.toInsertLine
    resetAppJs();
    console.log("\n--- Test Case 1: String importLines.toInsertLine ---");
    const checkLinesString = {
        importLines: {
            toInsertLine: "import { router as routerFromTest } from './Test/routes.js';",
            duplicationCheck: "from './Test/routes.js';",
            insertAfter: [
                "import express"
            ]
        },
        useLines: {
            toInsertLine: "app.use('/Test', routerFromTest);",
            duplicationCheck: "app.use('/Test'",
            insertAfter: [
                "app.use(cookieParser());",
                "app.use("
            ]
        }
    };
    await index({
        showLog: true,
        jsFilePath: appJsPath,
        inCheckLines: checkLinesString
    });
    let result = fs.readFileSync(appJsPath, "utf8");
    if (result.includes("import { router as routerFromTest } from './Test/routes.js';")) {
        console.log("✅ Test Case 1 Passed: String toInsertLine inserted correctly.");
    } else {
        console.error("❌ Test Case 1 Failed: String toInsertLine not found.");
        process.exit(1);
    }

    // Test Case 2: Array importLines.toInsertLine
    resetAppJs();
    console.log("\n--- Test Case 2: Array importLines.toInsertLine ---");
    const checkLinesArray = {
        importLines: {
            toInsertLine: [
                "import { router as routerFromTest1 } from './Test1/routes.js';",
                "import { router as routerFromTest2 } from './Test2/routes.js';"
            ],
            duplicationCheck: "from './Test1/routes.js';",
            insertAfter: [
                "import express"
            ]
        },
        useLines: {
            toInsertLine: "app.use('/Test', routerFromTest1);",
            duplicationCheck: "app.use('/Test'",
            insertAfter: [
                "app.use(cookieParser());",
                "app.use("
            ]
        }
    };
    await index({
        showLog: true,
        jsFilePath: appJsPath,
        inCheckLines: checkLinesArray
    });
    result = fs.readFileSync(appJsPath, "utf8");
    if (result.includes("import { router as routerFromTest1 }") && result.includes("import { router as routerFromTest2 }")) {
        console.log("✅ Test Case 2 Passed: Array toInsertLine inserted correctly.");
    } else {
        console.error("❌ Test Case 2 Failed: Array toInsertLine elements not found.");
        process.exit(1);
    }

    // Test Case 3: Invalid type for importLines.toInsertLine (Validation error)
    resetAppJs();
    console.log("\n--- Test Case 3: Invalid type validation ---");
    const checkLinesInvalid = {
        importLines: {
            toInsertLine: 12345, // Invalid type
            duplicationCheck: "from './Test1/routes.js';",
            insertAfter: [
                "import express"
            ]
        },
        useLines: {
            toInsertLine: "app.use('/Test', routerFromTest1);",
            duplicationCheck: "app.use('/Test'",
            insertAfter: [
                "app.use(cookieParser());",
                "app.use("
            ]
        }
    };
    try {
        await index({
            showLog: true,
            jsFilePath: appJsPath,
            inCheckLines: checkLinesInvalid
        });
        console.error("❌ Test Case 3 Failed: Validation did not throw an error for invalid type.");
        process.exit(1);
    } catch (e) {
        if (e.message.includes("inCheckLines.importLines.toInsertLine must be a string or an array")) {
            console.log("✅ Test Case 3 Passed: Validation correctly threw error:", e.message);
        } else {
            console.error("❌ Test Case 3 Failed: Threw unexpected error:", e.message);
            process.exit(1);
        }
    }

    console.log("\nAll tests completed successfully!");
}

runTests();
