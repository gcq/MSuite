var $ = require("jQuery");

var active_keys = [];
function main () {
    $(document).keydown(function (event) {
        if (active_keys.indexOf(event.which) === -1) {
            active_keys.push(event.which);
        }
    });

    $(document).keyup(function (event) {
        active_keys = active_keys.filter(function (element) {
            return element !== event.which;
        });
    });
}

function isKeyDown (key) {
    return active_keys.indexOf(key) !== -1;
}

module.exports.main = main;
module.exports.isKeyDown = isKeyDown;