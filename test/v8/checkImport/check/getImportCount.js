import { getAllImports } from './getAllImports.js';

/**
 * Returns the total count of import statements in the file content.
 */
export const getImportCount = (fileContent) => getAllImports(fileContent).length;
