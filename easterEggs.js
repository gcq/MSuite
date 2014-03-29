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

function main () {
    var dateObject = new Date(),
        day = dateObject.getDate(),
        month = dateObject.getMonth()+1,
        year = dateObject.getFullYear();

    if (day == 14 && month == 2) {valentines();}  //san valentin
    if (day == 11 && month == 9) {catalonia();}  //diada de catalunya
}

module.exports.catalonia = catalonia;
module.exports.valentines = valentines;
module.exports.main = main;