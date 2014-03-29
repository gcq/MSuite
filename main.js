var $ = require("jQuery"),
    easter_eggs = require("./easterEggs"),
    keys = require("./keys"),
    timetable = require("./timetable"),
    activity_checker = require("./activityChecker"),
    default_tab = require("./defaultTab"),
    folders = require("./folders"),
    autoresource = require("./autoResource");

function main () {
    $(document).ready(function () {
        easter_eggs.main();
        console.log("Running keys.main");
        keys.main();

        var url = window.location.href;
        console.log(url);

        if (/.*/.test(url)) {  //Silly, pero mantenim l'estil
            console.log("main");
            timetable();
        }

        if (/\/course\//.test(url)) {
            console.log("course");
            activity_checker();
            default_tab();
            folders();
        }

        if (/mod\/url\//.test(url) || /mod\/resource\//.test(url)) {
            console.log("resource");
            autoresource();
        }
    });
}

main();