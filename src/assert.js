function assert(cond, msg) {
    if (!cond) {
        console.error('assertion failed: ', msg);
        throw msg;
    }
}

module.exports = assert;
