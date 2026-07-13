import { ImportParser } from './parser.js';
import { scenarios } from './scenarios.js';

console.log("Running modular ImportParser v5 robustness tests:\n");

let allPassed = true;

scenarios.forEach((scenario, index) => {
    console.log(`Scenario ${index + 1}: ${scenario.name}`);
    const parser = new ImportParser(scenario.content);

    // 1. Show all imports
    const allImports = parser.getAllImports();
    console.log(`- Extracted ${allImports.length} imports.`);
    
    if (allImports.length !== scenario.expectedImports.length) {
        console.error(`  ❌ Failed: Expected ${scenario.expectedImports.length} imports, got ${allImports.length}`);
        allPassed = false;
    }

    allImports.forEach((imp, impIdx) => {
        const expected = scenario.expectedImports[impIdx];
        if (!expected) return;

        const sourceMatches = imp.source === expected.source;
        const startMatches = imp.startLine === expected.startLine;
        const endMatches = imp.endLine === expected.endLine;
        const namedMatches = imp.isNamed === expected.isNamed;
        const defaultMatches = imp.isDefault === expected.isDefault;

        if (sourceMatches && startMatches && endMatches && namedMatches && defaultMatches) {
            console.log(`  ✅ Import ${impIdx + 1} (${imp.source}) properties matched (Lines ${imp.startLine}-${imp.endLine})`);
        } else {
            console.error(`  ❌ Import ${impIdx + 1} properties mismatch:`, {
                got: { source: imp.source, startLine: imp.startLine, endLine: imp.endLine, isNamed: imp.isNamed, isDefault: imp.isDefault },
                expected
            });
            allPassed = false;
        }
    });

    // 2. Find in imports
    const findResult = parser.findImports(/api/);
    console.log(`- Finding imports matching /api/:`);
    if (findResult.length === 1 && findResult[0].source === "./api/routes.js") {
        console.log(`  ✅ Found exact matches for /api/ query.`);
    } else {
        console.error(`  ❌ Find logic failed. Expected to find "./api/routes.js", found:`, findResult);
        allPassed = false;
    }

    // 3. Import block bounds
    const bounds = parser.getImportBlockBounds();
    console.log(`- Import block bounds:`);
    const boundsMatched = bounds.startLine === scenario.expectedBlockBounds.startLine &&
                          bounds.endLine === scenario.expectedBlockBounds.endLine;
    
    if (boundsMatched) {
        console.log(`  ✅ Bounds matched: Lines ${bounds.startLine} to ${bounds.endLine}`);
    } else {
        console.error(`  ❌ Bounds mismatch: Got start=${bounds.startLine}, end=${bounds.endLine}, expected start=${scenario.expectedBlockBounds.startLine}, end=${scenario.expectedBlockBounds.endLine}`);
        allPassed = false;
    }
    console.log();
});

if (allPassed) {
    console.log("ALL IMPORTPARSER TESTS PASSED! 🎉");
} else {
    console.error("SOME IMPORTPARSER TESTS FAILED! ❌");
    process.exit(1);
}
