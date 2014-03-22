// ==UserScript==
// @name        Moodle Suite
// @namespace   http://userscripts.org/users/392674
// @description Suite per al Moodle
// @include     *://noumoodle.bernatelferrer.cat/*
// @include     *://192.168.0.9/*
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @version     0.1.8
// @grant       none
// ==/UserScript==

/*//Boilerplate for jQuery - start
//Code from http://snipplr.com/view/54863/wait-for-jquery-to-load/
var checker = 0;
 
function jqueryLoaded () {
    clearInterval(checker);
    //alert('jQuery is loaded, sire!');
    main();
}
 
function checkJquery () {
    if (window.jQuery) {
        jqueryLoaded();
    }
    if (checker === 0) {
        //alert('Setting up interval');
        
        var el = document.createElement("script");
        el.src = "http://code.jquery.com/jquery-latest.min.js";
        document.getElementsByTagName("head")[0].appendChild(el);
        
        checker = window.setInterval(checkJquery, 100);
    }
}
 
checkJquery();
//Boilerplate for jQuery - end*/


 /*--- waitForKeyElements(): A utility function, for Greasemonkey scripts,
        that detects and handles AJAXed content.

        Usage example:

            waitForKeyElements (
                "div.comments"
                , commentCallbackFunction
            );

            //--- Page-specific function to do what we want when the node is found.
            function commentCallbackfunction (jNode) {
                jNode.text ("This comment changed by waitForKeyElements().");
            }

        IMPORTANT: This function requires your script to have loaded jQuery.
    */
var waitForKeyElements = function (
        selectorTxt,    /* Required: The jQuery selector string that
                            specifies the desired element(s).
                        */
        actionFunction, /* Required: The code to run when elements are
                            found. It is passed a jNode to the matched
                            element.
                        */
        bWaitOnce,      /* Optional: If false, will continue to scan for
                            new elements even after the first match is
                            found.
                        */
        iframeSelector  /* Optional: If set, identifies the iframe to
                            search.
                        */
    ) {
        var targetNodes, btargetsFound;

        if (typeof iframeSelector == "undefined") {
            targetNodes = $(selectorTxt);
        } else {
            targetNodes = $(iframeSelector).contents().find(selectorTxt);
        }

        if (targetNodes && targetNodes.length > 0) {
            btargetsFound = true;
            /*--- Found target node(s). Go through each and act if they
                are new.
            */
            targetNodes.each(function () {
                var jThis = $(this);
                var alreadyFound = jThis.data('alreadyFound') || false;

                if (!alreadyFound) {
                    //--- Call the payload function.
                    var cancelFound = actionFunction (jThis);
                    if (cancelFound) {
                        btargetsFound = false;
                    } else {
                        jThis.data('alreadyFound', true);
                    }
                }
            });
        } else {
            btargetsFound = false;
        }

        //--- Get the timer-control variable for this selector.
        var controlObj = waitForKeyElements.controlObj || {};
        var controlKey = selectorTxt.replace(/[^\w]/g, "_");
        var timeControl = controlObj[controlKey];

        //--- Now set or clear the timer as appropriate.
        if (btargetsFound && bWaitOnce && timeControl) {
            //--- The only condition where we need to clear the timer.
            clearInterval(timeControl);
            delete controlObj[controlKey];
        } else {
            //--- Set a timer, if needed.
            if (!timeControl) {
                timeControl = setInterval(function () {
                    waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector);
                }, 300);
                
                controlObj[controlKey] = timeControl;
            }
        }
        waitForKeyElements.controlObj = controlObj;
};

