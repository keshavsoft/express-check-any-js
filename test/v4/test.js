import index from "../../index.js";
import checkLines from "./checkLines.json" with {type: "json"};

const startFunc = async () => {
    await index({
        showLog: true,
        jsFilePath: process.cwd() + "/app.js",
        inCheckLines: checkLines
    });
};

startFunc().then();