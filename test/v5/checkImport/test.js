import { checkApiImport } from './check.js';
import { scenarios } from './scenarios.js';

console.log("Running modular robustness tests on various import scenarios:");

let passedCount = 0;
scenarios.forEach(scenario => {
    const result = checkApiImport(scenario.content);
    const passed = result === scenario.expected;
    if (passed) passedCount++;
    console.log(`- ${scenario.name}: ${passed ? "PASSED ✅" : "FAILED ❌"} (Result: ${result}, Expected: ${scenario.expected})`);
});

console.log(`\nRobustness Tests Summary: ${passedCount}/${scenarios.length} passed.`);
