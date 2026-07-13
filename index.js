import getLatestVersion from "./bin/core/getLatestVersion.js";

const v = getLatestVersion();
const latestModule = await import(`./bin/${v}/index.js`);

const load = async ({ jsFilePath, inCheckLines, showLog }) => {
    const module = await import(`./bin/${v}/start.js`);
    await module.default({ jsFilePath, inCheckLines, showLog });
};

export const getAllImports = latestModule.getAllImports;
export const getImportCount = latestModule.getImportCount;
export const isImportPresent = latestModule.isImportPresent;
export const getImportStartLine = latestModule.getImportStartLine;
export const getImportEndLine = latestModule.getImportEndLine;
export const version = v;

export default load;