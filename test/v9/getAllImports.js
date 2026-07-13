import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllImports } from '../../index.js';

try {
    const fileContent = fs.readFileSync("./app.js", 'utf8');
    const matches = getAllImports(fileContent);
    console.log(matches);
} catch (error) {
    console.error("Error reading file:", error.message);
};
