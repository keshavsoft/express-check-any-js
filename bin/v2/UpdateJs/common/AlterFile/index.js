import readFile from "../readFile.js";
import checkDuplicate from "./checkDuplicate.js";
import findInsertIndex from "./findInsertIndex.js";
import writeFile from "../writeFile.js";

import buildUpdatedContent from "./buildUpdatedContent.js";

const locateInsertPoint = ({ content, insertAfter }) => {
    return findInsertIndex({
        inContent: content,
        inPatterns: insertAfter
    });
};

const alterFile = ({
    jsFilePath,
    toInsertLine,
    duplicationCheck,
    insertAfter = [],
    showLog = false
}) => {
    const content = readFile(jsFilePath);

    const duplicateInfo = checkDuplicate({
        inContent: content,
        inFilePath: jsFilePath,
        inSearchText: duplicationCheck
    });

    if (duplicateInfo.found) {
        if (showLog) {
            console.log(
                `Duplicate found at line ${duplicateInfo.lineNumber}`
            );
        }

        return duplicateInfo;
    };

    const insertInfo = locateInsertPoint({
        content,
        insertAfter
    });

    const updated = buildUpdatedContent({
        content,
        insertInfo,
        toInsertLine,
        insertAfter
    });

    writeFile(jsFilePath, updated);
};

export default alterFile;