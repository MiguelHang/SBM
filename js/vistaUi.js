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
	document.getElementById("exitLog").addEventListener("click", inicio);
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
	document.getElementById("exit").addEventListener("click", onClick_LogIn);
	document.getElementById("usuario").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("nombre").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("pass1").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("pass2").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("mail").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("crear").addEventListener("click",function(){
		onClick_grabarUsuario(true);
	});
}
function uiNav(){
	/*traducción*/
	document.getElementById("perfil").innerText=i18n["PERFIL"];
	document.getElementById("skate").innerText=i18n["SKATEP"];
	document.getElementById("tricklist").innerText=i18n["TRICKLIST"];
	document.getElementById("salir").innerText=i18n["SALIR"];
	/*eventos*/
	document.getElementById("perfil").addEventListener("click", onClick_perfil);
	document.getElementById("tricklist").addEventListener("click", onClick_trick);
	document.getElementById("skate").addEventListener("click", onClick_skate);
	document.getElementById("salir").addEventListener("click", onClick_salir);

}
function uiNavAdmin(){
	/*traducción*/
	document.getElementById("addTrick").innerText=i18n["ADD"];
	document.getElementById("perfil").innerText=i18n["PERFIL"];
	document.getElementById("skate").innerText=i18n["SKATEP"];
	document.getElementById("tricklist").innerText=i18n["TRICKLIST"];
	document.getElementById("salir").innerText=i18n["SALIR"];
	/*eventos*/
	document.getElementById("addTrick").addEventListener("click", onClick_admin);
	document.getElementById("perfil").addEventListener("click", onClick_perfil);
	document.getElementById("tricklist").addEventListener("click", onClick_trick);
	document.getElementById("skate").addEventListener("click", onClick_skate);
	document.getElementById("salir").addEventListener("click", onClick_salir);

}
function uiAdmin(){

	document.getElementById("addT").addEventListener("click", onClick_addT);

	/*traduccion*/
	document.getElementById("addT").value=i18n["ADD"];
	document.getElementById("nombreTruco").placeholder=i18n["TRUCO"];
	document.getElementById("linkTruco").placeholder=i18n["LINK"];

}

function uiPerfil(){

	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	document.getElementById("nombre").innerHTML=US.user;
	document.getElementById("stance").innerHTML=US.name;

	for (let  i in US.pendientes) {
		document.getElementById("resultP").innerHTML+="<p>"+US.pendientes[i]+"</p>";
	}
	for (let  i in US.hechos) {
		document.getElementById("resultH").innerHTML+="<p>"+US.hechos[i]+"</p>";
	}
	
	openList();
	document.getElementById("editarP").addEventListener("click", onClick_editarP);
	document.getElementById("editarH").addEventListener("click", onClick_editarH);
	document.getElementById("editar").addEventListener("click", onClick_editarPerfil);

	/*traducion*/
	document.getElementById("editar").value=i18n["EDITAR"];
	document.getElementById("editarP").value=i18n["EDITAR"];
	document.getElementById("editarH").value=i18n["EDITAR"];
	document.getElementById("pendientesTxt").innerHTML=i18n["PENDIENTE"];
	document.getElementById("hechosTxt").innerHTML=i18n["HECHOS"];
	document.getElementById("aPendientes").innerHTML=i18n["PENDIENTE"];
	document.getElementById("aHechos").innerHTML=i18n["HECHOS"];
	
	
}
function uiEditar(){
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	/*traducción*/
	document.getElementById("usuario").value=US.user;
	document.getElementById("usuario").setAttribute("readonly", "true");
	document.getElementById("nombre").setAttribute("placeholder",i18n["NOMBRE"]);
	document.getElementById("nombre").value=US.name;
	document.getElementById("pass1").setAttribute("placeholder",i18n["PASS"]);
	document.getElementById("pass2").setAttribute("placeholder",i18n["PASS"]);
	document.getElementById("mail").setAttribute("placeholder",i18n["MAIL"]);
	document.getElementById("mail").value=US.email;
	document.getElementById("crear").value=i18n["MODIFICAR"];

		/*eventos*/
	document.getElementById("exit").addEventListener("click", onClick_perfil);
	document.getElementById("nombre").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("pass1").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("pass2").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("mail").addEventListener("blur",onBlur_validateUsuario);
	document.getElementById("crear").addEventListener("click", onClick_modificar);
}
/*tabs del perfil*/
function openList(){
	$( function() {
    $( "#tabs" ).tabs();
  } );
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
	getTrick(uiTrickDiv_callBack);
}