var timetable = function () {
    // - - - VARIABLES - - - //

    //Es pot espandir, només cal tenir en compte de mantenir la estructura com ara.
    //És important que el format de les hores sigui "hora:minuts - hora:minuts"
    //Haurá d'estar en format de 24 hores.
    var hores = [
            "15:15 - 16:10",
            "16:10 - 17:05",
            "17:05 - 18:00",
            "18:00 - 18:30",  //Pati
            "18:30 - 19:25",
            "19:25 - 20:20",
            "20:20 - 21:15"
        ];

    //Es faran servir d'ara endavant per referisr-se a les assignatures
    //Plantilla: "id": ["nom llarg", "direcció web"],
    //Si no te web deixar ""
    var x_id = {
            "m04": ["SO xarxes", "/course/view.php?id=329"],
            "m06": ["Seguretat", "/course/view.php?id=50"],
            "m07": ["Serveis", "/course/view.php?id=301"],
            "m08a": ["WebApp (M)", "/course/view.php?id=310"],
            "m08b": ["WebApp (C)", "/course/view.php?id=310"],
            "m10": ["Empresa", "/course/view.php?id=413"],
            "tut": ["Tutoria", "/course/view.php?id=324"],
            "pti": ["Pati", "http://xkcd.com"]
        };

    //Aquesta és la informació de la taula de l'horari.
    //La primera hora correspon a la primera classe de cada dia.
    var horari = {
        dilluns: [
            "m07",
            "m07",
            "tut",
            "pti",
            "m08a",
            "m08a"
        ],
                
        dimarts: [
            "m06",
            "m06",
            "m07",
            "pti",
            "m07",
            "m04"
        ],
                
        dimecres: [
            "",
            "m06",
            "m06",
            "pti",
            "m10",
            "m04",
            "m04"
        ],
                
        dijous: [
            "m08a",
            "m08b",
            "m08b",
            "pti",
            "m04",
            "m04"
        ],
                
        divendres: [
            "m08b",
            "m08b",
            "m10",
            "pti",
            "m07",
            "m07"
        ]
    };

    // - - - VARIABLES - - - //
    //(No editar res per sota d'aquí)

    //NO BAIXIS MéS!!!!!

    //Index per trobar el nom del dia de la setmana a aprtir del numero
    var index_dies = Object.keys(horari);

    //Posem el nombre de classes al dia més llarg correctament
    var clases = 0, dia;
    for (dia in horari) {
        if (horari[dia].length > clases) {
            clases = horari[dia].length;
        }
    }

    function addCSS () {
        //Per la classe highlighted
        $("<style>").text("#timetable_table tr>td.current_class{background-color:#8AE62E; border: 3px solid green};").appendTo("head");
    }

    function addGUI () {
        //Botó a la barra superior del moodle
        $(".yui3-menuitem").closest("ul").append(
            $("<li>")
            .addClass("yui3-menuitem")
            .append(
                $("<a>")
                .prop("id", "timetable_button")
                .prop("role", "menuitem")
                .addClass("yui3-menuitem-content")
                .text("Horari")
            )
        );
        
        //Div amagat per a la taula
        $("#page-content").prepend(
            $("<div>")
            .prop("id", "timetable_container")
            .css("padding-left", "50px")
            .append($("<br>"))
            .append(
                $("<p>")
                .append(
                    $("<h1>")
                    .text("HORARI")
                )
            )
            .append(
                $("<table>")
                .prop("id", "timetable_table")
                .addClass("generaltable")
            )
            .hide()
        );

        var table = $("#timetable_table"), row = $("<tr>").addClass("custom_table_header"), dia, text;
        
        row.append(  //  Cel·la 0, 0
            $("<td>")
            .css("border", "0px")
            .append(
                $("<span>")
                .prop("id", "timetable_update_button")
                .text("Actualitzar")
            )
        );
        for (dia in horari) {
            text = $("<span>").css("font-size", "20px").css("font-weight", "bold").text(dia.charAt(0).toUpperCase() + dia.slice(1));
            row.append($("<td>").addClass("r0").append(text));
        }
        table.append(row);
        
        var hora;
        for (hora = 0; hora < clases; hora++) {
            if (hora % 2 === 0) {
                row = $("<tr>").addClass("r0");
            } else {
                row = $("<tr>").addClass("r1");
            }
            
            row.append($("<td>").addClass("custom_table_hour").text(hores[hora]));
            
            for (dia in horari) {
                var class_obj = x_id[horari[dia][hora]];
                if (class_obj !== undefined) {  //Hi ha classe
                    var content;
                    
                    if (class_obj[1] === "") {  //No hi ha link
                        content = $("<span>").text(class_obj[0]);
                    } else {  //Si link
                        content = $("<a>");
                        content.prop("href", class_obj[1]);
                        content.text(class_obj[0]);
                    }
                    
                    row.append($("<td>").append(content));
                } else {  //No hi ha classe, cel·la buida
                    row.append($("<td>"));
                }
            }
            
            table.append(row);
        }
    }

    function always2 (i) {
        i = i.toString();
        if (i.length < 2) {
            i = "0"+i;
        }
        return i;
    }

    function updateTable () {
        //Busquem quina hora és
        //current será l'index de l'array hores
        var date = new Date(), i, hora, hora1, hora2, current = -1;
        
        for (i = 0; i < clases; i++) {
            hora = hores[i].split(" - ");
            
            hora1 = new Date();
            hora1.setHours(parseInt(hora[0].split(":")[0]));
            hora1.setMinutes(parseInt(hora[0].split(":")[1]));
            
            hora2 = new Date();
            hora2.setHours(parseInt(hora[1].split(":")[0]));
            hora2.setMinutes(parseInt(hora[1].split(":")[1]));
            
            if (hora1 <= date && date <= hora2) {
                current = i;
            }
        }
        
        //Traiem qualsevol cel·la marcada
        $(".current_class").removeClass("current_class");
        
        //Afegim la classe CSS a la cel·la correcte
        if (current > -1 && date.getDay() > 0) {
            var td = $("#timetable_table").find("tr").eq(current + 1).find("td").eq(date.getDay());
            if (td.html() !== "") {
                td.addClass("current_class");
            }
        }
        
    }

    function main () {
        console.log("Initializing timetable");

        addCSS();
        addGUI();
        
        $("#timetable_button").click(function () {  //Horari
            console.log("clicked timetable");
            
            $("#timetable_container").slideToggle();
        });
        
        $("#timetable_update_button").click(function () {  //Actualitza Horari
            console.log("clicked update timetable");
            
            updateTable();
        });
        
        updateTable();
        setInterval(updateTable, 1000);
        
        console.log("Timetable ok");
    }

    main();
};

