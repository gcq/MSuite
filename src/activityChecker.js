/*jshint scripturl:true*/

var $ = require("jQuery"),
    waitForKeyElements = require("./waitForKeyElements"),
    isKeyDown = require("./keys").isKeyDown;


var checked = false,
    external_img_src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iMTAiCiAgIGhlaWdodD0iMTAiCiAgIGlkPSJzdmcyIj4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE3Ij4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04MjYuNDI4NTksLTY5OC43OTA3NykiCiAgICAgaWQ9ImxheWVyMSI+CiAgICA8cmVjdAogICAgICAgd2lkdGg9IjUuOTgyMTQyOSIKICAgICAgIGhlaWdodD0iNS45ODIxNDI5IgogICAgICAgeD0iODI2LjkyODU5IgogICAgICAgeT0iNzAyLjMwODY1IgogICAgICAgaWQ9InJlY3QyOTk2IgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwNjZjYztzdHJva2Utd2lkdGg6MXB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICA8ZwogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxMDY3OCwwLjcwNzEwNjc4LC0wLjcwNzEwNjc4LDAuNzA3MTA2NzgsNzYyLjg3LC0zNTkuODgzMzkpIgogICAgICAgaWQ9Imc0ODE1Ij4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSA3OTYuOTA4MTksNzAwLjI4MzE3IDMuNzAxMjcsLTMuNzAxMjYgMy44MTE3NCwzLjgxMTc1IC0wLjAxODksMi4yMDMzNiAtMS44NTIzNCwwIDAsMy44NTQzIC0zLjgwMjMzLDAgMCwtMy45NzEwOCAtMS44NTM2LDAgeiIKICAgICAgICAgaWQ9InBhdGg0Nzc3IgogICAgICAgICBzdHlsZT0iZmlsbDojMDA2NmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgogICAgICA8cGF0aAogICAgICAgICBkPSJtIDgwMC42MDk0Niw2OTguMDAyNDQgMy40Njk4NiwzLjQzODY1IC0yLjU3MDIsMCAwLDQuMDc0MzYgLTEuNzM2MiwwIDAsLTQuMDc0MzYgLTIuNjE3NTQsLTMuNmUtNCB6IgogICAgICAgICBpZD0icGF0aDQ3NzkiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K";

function tagThings () {
    //.length
    $(".assign").find(".activityinstance")
    .addClass("custom_activity").addClass("custom_activity_1");
    
    $(".assignment").find(".activityinstance")
    .addClass("custom_activity").addClass("custom_activity_2");

    //El link de la entrega tindra aquesta classe
    $(".custom_activity").find("a").addClass("instance_url");

    $(".custom_activity").find(".activityicon").addClass("single_check");
}

function addCSS () {
    $("head").append(
        $("<style>").text(".activity_done {background-color:#80FF80}"),
        $("<style>").text(".activity_passed {background-color:#FF9999}"),
        $("<style>").text(".activity_pending {background-color:#FFFF00}"),
        $("<style>").text(".activity_unknown {background-color:#C0C0C0}"),

        $("<style>").text(".quick_info>* {margin-left:3px;margin-right:3px}")
    );
}

function addGUI () {
    //Comprovar totes les activitats
    $(".yui3-menuitem").closest("ul").append(
        $("<li>")
        .addClass("yui3-menuitem")
        .append(
            $("<a>")
            .prop("id", "check_button")
            .prop("role", "menuitem")
            .prop("title", "Comprova totes les activitats del curs")
            .addClass("yui3-menuitem-content")
            .text("Comprovar activitats")
        )
    );
    
    //Comprovar activitats d'una secció només
    waitForKeyElements(".yui3-tab-panel", function (node) {
        node.prepend(
            $("<div>")
            .css("text-align", "right")
            .css("float", "right")
            .css("margin", "2px")
            .css("padding", "5px")
            .append(
                $("<a>")
                .prop("title", "Comprova només aquesta pestanya")
                .prop("href", "javascript:void(0)")
                .append(
                    $("<span>")
                    .addClass("tab_check")
                    .css("margin", "2px")
                    .css("padding", "5px")
                    .css("background-color", "#2775c4")
                    .css("border", "solid")
                    .css("border-color", "#043667")
                    .css("border-radius", "5px")
                    .css("color", "white")
                    .text("Comprovar")
                )
            )
        );
        
        //Necessita estar qui, per que quan s'executa main,
        //aixo encara no existeix.
        node.find(".tab_check").click(function () {
            populateSection($(this).closest(".yui3-tab-panel"));
        });
    });
    
    //Per que el clic a la imatge de la activitat no tingui cap efecte
    $(".single_check").each(function () {
        $(this).prependTo($(this).parent().parent());
        $(this).wrap(
            $("<a>")
            .prop("title", "Comprova aquesta activitat")
            .prop("href", "javascript:void(0)")
        );
    });

    //sub_btn
    $(".custom_activity").append(
        $("<a>")
        .addClass("sub_btn")
        .css("margin-left", "10px")
        .prop("title", "Més informació sobre la tramesa")
        .prop("href", "javascript:void(0)")
        .text("[info]")
        .hide()
    )

    //quick_info box
    .append($("<div>").addClass("quick_info").css("margin-left", "10px"))

    //sub_container
    .after(
        $("<div>")
        .addClass("sub_container")
        .css("border-width", "10px")
        .css("border-color", "transparent")
        .css("border-style", "solid")
        .hide()
    );
}

