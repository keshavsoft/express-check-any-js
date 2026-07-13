export class ImportParser {
    constructor(content) {
        this.content = content;
        this.imports = this._parse();
    }

    _parse() {
        const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
        const results = [];
        let match;

        while ((match = importRegex.exec(this.content)) !== null) {
            const raw = match[0];
            const startIndex = match.index;
            const endIndex = startIndex + raw.length;

            const textBeforeStart = this.content.substring(0, startIndex);
            const startLine = textBeforeStart.split('\n').length;

            const textBeforeEnd = this.content.substring(0, endIndex);
            const endLine = textBeforeEnd.split('\n').length;

            const sourceMatch = raw.match(/from\s+['"]([^'"]+)['"]/) || raw.match(/import\s+['"]([^'"]+)['"]/);
            const source = sourceMatch ? sourceMatch[1] : '';

            const isSideEffect = !raw.includes('from');
            const isNamespace = raw.includes('* as');
            const isNamed = /\{[\s\S]*?\}/.test(raw);
            
            const isDefault = !isSideEffect && !isNamespace && /import\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*(?:,|\bfrom\b)/.test(raw);

            results.push({
                raw,
                source,
                startLine,
                endLine,
                isSideEffect,
                isNamespace,
                isNamed,
                isDefault
            });
        }

        return results;
    }

    // 1. Show all imports
    getAllImports() {
        return this.imports;
    }

    // 2. Find in imports
    // Returns matched imports based on query string or RegExp.
    findImports(query) {
        if (query instanceof RegExp) {
            return this.imports.filter(imp => query.test(imp.source));
        }
        return this.imports.filter(imp => imp.source === query || imp.source.includes(query));
    }

    // 3. Imports start line and end line of the entire block of imports
    getImportBlockBounds() {
        if (this.imports.length === 0) {
            return { startLine: null, endLine: null };
        }
        const startLine = Math.min(...this.imports.map(imp => imp.startLine));
        const endLine = Math.max(...this.imports.map(imp => imp.endLine));
        return { startLine, endLine };
    }
}
