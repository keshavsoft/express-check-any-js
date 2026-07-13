const startFunc = (obj) => {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        throw new TypeError("inCheckLines must be a valid object.");
    }
    for (const key of ["importLines", "useLines"]) {
        if (!(key in obj)) {
            throw new Error(`inCheckLines must contain "${key}".`);
        }
        const section = obj[key];
        if (typeof section !== "object" || section === null || Array.isArray(section)) {
            throw new TypeError(`inCheckLines.${key} must be an object.`);
        }
        if (key === "importLines") {
            if (typeof section.toInsertLine !== "string" && !Array.isArray(section.toInsertLine)) {
                throw new TypeError(`inCheckLines.importLines.toInsertLine must be a string or an array.`);
            }
        } else {
            if (typeof section.toInsertLine !== "string") {
                throw new TypeError(`inCheckLines.${key}.toInsertLine must be a string.`);
            }
        }
        if (typeof section.duplicationCheck !== "string") {
            throw new TypeError(`inCheckLines.${key}.duplicationCheck must be a string.`);
        }
        if (!Array.isArray(section.insertAfter)) {
            throw new TypeError(`inCheckLines.${key}.insertAfter must be an array.`);
        }
    }
};

export default startFunc;