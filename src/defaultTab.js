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

function getSavedTab () {
    console.log("getSavedTab");

    var id = localStorage[thisId() + "_default_tab"];

    if (id !== undefined) {
        return id;
    } else {
        return -1;
    }
}

function setSavedTab (id) {
    console.log("setSavedTab", id);

    localStorage[thisId() + "_default_tab"] = id;
}

function getTabById (id) {
    console.log("getTabById", id);

    return $(".yui3-tab").eq(id);
}

function getIdFromTab (tab) {
    console.log("getIdFromTab");

    return $(tab).index();
}

function highlightTab (id) {
    console.log("highlightTab", id);

    var tab = getTabById(id);
    setSavedTab(id);
    $(".default_tab").hide();
    tab.find(".default_tab").show();
    tab.click();
}

function main () {
    console.log("Initializing default_tab");

    addGUI();

    var tab = getSavedTab();
    if (tab !== -1) {
        highlightTab(tab);
    } else {
        setSavedTab(0);
    }

    $(".yui3-tab").click(function () {
        if (isKeyDown(17)) {
            highlightTab(getIdFromTab(this));
        }
    });

    console.log("default_tab ok");
}

module.exports =  function () {
    waitForKeyElements(".yui3-tabview-list", function (node) {
        main();
    });
};