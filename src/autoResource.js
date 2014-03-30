var $ = require("jQuery");

module.exports = function () {
    function main () {
        if ($(".resourceworkaround").length > 0) {
            window.location.href = $(".resourceworkaround")
                                   .find("a")
                                   .prop("href");
        }

        if ($(".urlworkaround").length > 0) {
            window.location.href = $(".urlworkaround").find("a").prop("href");
        }
    }

    main();
};