function uiTrickDiv_callBack(trucos){
	for (let  i in trucos) {
		let j=(document.getElementById("trucos").children.length)/3;
		console.log(j);
		document.getElementById("trucos").innerHTML+="<input type='checkbox' name='truco' id='truco"+j+"' value='"+
													trucos[i].nombre+"'>"+trucos[i].nombre+"<input type='submit' id='ver"+j+"'class='video"+j
													+"' value='ver' onClick='onClick_trucoVideo(event)'><br/>";
		document.getElementById("video").innerHTML+="<div id='video"+j+"' class='videoNo'>"+trucos[i].link+"<br/></div>";
		// document.getElementById("ver"+i).addEventListener("click", onClick_trucoVideo);
	}
}

function uiSkate(){
	document.getElementById("play").value=i18n["COMENZAR"];
	document.getElementById("skateTxt").innerText=i18n["SKATETXT"];
	document.getElementById("player1").placeholder=i18n["USUARIO"];
	document.getElementById("skateH2").innerText=i18n["SKATEP"];
	// document.getElementById("addPlayer").value=i18n["ADDPLUS"];
	let US=JSON.parse(sessionStorage.getItem("USUARIO"));
	document.getElementById("player0").innerHTML=US.name;
	
	document.getElementById("player1").addEventListener("focus", onBlur_players);
	// document.getElementById("addPlayer").addEventListener("click", onClick_addPlayer);
	document.getElementById("play").addEventListener("click", onClick_play);


}
function mensaje(titulo, contenido){

    let divAlert = document.createElement("div");
    divAlert.setAttribute("id", "ventanaAlert");
    divAlert.setAttribute("title", titulo);
    document.getElementById("contenedor").appendChild(divAlert);

    let mensaje = document.createElement("p");
    mensaje.innerHTML = contenido;
    divAlert.appendChild(mensaje);

    $( function() {
        $( "#ventanaAlert" ).dialog({
            //autoOpen: true,
            dragable:true,
            close: function( event, ui ) {
                $( "#ventanaAlert" ).remove();
            },
            modal: true,
            buttons: {
                Ok: function() {
                    $( "#ventanaAlert" ).remove();
                }
            }

        });
    } );

}


function autoComplet(availableTags){
	let users=[];
	let us=JSON.parse(sessionStorage.USUARIO).user;
	for (i in availableTags) {
		if(availableTags[i].user!==us)
		users.push(availableTags[i].user);
	}
	  $( function() {
    // var availableTags;
    $( "#player1" ).autocomplete({
      source: users
    });
  } );
}

function uiCarga(us){
	console.log('uicarga'+us[0].hechos);
	setTimeout(function(){getUsers(cargarD, us[0].user)}, 1000);
}
function uiJuego(){
	let skate=JSON.parse(sessionStorage.SKATE);
	let players=JSON.parse(sessionStorage.PLAYERS);
	let randTruco=skate[Math.floor(Math.random()*skate.length)];
	let randPlayer=players[Math.floor(Math.random()*players.length)];

	document.getElementById("trucoNow").innerText=randTruco;
	document.getElementById("turnoPlayer").innerText=randPlayer;
	
	let puntos=[];
	puntos[0]=[players[0],0];
	puntos[1]=[players[1],0];
	sessionStorage.setItem("JUEGO", JSON.stringify({"turno":randPlayer, "truco":randTruco}));
	sessionStorage.setItem("PONEDOR", JSON.stringify({"ponedor":randPlayer})); 
	sessionStorage.setItem("PUNTOS", JSON.stringify(puntos)); 

	/*traduccion*/
	document.getElementById("trucoTXT").innerText=i18n["TRUCO"];
	document.getElementById("turnoTXT").innerText=i18n["TURNO"];
	document.getElementById("falseBtn").value=i18n["FALLO"];
	document.getElementById("trueBtn").value=i18n["ACIERTO"];
	/*add eventos*/
	document.getElementById("falseBtn").addEventListener("click", onClick_noTruco);
	document.getElementById("trueBtn").addEventListener("click", onClick_truco);
}
function actualizarDatos(){
	let juego=JSON.parse(sessionStorage.getItem("JUEGO"));

	document.getElementById("trucoNow").innerText=juego.truco;
	document.getElementById("turnoPlayer").innerText=juego.turno;
}
function actualizarDatosT(){
	let juego=JSON.parse(sessionStorage.getItem("JUEGO"));
	let skate=JSON.parse(sessionStorage.SKATE);

console.log("actualizar datos"+juego.truco);
	document.getElementById("trucoNow").innerText=juego.truco;
	document.getElementById("turnoPlayer").innerText=juego.turno;

	let randTruco=skate[Math.floor(Math.random()*skate.length)];
	sessionStorage.setItem("JUEGO", JSON.stringify({"turno":juego.turno, "truco":randTruco}));
}