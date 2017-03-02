function uiLoguear(){
	// Añade los eventos a los botones del inicio login y probar
	/*traducción*/
	document.getElementById("botonLog").value=i18n["LOGIN"];
	document.getElementById("botonPrueba").value=i18n["PROBAR"];
	/*eventos*/
	document.getElementById("botonLog").addEventListener("click", onClick_LogIn);
	document.getElementById("botonPrueba").addEventListener("click", onClick_Probar);
}
function uiSalir(){
	document.getElementById("salirbtn").addEventListener("click", onClick_salir);
	document.getElementById("salirbtn").value=i18n["SALIR"];
}

function uiLogin(){
	//Añade los eventos de entar en la cuenta o crear una cuenta
	/*traducción*/
	document.getElementById("entrar").value=i18n["LOGIN"];
	document.getElementById("regis").value=i18n["REGISTRO"];
	document.getElementById("usuario").setAttribute("placeholder",i18n["USUARIO"]);
	document.getElementById("pass").setAttribute("placeholder",i18n["PASS"]);
	/*eventos*/
	document.getElementById("entrar").addEventListener("click", onClick_Entrar);
	document.getElementById("regis").addEventListener("click", onClick_Regis);
}

function uiRegistrar(){
/*traducción*/
	document.getElementById("usuario").setAttribute("placeholder",i18n["USUARIO"]);
	document.getElementById("nombre").setAttribute("placeholder",i18n["NOMBRE"]);
	document.getElementById("pass1").setAttribute("placeholder",i18n["PASS"]);
	document.getElementById("pass2").setAttribute("placeholder",i18n["PASS"]);
	document.getElementById("mail").setAttribute("placeholder",i18n["MAIL"]);
	document.getElementById("crear").value=i18n["CREAR"];

		/*eventos*/
	document.getElementById("usuario").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("nombre").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("pass1").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("pass2").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("crear").addEventListener("click",onClick_grabarUsuario);
}
function uiNav(){
	/*traducción*/
	document.getElementById("perfil").innerText=i18n["PERFIL"];
	document.getElementById("entrenar").innerText=i18n["ENTRENAR"];
	document.getElementById("skate").innerText=i18n["SKATEP"];
	document.getElementById("tricklist").innerText=i18n["TRICKLIST"];
	/*eventos*/
	document.getElementById("perfil").addEventListener("click", onClick_perfil);
	document.getElementById("tricklist").addEventListener("click", onClick_trick);
	document.getElementById("skate").addEventListener("click", onClick_skate);

}
function uiPerfil(){

	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	document.getElementById("nombre").innerHTML=US.user;

	for (let  i in US.pendientes) {
		document.getElementById("resultP").innerHTML+="<p>"+US.pendientes[i]+"</p>";
	}
	for (let  i in US.hechos) {
		document.getElementById("resultH").innerHTML+="<p>"+US.hechos[i]+"</p>";
	}
	
	document.getElementById("defaultOpen").click();//esto lanza por defecto los trucos pendientes
	document.getElementById("editarP").addEventListener("click", onClick_editarP);
	document.getElementById("editarH").addEventListener("click", onClick_editarH);

	/*traducion*/
	document.getElementById("editar").value=i18n["EDITAR"];
	document.getElementById("editarP").value=i18n["EDITAR"];
	document.getElementById("editarH").value=i18n["EDITAR"];
	document.getElementById("pendientesTxt").innerHTML=i18n["PENDIENTE"];
	document.getElementById("hechosTxt").innerHTML=i18n["HECHOS"];
	document.getElementById("defaultOpen").innerHTML=i18n["PENDIENTE"];
	document.getElementById("aHechos").innerHTML=i18n["HECHOS"];
	
	
}
/*tabs del perfil*/
function openList(evt, listName){
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(listName).style.display = "block";
    evt.currentTarget.className += " active";
}

function uiPendientesE(){
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	document.getElementById("nombre").innerHTML=US.user;
	for (let  i in US.pendientes) {
		document.getElementById("resultPEdit").innerHTML+="<input type='checkbox' name='truco' id='truco"+i+"' value='"+
															US.pendientes[i]+"'>"+US.pendientes[i]+"<br/>";
	}

	/*traduccion*/
	document.getElementById("quitar").value=i18n["QUITAR"];
	document.getElementById("hecho").value=i18n["HECHO"];
	document.getElementById("cancelar").value=i18n["CANCELAR"];
	
	/*eventos*/
	document.getElementById("quitar").addEventListener("click", onClick_eliminarP);
	document.getElementById("hecho").addEventListener("click", onClick_mover);
	document.getElementById("cancelar").addEventListener("click", onClick_perfil);
}

function uiHechosE(){
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	document.getElementById("nombre").innerHTML=US.user;
	for (let  i in US.hechos) {
		document.getElementById("resultHEdit").innerHTML+="<input type='checkbox' name='truco' id='truco"+i+"' value='"+
															US.hechos[i]+"'>"+US.hechos[i]+"<br/>";
	}

	/*traduccion*/
	document.getElementById("quitarH").value=i18n["QUITAR"];
	document.getElementById("cancelar").value=i18n["CANCELAR"];
	
	/*eventos*/
	document.getElementById("quitarH").addEventListener("click", onClick_eliminarH);
	document.getElementById("cancelar").addEventListener("click", onClick_perfil);
}
function uiTrick(){
	document.getElementById("addP").addEventListener("click", onClick_addP);
	document.getElementById("addH").addEventListener("click", onClick_addH);

	document.getElementById("addP").value=i18n["PENDIENTE"];
	document.getElementById("addH").value=i18n["HECHO"];

}

function uiTrickDiv(trucos){

	for (let  i in trucos) {
		document.getElementById("trucos").innerHTML+="<input type='checkbox' name='truco' id='truco"+i+"' value='"+
													trucos[i].nombre+"'>"+trucos[i].nombre+"<input type='submit' id='ver"+i+"'class='video"+i
													+"' value='ver' onClick='onClick_trucoVideo(event)'><br/>";
		document.getElementById("video").innerHTML+="<div id='video"+i+"' class='videoNo'>"+trucos[i].link+"<br/></div>";
		// document.getElementById("ver"+i).addEventListener("click", onClick_trucoVideo);
	}

}

function uiSkate(){
	document.getElementById("play").value=i18n["COMENZAR"];
	document.getElementById("addPlayer").value=i18n["ADDPLUS"];
	let US=JSON.parse(sessionStorage.getItem("USUARIO"));
	document.getElementById("player0").innerHTML=US.name;

	document.getElementById("addPlayer").addEventListener("click", onClick_addPlayer);
	document.getElementById("play").addEventListener("click", onClick_play);
}
