function thisId () {
    if (/\?id=(\d+)/.test(window.location.href)) {
        return /\?id=(\d+)/.exec(window.location.href)[1];
    } else {
        return false;
    }
}

module.exports = thisId;