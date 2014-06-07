function valentines () {
    var s=document.createElement('style');
    s.innerHTML = "@keyframes hearts {to {font-size:0;}}";
    document.getElementsByTagName('head')[0].appendChild(s);
    
    function heart (x, y, size) {
        var e = document.createElement("div");
        e.innerHTML = "♥";
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
    function randomHeart () {
        heart(
            Math.random()*window.screen.width,
            Math.random()*window.screen.height,
            70);
    }
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
}

function catalonia () {
    function flag (x, y, h, w) {
        var e = document.createElement("img");
        e.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACFCAYAAAAenrcsAAAABmJLR0QA/wD/AP+gvaeTAAABzElEQVR4nO3csU0DQRBAUQ6OwDIBQkTQDjU4pSlaoQGqQEgOnRICMhbQAPvTu+C9Cib52glGO532m98z4F/nSw8AayYQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgTAfXy+WngFWa3q7uXPuDgNWLAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAjz9ePX0jPAak1+d4cxKxYEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAiE6bC7dc0LA353h2DFgiAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgTB9vmxd88LAfHn/s/QMsFpWLAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEwfx80AiM+r4bg+YAgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEwbx+OS88AqzWd9hvn7jBgxYIgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEwvz9tlp4BVsvv7hCsWBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBCmj+cr17ww4Hd3CFYsCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCH+bnCV7VJfjPQAAAABJRU5ErkJggg==";
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
}

function aprilFools () {
    // https://github.com/seutje/aprilFools.css
    var _default = "@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}@keyframes fall{0%{transform:none;}100%{transform:rotateX(-90deg);}}",
        
        image_flip = "img{transform:rotate(180deg);}",
        spin_image = "img {animation: spin 1s linear infinite;}",
        comic_sans = "* {font-family: 'Comic Sans MS', cursive !important;}",
        foggy_text = "* {text-shadow: 0 0 0.3em rgba(0, 0, 0, 1);}",
        invisible_selection = "::-moz-selection{color:rgba(0, 0, 0, 0);}::selection{color:rgba(0, 0, 0, 0);}",

        upside_down = "body{transform:rotate(180deg);}",
        fall = "html, body {height: 100%;}html {-moz-perspective: 1000;}body {transform-origin: bottom center;transform: rotateX(-90deg);animation: fall 1.5s ease-in;}",
        spin_page = "body{animation:spin 5s linear infinite;}",
        no_final = [image_flip, spin_image, comic_sans, foggy_text, invisible_selection],
        yes_final = [upside_down, fall, spin_page];

    function getRandom(min, max){return  Math.floor(Math.random()*(max-min)+min);}

    var styles = [];
    if (getRandom(0, 2)) {
        styles.push(yes_final[getRandom(0, yes_final.length)]);
    } else {
        var howMany = getRandom(2, 4);
        do {
            var index = getRandom(0, yes_final.length);
            styles.push(no_final[index]);
            styles = styles.filter(function(el, idx){if (idx !== index) {return el;}});
        } while (styles.length < howMany);
    }

    var css = _default + styles.join("");
    console.log(css);

    var s=document.createElement('style');
    s.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(s);

    return css;
}

function main () {
    var dateObject = new Date(),
        day = dateObject.getDate(),
        month = dateObject.getMonth()+1,
        year = dateObject.getFullYear();

    if (day == 14 && month ==  2) {valentines();}  //san valentin
    if (day == 11 && month ==  9) {catalonia();}  //diada de catalunya
    if (day ==  1 && month ==  4) {aprilFools();}  //sants innocents
}

module.exports.catalonia = catalonia;
module.exports.valentines = valentines;
module.exports.aprilFools = aprilFools;
module.exports.main = main;