import index from "../../index.js";
import checkLines from "./checkLines.json" with {type: "json"};

const command = "ShowAll";

const startFunc = async () => {
    const matched = checkLines.find(x => x.cmd === command);

    await index({
        showLog: true,
        jsFilePath: process.cwd() + "/end-points.js",
        inCheckLines: matched.endPointsJs
    });
};

startFunc().then();