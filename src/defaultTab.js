var $ = require("jQuery"),
    waitForKeyElements = require("./waitForKeyElements"),
    thisId = require("./thisId"),
    isKeyDown = require("./keys").isKeyDown;


function addGUI () {
    var labels = $(".yui3-tab-label");

    labels.each(function () {
        var label = $(this),
            text = label.text();

        label
        .empty()
        .append(
            $("<span>")
            .css("display", "inline-block")
            .css("vertical-align", "middle")
            .text(text)
        );
    });

    labels.append(
        $("<span>")
        .addClass("default_tab")
        .css("display", "inline-block")
        .css("height", "5px")
        .css("width", "5px")
        .css("border-radius", "100%")
        .css("border-style", "solid")
        .css("border-width", "1px")
        .css("border-color", "#D8D8D8")
        .css("margin-left", "5px")
        .css("vertical-align", "middle")
        .css("background-color", "green")
        .hide()
    );
}

function setTab (tab) {
    tab = $(tab);
    $(".default_tab").hide();
    tab.find(".default_tab").show();
    localStorage[thisId() + "_default_tab"] = tab.index();
}

function main () {
    console.log("Initializing default_tab");

    addGUI();
    var tab = $(".yui3-tab").eq(localStorage[thisId() + "_default_tab"]);
    setTab(tab);
    tab.click();

    $(".yui3-tab").click(function () {
        if (isKeyDown(17)) {
            setTab(this);
        }
    });

    console.log("default_tab ok");
}

module.exports =  function () {
    waitForKeyElements(".yui3-tabview-list", function (node) {
        main();
    });
};