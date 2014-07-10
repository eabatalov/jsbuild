function jsonParseSafe(str) {
    try {
        return { data : JSON.parse(str) };
    } catch(err) {
        return { err : err };
    }
}

module.exports = jsonParseSafe;
