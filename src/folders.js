/*jshint scripturl:true*/

var $ = require("jQuery");

var plus_img_src = "data:image/gif;base64,R0lGODlhCwALAKEBAICAgP///wAAAP///yH5BAEKAAMALAAAAAALAAsAAAIajI8Gy6z5AjjiTEntE5zjH1TRFWogcjUqBBUAOw==";

function tagThings () {
    $(".folder").find(".activityinstance").addClass("custom_folder");
}

function addCSS () {
    $("<style>")
    .text(".custom_folder {margin-left:-15px;display:table;}")
    .appendTo("head");
}

function addGUI () {
    //Carpetes
    $(".custom_folder").closest(".activity").append(
        $("<div>")
        .addClass("tree_container")
        .hide()
    );
    $(".custom_folder").prepend(
        $("<span>")
        .addClass("moar_btn")
        .css("display", "table-cell")
        .css("vertical-align", "middle")
        .append(
            $("<a>")
            .css("margin-right", "5px")
            .prop("href", "javascript:void(0)")
            .append(
                $("<img>")
                .prop("src", plus_img_src)
            )
        )
    );
}

function main () {
    console.log("Initializing moodle folders");
    
    tagThings();
    addCSS();
    addGUI();
    
    $(".moar_btn").click(function () { //Carpetes
        console.log("clicked folder");
        
        var
        container = $(this).closest(".custom_folder"),
        dir = container.children("a").prop("href"),
        tree = container.closest(".activity").children(".tree_container");
        
        if (tree.is(":empty")) {
            tree.text("Loading...").slideToggle();
            tree.load(dir + " #folder_tree0", function (a, b, c) {
                tree.hide();
                tree.find("ul:eq(0)").replaceWith(tree.find("ul:eq(1)"));
                tree.slideDown();
            });
        } else {
            tree.slideToggle();
        }
    });
    
    console.log("Folders ok");
}

module.exports = main;