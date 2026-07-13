/**
 * Returns all raw import statements present in the file content.
 */
export function getAllImports(fileContent) {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    const matches = [];
    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        matches.push(match[0]);
    }
    return matches;
}

/**
 * Returns the total count of import statements in the file content.
 */
export function getImportCount(fileContent) {
    return getAllImports(fileContent).length;
}

/**
 * Tests whether a specific import source path is present or not.
 */
export function isImportPresent(fileContent, neededImport) {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        const raw = match[0];
        const sourceMatch = raw.match(/from\s+['"]([^'"]+)['"]/) || raw.match(/import\s+['"]([^'"]+)['"]/);
        const source = sourceMatch ? sourceMatch[1] : '';
        if (source === neededImport || source.includes(neededImport)) {
            return true;
        }
    }
    return false;
}

/**
 * Calculates the start line of a specific import statement.
 */
export function getImportStartLine(fileContent, importSource) {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        const raw = match[0];
        const sourceMatch = raw.match(/from\s+['"]([^'"]+)['"]/) || raw.match(/import\s+['"]([^'"]+)['"]/);
        const source = sourceMatch ? sourceMatch[1] : '';
        if (source === importSource || source.includes(importSource)) {
            const textBefore = fileContent.substring(0, match.index);
            return textBefore.split('\n').length;
        }
    }
    return -1;
}

/**
 * Calculates the end line of a specific import statement.
 */
export function getImportEndLine(fileContent, importSource) {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        const raw = match[0];
        const sourceMatch = raw.match(/from\s+['"]([^'"]+)['"]/) || raw.match(/import\s+['"]([^'"]+)['"]/);
        const source = sourceMatch ? sourceMatch[1] : '';
        if (source === importSource || source.includes(importSource)) {
            const endIndex = match.index + raw.length;
            const textBefore = fileContent.substring(0, endIndex);
            return textBefore.split('\n').length;
        }
    }
    return -1;
}
