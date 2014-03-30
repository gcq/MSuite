var $ = require("jQuery");

window.active_keys = [];
function main () {
    $(document).keydown(function (event) {
        if (window.active_keys.indexOf(event.which) === -1) {
            window.active_keys.push(event.which);
        }
    });

    $(document).keyup(function (event) {
        window.active_keys = window.active_keys.filter(function (element) {
            return element !== event.which;
        });
    });
}

function isKeyDown (key) {
    return window.active_keys.indexOf(key) !== -1;
}

module.exports.main = main;
module.exports.isKeyDown = isKeyDown;