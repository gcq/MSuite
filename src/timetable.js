var $ = require("jQuery");


// - - - VARIABLES - - - //

//Es pot expandir, només cal tenir en compte mantenir la estructura com ara.
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
    ],

//Es faran servir d'ara endavant per referisr-se a les assignatures
//Plantilla: "id": ["nom llarg", "direcció web"],
//Si no te web deixar ""
    x_id = {
        "m04": ["SO xarxes", "/course/view.php?id=329"],
        "m06": ["Seguretat", "/course/view.php?id=50"],
        "m07": ["Serveis", "/course/view.php?id=301"],
        "m08a": ["WebApp (M)", "/course/view.php?id=310"],
        "m08b": ["WebApp (C)", "/course/view.php?id=310"],
        "m10": ["Empresa", "/course/view.php?id=413"],
        "tut": ["Tutoria", "/course/view.php?id=324"],
        "pti": ["Pati", "http://xkcd.com"]
    },

//Aquesta és la informació de la taula de l'horari.
//La primera hora correspon a la primera classe de cada dia.
    horari = {
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
    $("<style>")
    .text("#timetable_table tr>td.current_class{background-color:#8AE62E; border: 3px solid green};")
    .appendTo("head");
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
        //.hide()
    );

    var table = $("#timetable_table"),
        row = $("<tr>").addClass("custom_table_header"),
        dia,
        text;
    
    row.append(  //  Cel·la 0, 0
        $("<td>")
        .css("border", "0px")
        .append(
            $("<span>")
            .text("")
        )
    );
    for (dia in horari) {
        text = $("<span>")
                .css("font-size", "20px")
                .css("font-weight", "bold")
                .text(dia.charAt(0).toUpperCase() + dia.slice(1));
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
        
        row.append(
            $("<td>").
            addClass("custom_table_hour").
            text(hores[hora])
        );
        
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
        var td = $("#timetable_table")
                 .find("tr")
                 .eq(current + 1)
                 .find("td")
                 .eq(date.getDay());
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
    
    updateTable();
    setInterval(updateTable, 1000);
    
    console.log("Timetable ok");
}

module.exports = main;