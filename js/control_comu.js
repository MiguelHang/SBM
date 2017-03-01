function cargarLayout(div,url,cblay){
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            div.innerHTML = this.responseText;
            cblay(url);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function limpiarLayout(div){
    div.innerHTML="";
}

function cargarJSON(cb){
    let request = new XMLHttpRequest();
    request.open("GET", "js/trucos.json", true);
    request.send();
    request.onreadystatechange = function() {
      if ( request.readyState === 4 && request.status === 200 ) {
        let my_JSON_object = JSON.parse(request.responseText);
        let trucos=my_JSON_object.trucos;
        cb(trucos);
      }
    }
}