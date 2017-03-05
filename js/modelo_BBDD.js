"use strict";
/*Validar usuario*/
function BBDDvalidateUser(u, p,cb){
    if (DEBUG) console.log(`In_validateUser:${u}-${p}`);
    let validado=false;


    if (!db) return false;
    let customerObjectStore=db.transaction("usuarios", "readwrite").objectStore("usuarios");
    let req=customerObjectStore.get(document.getElementById("usuario").value);
    req.onsuccess=function(event){
        if(event.target.result!=undefined){
        if(event.target.result.pass==Sha256.hash(document.getElementById("pass").value)) validado=true;
        if (validado)
            sessionStorage.setItem("USUARIO",JSON.stringify(event.target.result)); //usuario en JSON en sesion
        else
            sessionStorage.removeItem("USUARIO");
        cb(validado);
    }else{
        cb(validado);
        }
    }
}
/*eliminar usuario de la sesion*/
function BBDDlogout() {
    sessionStorage.removeItem("USUARIO");
}

/*Modificar o crear un usuario*/
function setUser(us,newUsuario){//recibeel objeto ususario y un booleano si en nuevo true
    if (!db) return false;
    let customerObjectStore=db.transaction("usuarios", "readwrite").objectStore("usuarios");
    let req=customerObjectStore.get(us.user);
    req.onsuccess  = function(event) {
        if(event.target.result && newUsuario==true){
            mensaje("Error","user Existete");
        }else{ 
            let md=event.target.result;
            if (md==null && newUsuario) md=us;//cuando creamos uno nuevo
            md.name=us.name;
            md.pass=Sha256.hash(us.pass);
            md.email=us.email;
            md.hechos=us.hechos;
            md.pendientes=us.pendientes;
            let up=customerObjectStore.put(md);
            sessionStorage.setItem("USUARIO", JSON.stringify(event.target.result));
            up.onsuccess=function(){console.log("BBDD_OK");}
            up.onerror=function(){mensaje("Error","BBDD_ERR");}
        }
        
    };
}

function setTrick(us){
    if (!db) return false;
    let customerObjectStore=db.transaction("trucos", "readwrite").objectStore("trucos");
    let req=customerObjectStore.get(us.nombre);
    req.onsuccess  = function(event){
        if(event.target.result){
            mensaje("Error", "Truco ya existente");
        }else{
            let md=event.target.result;
            if(md==null) md=us;
            md.nombre=us.nombre;
            md.link=us.link;
            let up=customerObjectStore.put(md);
            up.onsuccess=function(){console.log("BBDD_OK"); mensaje("correcto", "Truco guardado con exito");}
            up.onerror=function(){mensaje("Error","BBDD_ERR");}
        }
    }
}

/* GUardar Usuarios
function guardarUsuario(){
    let nombre= document.getElementById("nombre").value;
    let usuario= document.getElementById("usuario").value;
    let clave1= document.getElementById("pass1").value;
    let mail= document.getElementById("mail").value;

    let customerObjectStore=db.transaction("usuarios", "readwrite").objectStore("usuarios");
    customerObjectStore.put({"user":usuario,"pass":clave1,"email":mail,"name":nombre});
    alert("Cambios guardados");
}
*/
function getUsers(cb, patron=""){
    if (!db) return false;
    let customerObjectStore=db.transaction("usuarios", "readwrite").objectStore("usuarios");

    let usuarios = [];//fuera obligatorio para que no se reinici cada vez

    customerObjectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        let regPatron=new RegExp(".*","i"); //i ignora mayúsculas y minúsculas
        if (cursor) {
            //solo devolvemos aquellos que cumplen el patrón
            if (patron.length) regPatron=new RegExp("^"+patron,"i"); //cambiar a "^" si solo al principio
            if (cursor.value.user.match(regPatron))
                usuarios.push(cursor.value);
            cursor.continue();
        }
        else {
            cb(usuarios);
        }

    };
}

function getTrick(cb){
    if (!db) return false;
    let customerObjectStore=db.transaction("trucos", "readwrite").objectStore("trucos");

    let trucos = [];//fuera obligatorio para que no se reinici cada vez

    customerObjectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {

            trucos.push(cursor.value);
            cursor.continue();
        }
        else {
            cb(trucos);
        }

    };
}
/*Implementación de la BBDD*/

let db;
let request= indexedDB.open("SBM2", VERSION_BD);
request.onerror = function(event){
	if(DEBUG){
		console.log("BBDD Error");
		mensaje("Error","Error BBDD"+event);
	}
};
request.onsuccess=function(event){
	if(DEBUG){
		console.log("Base de datos abierta");
		db=event.target.result;
	}
};
request.onupgradeneeded=function(event){
	let db2=event.target.result;
	let objetstore=db2.createObjectStore("usuarios", {keyPath: "user"});
    let trucos=db2.createObjectStore("trucos", {keyPath:"nombre"});

	let request=objetstore.put({"user":"a","pass":"ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb","name":"a","email":"a@sbm.com", "hechos":["flip", "ollie"], "pendientes":["heelflip", "impossible"], "tipo":"admin"});

};