module.exports = async function (length) {
    return Math.random()
        .toString(36)
        .slice(2, length + 2);
}