function clearActivity (activity_node) {
    //Traiem el color
    activity_node
    .removeClass("activity_done")
    .removeClass("activity_passed")
    .removeClass("activity_pending")
    .removeClass("activity_unknown");

    //Amaguem el botó de més info
    activity_node.find(".sub_btn").hide();

    //Buidem la info
    activity_node.parent().find(".sub_container").slideUp().empty();
    activity_node.find(".quick_info").empty();
}

function populateActivity (custom_activity_node) {
    custom_activity_node = $(custom_activity_node);

    var sub_container = custom_activity_node.parent().find(".sub_container"),
        sub_btn = custom_activity_node.find(".sub_btn"),
        quick_info = custom_activity_node.find(".quick_info"),
        instance_url = custom_activity_node.find(".instance_url").prop("href"),

    done = function () {
        custom_activity_node.addClass("activity_done");
    },
    pending = function () {
        custom_activity_node.addClass("activity_pending");
    },
    passed = function () {
        custom_activity_node.addClass("activity_passed");
    },

    addToSubContainer = function (node) {
        sub_container.prepend(node);
        sub_btn.show();
    },

    setQuickInfo = function (data) {
        quick_info.empty();

        quick_info.append(
            $("<span>").text(data)
        )
        .append(
            $("<a>")
            .prop("target", "_blank")
            .prop("href", instance_url + "&action=editsubmission")
            .text("Trametre ")
            .append(
                $("<img>")
                .prop("src", external_img_src)
            )
            .click(function () {
                if (!isKeyDown(17)) {
                    $(window).one("focus", function () {
                        populateActivity(custom_activity_node);
                    });
                }
            })
        );
    };
    
    if (custom_activity_node.hasClass("custom_activity")) {
        console.log("checking activity");

        clearActivity(custom_activity_node);

        //Afegim un link per anar a la tramesa completa (Useless)
        sub_container.append(
            $("<a>")
            .prop("target", "_blank")
            .prop("href", instance_url)
            .css("font-weight", "bolder")
            .text("Anar a la tramesa completa ")
            .append(
                $("<img>")
                .prop("src", external_img_src)
            )
        );
        
        $.get(instance_url).done(function (data) {
            var page = $($.parseHTML(data));
            
            if (custom_activity_node.hasClass("custom_activity_1")) {
                if (page.find(".submissionstatussubmitted").length > 0) {
                    if (page.find(".plugincontentsummary").length === 0) {
                        pending();
                    } else {
                        done();
                        if (page.find(".feedbacktable").length > 0) {
                            addToSubContainer(page.find(".feedbacktable"));
                        }
                    }
                } else {
                    if (page.find(".overdue").length > 0) {
                        passed();
                    } else {
                        pending();
                        var remaining = page.find(".lastrow")
                                        .find(".lastcol")
                                        .text();
                        setQuickInfo("[Temps restant: " + remaining + " ]");
                    }
                }
            }

            if (custom_activity_node.hasClass("custom_activity_2")) {
                if (page.find(".files").find("a").length > 0) {
                    done();
                    if (page.find(".feedback").length > 0) {
                        addToSubContainer(page.find(".feedbacktable"));
                    }
                } else {
                    pending();
                    var date = page.find(".c1").eq(1).text();
                    if (date !== "") {
                        setQuickInfo("[Data d'entrega: " + date + " ]");
                    }
                }
            }
        });

    } else {
        console.log("bad activity");
    }
}

function populateSection (section_node) {
    console.log("checking section");
    
    var section = $(section_node);

    if (section.hasClass("section_checked")) {
        alert("Ja comprovat! Per tornar a comprovar, recarrega la pàgina");
    } else {
        section.addClass("section_checked");
        $.each(section.find(".custom_activity"), function (a, b) {
            populateActivity(b);
        });
    }
}

function populateTab (tab_node) {
    console.log("checking tab");
    var tab_position = $(tab_node).prevAll().length,
        section = $("[id*='section-']")[tab_position];
    
    populateSection(section);
}

function checkAllActivities () {
    if (checked === true) {
        alert("Ja comprovat!");
    } else {
        console.log("checking all activities");
        checked = true;
        
        $.each($(".custom_activity"), function (a, b) {
            populateActivity(b);
        });
    }
}

function main () {
    console.log("Initializing Activity checker");
    
    tagThings();
    addCSS();
    addGUI();
    
    $("#check_button").click(function () {
        checkAllActivities();
    });
    
    $(".single_check").click(function (event) {
        var activity = $(this).closest(".custom_activity");

        if (isKeyDown(17)) {  //CONTROL + click = netejar
            event.preventDefault();
            clearActivity(activity);
        } else {
            populateActivity(activity);
        }
    });

    $(".sub_btn").click(function () {
        console.log("clicked submission moar");
        $(this).parent().parent().find(".sub_container").slideToggle();
    });
    
    console.log("Activity checker ok");
    
    if (window.location.hash === "#check_all") {
        checkAllActivities();
    }
}

module.exports = main;