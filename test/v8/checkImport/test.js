import {
    getAllImports,
    getImportCount,
    isImportPresent,
    getImportStartLine,
    getImportEndLine
} from './check/index.js';
import { scenarios } from './scenarios.js';

console.log("Running direct v7 import verification tests:\n");

let allPassed = true;

scenarios.forEach((scenario, index) => {
    console.log(`Scenario ${index + 1}: ${scenario.name}`);

    // 1. Verify getImportCount
    const count = getImportCount(scenario.content);
    const expectedCount = scenario.expectedImports.length;
    if (count === expectedCount) {
        console.log(`  ✅ getImportCount matched: ${count}`);
    } else {
        console.error(`  ❌ getImportCount failed: Expected ${expectedCount}, got ${count}`);
        allPassed = false;
    }

    // 2. Verify getAllImports and values
    const imports = getAllImports(scenario.content);
    if (imports.length === expectedCount) {
        console.log(`  ✅ getAllImports returned correct number of import statements`);
    } else {
        console.error(`  ❌ getAllImports returned incorrect statements count`);
        allPassed = false;
    }

    // 3. Verify each import presence, start line, and end line
    scenario.expectedImports.forEach((expected, impIdx) => {
        const present = isImportPresent(scenario.content, expected.source);
        const startLine = getImportStartLine(scenario.content, expected.source);
        const endLine = getImportEndLine(scenario.content, expected.source);

        const presenceMatches = present === true;
        const startMatches = startLine === expected.startLine;
        const endMatches = endLine === expected.endLine;

        if (presenceMatches && startMatches && endMatches) {
            console.log(`  ✅ Import "${expected.source}": present=true, startLine=${startLine}, endLine=${endLine}`);
        } else {
            console.error(`  ❌ Import "${expected.source}" verification failed:`, {
                got: { present, startLine, endLine },
                expected: { present: true, startLine: expected.startLine, endLine: expected.endLine }
            });
            allPassed = false;
        }
    });

    console.log();
});

if (allPassed) {
    console.log("ALL V7 CORE FUNCTION TESTS PASSED! 🎉");
} else {
    console.error("SOME V7 TESTS FAILED! ❌");
    process.exit(1);
}
