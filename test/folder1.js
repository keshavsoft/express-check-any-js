import index from "../index.js";

const startFunc = async () => {
    await index({
        showLog: true
    });
};

startFunc().then();