
// IIFE
function setuppage() {
    var ul = document.getElementById("ullist");
    
    document.getElementById("btnSave").addEventListener("click", function(){
        var game = document.getElementById("game").value;
        var descr = document.getElementById("description").value;
        var date = document.getElementById("date").value;
        
        var regel = "<li>" + game + "</li>";
        
        ul.innerHTML += regel;
        
        }, false);
    
    ul.addEventListener("click", function(){
        var el = window.event.target;
        if (isIE()) {
            el = window.event.srcElement;
        }
        var content = "<h1>" + el.innerText + "</h1><p>" + "" + "</p>";
        document.getElementById("details").innerHTML = content;
                        }, false);

}


function isIE(){
    var ua = window.navigator.userAgent;
    return (ua.indexOf("MSIE ") > 0);
}





