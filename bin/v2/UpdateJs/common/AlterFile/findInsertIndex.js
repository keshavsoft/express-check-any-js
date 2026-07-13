const findInsertIndex = ({
    inContent,
    inPatterns = []
}) => {
    const lines = inContent.split("\n");

    let lineNumber = -1;
    let matchedPattern = null;

    lines.forEach((line, index) => {
        const pattern = inPatterns.find(item => line.includes(item));

        if (pattern) {
            lineNumber = index;
            matchedPattern = pattern;
        };
    });

    return {
        index: lineNumber === -1
            ? -1
            : lines
                .slice(0, lineNumber + 1)
                .join("\n")
                .length + 1,
        matchedPattern
    };
};

export default findInsertIndex;