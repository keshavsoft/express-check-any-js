import {
    getAllImports
} from "./bin/v3/index.js";

import getLatestVersion from "./bin/core/getLatestVersion.js";

const load = async ({ jsFilePath, inCheckLines, showLog }) => {
    const v = getLatestVersion();

    const module = await import(`./bin/${v}/start.js`);

    await module.default({ jsFilePath, inCheckLines, showLog });
};

export {
    getAllImports
};

export default load;