var folders = function () {

    var plus_img_src = "data:image/gif;base64,R0lGODlhCwALAKEBAICAgP///wAAAP///yH5BAEKAAMALAAAAAALAAsAAAIajI8Gy6z5AjjiTEntE5zjH1TRFWogcjUqBBUAOw==";

    function tagThings () {
        $(".folder").find(".activityinstance").addClass("custom_folder");
    }

    function addCSS () {
        $("<style>").text(".custom_folder {margin-left:-15px;display:table;}").appendTo("head");
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

    main();
};

var activity_checker = function () {
    var
    total = 0,
    count = 0,
    checked = false,
    external_img_src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iMTAiCiAgIGhlaWdodD0iMTAiCiAgIGlkPSJzdmcyIj4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE3Ij4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04MjYuNDI4NTksLTY5OC43OTA3NykiCiAgICAgaWQ9ImxheWVyMSI+CiAgICA8cmVjdAogICAgICAgd2lkdGg9IjUuOTgyMTQyOSIKICAgICAgIGhlaWdodD0iNS45ODIxNDI5IgogICAgICAgeD0iODI2LjkyODU5IgogICAgICAgeT0iNzAyLjMwODY1IgogICAgICAgaWQ9InJlY3QyOTk2IgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwNjZjYztzdHJva2Utd2lkdGg6MXB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICA8ZwogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxMDY3OCwwLjcwNzEwNjc4LC0wLjcwNzEwNjc4LDAuNzA3MTA2NzgsNzYyLjg3LC0zNTkuODgzMzkpIgogICAgICAgaWQ9Imc0ODE1Ij4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSA3OTYuOTA4MTksNzAwLjI4MzE3IDMuNzAxMjcsLTMuNzAxMjYgMy44MTE3NCwzLjgxMTc1IC0wLjAxODksMi4yMDMzNiAtMS44NTIzNCwwIDAsMy44NTQzIC0zLjgwMjMzLDAgMCwtMy45NzEwOCAtMS44NTM2LDAgeiIKICAgICAgICAgaWQ9InBhdGg0Nzc3IgogICAgICAgICBzdHlsZT0iZmlsbDojMDA2NmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgogICAgICA8cGF0aAogICAgICAgICBkPSJtIDgwMC42MDk0Niw2OTguMDAyNDQgMy40Njk4NiwzLjQzODY1IC0yLjU3MDIsMCAwLDQuMDc0MzYgLTEuNzM2MiwwIDAsLTQuMDc0MzYgLTIuNjE3NTQsLTMuNmUtNCB6IgogICAgICAgICBpZD0icGF0aDQ3NzkiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K";

    function tagThings () {
        //.length
        $(".assign").find(".activityinstance").addClass("custom_activity").addClass("custom_activity_1");
        $(".assignment").find(".activityinstance").addClass("custom_activity").addClass("custom_activity_2");

        //El link de la entrega tindra aquesta classe
        $(".custom_activity").find("a").addClass("instance_url");

        $(".custom_activity").find(".activityicon").addClass("single_check");
    }

    function addCSS () {
        $("<style>").text(".activity_done {background-color:#80FF80}").appendTo("head");
        $("<style>").text(".activity_passed {background-color:#FF9999}").appendTo("head");
        $("<style>").text(".activity_pending {background-color:#FFFF00}").appendTo("head");
        $("<style>").text(".activity_unknown {background-color:#C0C0C0}").appendTo("head");

        $("<style>").text(".quick_info>* {margin-left:3px;margin-right:3px}").appendTo("head");
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
            
            //Necessita estar qui, per que quan s'executa main, aixo encara no existeix.
            node.find(".tab_check").click(function () {
                total = 0;
                count = 0;
                populateSection($(this).closest(".yui3-tab-panel"));
            });
        });
        
        //Per que el clic a la imatge de la activitat no tingui cap efecte
        $(".single_check").each(function () {
            $(this).prependTo($(this).parent().parent());
            $(this).wrap($("<a>").prop("title", "Comprova aquesta activitat").prop("href", "javascript:void(0)"));
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

        //Percentatge
        $("#page").before(
            $("<div>")
            .prop("align", "center")
            .css("width", "100%")
            .css("position", "fixed")
            .css("z-index", "999")
            .append(
                $("<div>")
                .prop("id", "progress_aligner")
                .prop("align", "left")
                .append(
                    $("<div>")
                    .prop("id", "progress_container")
                    .hide()
                    .append(
                        $("<div>")
                        .prop("id", "progress")
                        .prop("align", "center")
                        .css("height", "15px")
                        .css("background-color", "#1ee713")
                        .css("border-style", "solid")
                        .css("border-width", "2px")
                        .css("border-color", "#17a30f")
                        .css("width", "0%")
                        .append(
                            $("<span>")
                            .prop("id", "progress_display")
                            .text("0%")
                        )
                    )
                )
            )
        );
        $("#progress_aligner").width($("#menuwrap").width());
    }

    function populateActivity (custom_activity_node) {
        custom_activity_node = $(custom_activity_node);

        var  //Aha! Look at me!
        sub_container = custom_activity_node.parent().find(".sub_container"),
        sub_btn = custom_activity_node.find(".sub_btn"),
        quick_info = custom_activity_node.find(".quick_info"),
        instance_url = custom_activity_node.find(".instance_url").prop("href"),

        done = function () {custom_activity_node.addClass("activity_done");},
        pending = function () {custom_activity_node.addClass("activity_pending");},
        passed = function () {custom_activity_node.addClass("activity_passed");},

        fillSubcontainer = function (node) {sub_container.prepend(node);sub_btn.show();};
        
        if (custom_activity_node.hasClass("custom_activity")) {
            console.log("checking activity");

            //Traiem el color
            custom_activity_node
            .removeClass("activity_done")
            .removeClass("activity_passed")
            .removeClass("activity_pending")
            .removeClass("activity_unknown");

            //Amaguem el botó de més info
            sub_btn.hide();

            //Buidem la info
            sub_container.slideUp().empty();
            quick_info.empty();

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
                count += 1;
                updateProgress();
                var page = $($.parseHTML(data));
                
                if (custom_activity_node.hasClass("custom_activity_1")) {
                    if (page.find(".submissionstatussubmitted").length > 0) {
                        if (page.find(".plugincontentsummary").length === 0) {
                            pending();
                        } else {
                            done();
                            if (page.find(".feedbacktable").length > 0) {
                                fillSubcontainer(page.find(".feedbacktable"));
                            }
                        }
                    } else {
                        if (page.find(".overdue").length > 0) {
                            passed();
                        } else {
                            pending();
                            var remaining = page.find(".lastrow").find(".lastcol").text();
                            quick_info.append($("<span>").text("[Temps restant: " + remaining + " ]"));
                            quick_info.append(
                                $("<a>")
                                .prop("target", "_blank")
                                .prop("href", instance_url + "#autotramesa")
                                .text("Trametre ")
                                .append(
                                    $("<img>")
                                    .prop("src", external_img_src)
                                )
                            );
                        }
                    }
                }

                if (custom_activity_node.hasClass("custom_activity_2")) {
                    if (page.find(".files").find("a").length > 0) {
                        done();
                        if (page.find(".feedback").length > 0) {
                            fillSubcontainer(page.find(".feedbacktable"));
                        }
                    } else {
                        pending();
                        var date = page.find(".c1").eq(1).text();
                        if (date !== "") {
                            quick_info.append($("<span>").text("[Data d'entrega: " + date + " ]"));
                            quick_info.append(
                                $("<a>")
                                .prop("target", "_blank")
                                .prop("href", instance_url + "#autotramesa")
                                .text("Trametre ")
                                .append(
                                    $("<img>")
                                    .prop("src", external_img_src)
                                )
                            );
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
                total += 1;
            });
        }
    }

    function populateTab (tab_node) {
        console.log("checking tab");
        var tab_position = $(tab_node).prevAll().length;
        var section = $("[id*='section-']")[tab_position];
        
        populateSection(section);
    }

    function updateProgress () {
        var percent = (count / total) * 100;

        var percent_str = percent.toString(), percent_dot = percent_str.indexOf(".");
        if (percent_dot > 0) {
            percent_str = percent_str.slice(0, percent_dot);
        }
        percent_str = percent_str + "%";
        
        if (percent > 0 && percent < 100) {
            console.log("update progress:", percent);
            $("#progress_container").show();
            $("#progress").css("width", percent_str);
            $("#progress_display").text(percent_str);
        } else {
            $("#progress_container").hide();
        }
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
        
        $(".single_check").click(function () {
            populateActivity($(this).closest(".custom_activity"));
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

    main();
};

var autotramesa = function () {
    function main () {
        if ($(".portfolio-add-link").length === 0 && window.location.hash === "#autotramesa") {
            $("form").find("input").first().click();
        }
    }

    main();
};

var autoresource = function () {
    function main () {
        if ($(".resourceworkaround").length > 0) {
            window.location.href = $(".resourceworkaround").find("a").prop("href");
        }

        if ($(".urlworkaround").length > 0) {
            window.location.href = $(".urlworkaround").find("a").prop("href");
        }
    }

    main();
};

var easter_eggs = function () {
    var valentines = function () {
        var s=document.createElement('style');
        s.innerHTML = "@keyframes hearts {to {font-size:0;}}";
        document.getElementsByTagName('head')[0].appendChild(s);
        
        function heart (x, y, size) {
            var e = document.createElement("div");
            e.innerHTML = "?";
            e.style.fontSize = (size) + "px";
            e.style.color = "red";
            e.style.position = "fixed";
            e.style.top = (y)+"px";
            e.style.left = (x)+"px";
            e.style.marginTop = "0px";
            e.addEventListener("animationend", function () {e.remove();});
            document.body.appendChild(e);
            e.style.MozAnimation = "hearts 3s";
        }
        function randomHeart () {heart(Math.random()*window.screen.width,Math.random()*window.screen.height, 70);}
        randomHeart();
        setInterval(randomHeart, 2000);
        
        var count=0;
        function trail (e) {
            if (count > 5) {
                count = 0;
                heart(e.clientX, e.clientY, 20);
            } else {
                count = count + 1;
            }
            
        }
        window.addEventListener("mousemove", trail);
    };
    var catalonia = function () {
        function flag (x, y, h, w) {
            var e = document.createElement("img");
            e.src = "//upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/200px-Flag_of_Catalonia.svg.png";
            e.style.position = "fixed";
            e.style.top = (y) + "px";
            e.style.left = (x) + "px";
            e.style.height = (h) + "px";
            e.style.width = (w) + "px";
            e.style.display = "block";
            e.style.transformOrigin = "0 0";
            document.body.appendChild(e);
            return e;
        }
        flag(0, 0, 30, window.screen.width);
        flag(30, 0, 30, window.screen.height).style.transform = "rotate(90deg)";
    };
    
    var dateObject = new Date();
    var day = dateObject.getDate();
    var month = dateObject.getMonth()+1;
    var year = dateObject.getFullYear();
    
    if (day == 14 && month == 2) {valentines();}  //san valentin
    if (day == 11 && month == 9) {catalonia();}  //diada de catalunya
};

function main () {
    $(document).ready(function () {
        easter_eggs();

        var url = window.location.href;

        if (/.*/.test(url)) {  //Silly, pero mantenim l'estil
            console.log("main");
            timetable();
        }

        if (/\/course\//.test(url)) {
            console.log("course");
            activity_checker();
            folders();
        }

        if (/mod\/assign\//.test(url)) {
            console.log("mod assign");
            autotramesa();
        }

        if (/mod\/url\//.test(url) || /mod\/resource\//.test(url)) {
            console.log("resource");
            autoresource();
        }
    })
}

main();