function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

function notStrictEqual(actual, expected, message) {
    if (actual === expected) {
        throw new Error(message || "Assertion failed");
    }
};

function strictEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || "Assertion failed");
    }
};

const exports = {
    assert,
    notStrictEqual,
    strictEqual
};

export default exports;
