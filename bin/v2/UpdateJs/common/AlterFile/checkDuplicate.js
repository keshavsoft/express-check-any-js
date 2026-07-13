const checkUseDuplicate = ({
    inContent,
    inFilePath,
    inSearchText
}) => {
    const lines = inContent.split("\n");

    const lineIndex = lines.findIndex(line =>
        line.includes(inSearchText)
    );

    return {
        found: lineIndex !== -1,
        filePath: inFilePath,
        lineNumber: lineIndex !== -1
            ? lineIndex + 1
            : null
    };
};

export default checkUseDuplicate;