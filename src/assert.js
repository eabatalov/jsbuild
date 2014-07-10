function assert(cond, msg) {
    if (!cond) {
        var msg = msg || 'assertion failed';
        console.error(msg);
        throw msg;
    }
}

module.exports = assert;
