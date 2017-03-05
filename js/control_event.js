function inicio(){
	// Esta funcion se llama al cargar por primera vez la aplicación
	if (sessionStorage.getItem("USUARIO")){
		const US=JSON.parse(sessionStorage.getItem("USUARIO"));
		if(US.tipo=="admin"){
			cargarLayout(document.getElementById("idMenu"), NAVADMIN, uiNavAdmin);
			cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
		}else{
			cargarLayout(document.getElementById("idMenu"), NAV, uiNav);
			cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
		}
	}else{
		cargarLayout(document.getElementById("central"), INICIO, uiLoguear);
	}
	
}

function onClick_LogIn(){
	//Esta funcion carga el log in
	cargarLayout(document.getElementById("central"), LOGIN, uiLogin);
}
function onClick_salir(){
	sessionStorage.removeItem("USUARIO");
	sessionStorage.removeItem("JUEGO");
	sessionStorage.removeItem("PLAYERS");
	sessionStorage.removeItem("PUNTOS");
	sessionStorage.removeItem("PONEDOR");
	sessionStorage.removeItem("SKATE");
	cargarLayout(document.getElementById("central"), LOGIN, uiLogin);
	document.getElementById("idMenu").innerHTML="";


}
function onClick_Regis(){
	//Carga elformulario de registro
	cargarLayout(document.getElementById("central"), REGISTRO, uiRegistrar);
}
function onClick_Entrar_cb(validado){
	if (validado){
		const US=JSON.parse(sessionStorage.getItem("USUARIO"));
		if(US.tipo=="admin"){
			cargarLayout(document.getElementById("idMenu"), NAVADMIN, uiNavAdmin);
			cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
		}else{
			cargarLayout(document.getElementById("idMenu"), NAV, uiNav);
			cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
		}
	}else {
		mensaje("Error","Usuario incorrecto");
	}
}
function onClick_Entrar(){
	//carga la interface del usuario
	const us=document.getElementById("usuario").value;
	const pw=document.getElementById("pass").value;
	if(us.length>0 && pw.length>0){
		BBDDvalidateUser(us, pw, onClick_Entrar_cb);
	}
}
let newUsuario=false;
let recargar=false;
function onBlur_validateUsuario(e) {
    let validado=true;
    if (DEBUG) console.log("Blur:"+e)

    let ui=document.getElementById("nombre");
    if (ui.value.length){ui.style.background="green";validado&=true;}
    else {ui.style.background="red";validado&=false};

    ui=document.getElementById("usuario");
    if (ui.value.length){ui.style.background="green";validado&=true;}
    else {ui.style.background="red";validado&=false};

    /* comprobar claves iguales*/
    ui=document.getElementById("pass1");
    let ui1=document.getElementById("pass2");
    if (ui1.value===ui.value && ui1.value.length){ui.style.background="green";ui1.style.background="green";validado&=true;}
    else {ui.style.background="red";ui1.style.background="red";validado&=false};

    ui=document.getElementById("mail");
    if (ui.value.length && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/.test(ui.value.toUpperCase())){ui.style.background="green";validado&=true;}
    else {ui.style.background="red";validado&=false};

    ui=document.getElementById("crear");
    if(validado) {ui.disabled="";}
    else {ui.disabled="disabled";}

} 

function onClick_grabarUsuario(recargar) {
    // if (DEBUG) console.log("Grabar:"+e);
    setUser(new User(
        document.getElementById("usuario").value,
        document.getElementById("pass1").value,
        document.getElementById("mail").value,
        document.getElementById("nombre").value,
        hechos=[],
        pendientes=[]
    ),true);
    if (recargar)//recargar el central solo cuando se crea un nuevo usuario desde la gestión
        cargarLayout(document.getElementById("central"), LOGIN, uiLogin);
    newUsuario=false;
}

function onClick_Probar(){
	alert("El modo de prueba estrá disponible el 3 de junio");
}
function onClick_editarPerfil(){
	cargarLayout(document.getElementById("central"), PERFIL, uiEditar);
}
function onClick_editarP(){
	cargarLayout(document.getElementById("pendientes"), PENDIENTESE, uiPendientesE);
}
function onClick_editarH(){
	cargarLayout(document.getElementById("hechos"), HECHOSE, uiHechosE);
}

function onClick_eliminarP(){
	let nHijos=(document.getElementById("resultPEdit").children.length)/2;
	let selecion=[];
	for(let i=0; i<nHijos; i++){
		if(document.getElementById("truco"+i).checked==true){
			selecion.push(document.getElementById("truco"+i).value);
		}
	}
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	for(let i=0; i<selecion.length;i++){
		let num=US.pendientes.length;

		for(let j=0; j<num; j++){
			if(selecion[i]==US.pendientes[j]){

					US.pendientes.splice(j, 1);break				
			}
		}
	}setUser(US,newUsuario);
	cargarLayout(document.getElementById("pendientes"), PENDIENTESE, uiPendientesE);
}

function onClick_eliminarH(){
	let nHijos=(document.getElementById("resultHEdit").children.length)/2;
	let selecion=[];
	for(let i=0; i<nHijos; i++){
		if(document.getElementById("truco"+i).checked==true){
			selecion.push(document.getElementById("truco"+i).value);
		}
	}
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	for(let i=0; i<selecion.length;i++){
		let num=US.hechos.length;

		for(let j=0; j<num; j++){
			if(selecion[i]==US.hechos[j]){

					US.hechos.splice(j, 1);break;		
			}
		}
	}setUser(US,newUsuario);
	cargarLayout(document.getElementById("hechos"), HECHOSE, uiHechosE);
}

function onClick_mover(){
	let nHijos=(document.getElementById("resultPEdit").children.length)/2;
	let selecion=[];
	for(let i=0; i<nHijos; i++){
		if(document.getElementById("truco"+i).checked==true){
			selecion.push(document.getElementById("truco"+i).value);
		}
	}
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	for(let i=0; i<selecion.length;i++){
		let num=US.hechos.length;

		for(let j=0; j<num; j++){
			if(selecion[i]==US.hechos[j]){
				mensaje("Atención","Truco ya existente"+slecion[i]);				
			}else{
				US.hechos.push(selecion[i]);
				US.pendientes.splice(j, 1);
			}
		}
	}US.hechos=eliminarDuplicados(US.hechos);
	setUser(US,newUsuario);
	cargarLayout(document.getElementById("pendientes"), PENDIENTESE, uiPendientesE);
}

function onClick_modificar(){
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	setUser(new User(
		US.user,
        document.getElementById("pass1").value,
        document.getElementById("mail").value,
        document.getElementById("nombre").value,
        US.hechos,
        US.pendientes
    ),false);
    cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
}
/*eventos de nav*/
function onClick_admin(){
	cargarLayout(document.getElementById("central"), ADMIN, uiAdmin);
}
function onClick_perfil(){
	cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
}

function onClick_trick(){
	cargarLayout(document.getElementById("central"), TRICK, uiTrick);
	cargarJSON(uiTrickDiv);

}
function onClick_skate(){
	cargarLayout(document.getElementById("central"), SKATE, uiSkate);
}
/*fin nav*/

function onClick_addT(){
	setTrick(new Truco(
		document.getElementById("nombreTruco").value,
		document.getElementById("linkTruco").value		
		));
	document.getElementById("nombreTruco").value="";
	document.getElementById("linkTruco").value="";
}

function onClick_addP(){
	let nHijos=((document.getElementById("trucos").children.length)/3)-1;
	let selecion=[];
	for(let i=0; i<=nHijos; i++){
		if(document.getElementById("truco"+i).checked==true){
			selecion.push(document.getElementById("truco"+i).value);
		}
	}
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	for(let i=0; i<selecion.length;i++){
		let num=US.pendientes.length;
	if(num==0){
		if(selecion[i]==US.pendientes[0]){
				mensaje("Atención",selecion[i]+" ya existente");	
			}else{
				US.pendientes.push(selecion[i]);
			}
	}else{
		for(let j=0; j<num; j++){
			if(selecion[i]==US.pendientes[j]){
				mensaje("Atención",selecion[i]+" ya existente");	
			}else{
				US.pendientes.push(selecion[i]);
			}
		}
	}
	}
	US.pendientes=eliminarDuplicados(US.pendientes);
	setUser(US,newUsuario);
	cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
}
function onClick_addH(){
	let nHijos=((document.getElementById("trucos").children.length)/3)-1;
	let selecion=[];
	for(let i=0; i<=nHijos; i++){
		if(document.getElementById("truco"+i).checked==true){
			selecion.push(document.getElementById("truco"+i).value);
		}
	}
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	for(let i=0; i<selecion.length;i++){
		let num=US.hechos.length;
	if(num==0){
		if(selecion[i]==US.hechos[0]){
				mensaje("Atención",selecion[i]+" ya existente");	
			}else{
				US.hechos.push(selecion[i]);
			}
	}else{
		for(let j=0; j<num; j++){
			if(selecion[i]==US.hechos[j]){
				mensaje("Atención",selecion[i]+" ya existente");	
			}else{
				US.hechos.push(selecion[i]);
			}
		}
	}
	}
	US.hechos=eliminarDuplicados(US.hechos);
	setUser(US,newUsuario);
	cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
}
function eliminarDuplicados(arr) {
	let i;
	let len=arr.length;
	let  out=[];
	let  obj={};

	 for (i=0;i<len;i++) {
	 	obj[arr[i]]=0;
	 }
	 for (i in obj) {
	 	out.push(i);
	 }
	 return out;
}
function onClick_trucoVideo(event){
	
	if(document.getElementById(event.target.className).className=="video"){
	document.getElementById(event.target.className).className="videoNo";
	}else{
		document.getElementById(event.target.className).className="video";
	}

}
function onClick_addPlayer(){//No se está implementado

	let nHijos=((document.getElementById("playerDiv").children.length)-6)/2;

	let input=document.createElement("INPUT");
	input.setAttribute("id", nHijos+1);
	document.getElementById("playerDiv").insertBefore(input, document.getElementById("addPlayer"));
}
function onBlur_players(){
	getUsers(autoComplet);
}
function onClick_play(){
	let us=document.getElementById("player1").value;
	getUsers(play, us);
}
function play(us){
	if (us==""||us==null||us==undefined) {
		document.getElementById("player1").style.borderColor="red";
	}else{
		// document.getElementById("play").className=us;
		console.log('play us'+us[0].hechos);
		cargarLayout(document.getElementById("skateDiv"), CARGAR, uiCarga(us));
	}
}
function cargarD(usuario){
	/* preparar los trucos*/
	console.log('cargarD '+usuario[0].user);
	let contrincanteH=usuario[0].hechos;
	console.log(contrincanteH);
	let aspiranteH=JSON.parse(sessionStorage.getItem("USUARIO")).hechos;
	let mezclaH=contrincanteH.concat(aspiranteH);
	let contrincanteP=usuario[0].pendientes;
	let aspiranteP=JSON.parse(sessionStorage.getItem("USUARIO")).pendientes;
	let mezclaP=contrincanteP.concat(aspiranteP);
	let mezcla=mezclaH.concat(mezclaP);
	mezcla=eliminarDuplicados(mezcla);
	if(mezcla.length<5){

		mensaje(i18n["PROGRESA"], i18n["APRENDEJ"]);
		cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
	}else{
		sessionStorage.setItem("SKATE", JSON.stringify(mezcla));
		/*preparar los usuarios*/
		let players=[usuario[0].user, JSON.parse(sessionStorage.getItem("USUARIO")).user];
		console.log(players);
		sessionStorage.setItem("PLAYERS", JSON.stringify(players));
		/*cargar layout del juego*/
		cargarLayout(document.getElementById("central"),JUEGO, uiJuego);
	}
}
function onClick_noTruco(){
	//comprobar puntuacion
	//pierde el turno y el truco se queda
	let ponedor= JSON.parse(sessionStorage.getItem("PONEDOR")).ponedor;
	let juego= JSON.parse(sessionStorage.getItem("JUEGO"));
	if(ponedor==juego.turno){
		let players= JSON.parse(sessionStorage.getItem("PLAYERS"));
		let skate=JSON.parse(sessionStorage.getItem("SKATE"));
		let randTruco=skate[Math.floor(Math.random()*skate.length)];
		let nombre;
		for (i in players){
				if(players[i]!=juego.turno){
					nombre=players[i];
				}
		}
		sessionStorage.setItem("JUEGO", JSON.stringify({"turno":nombre, "truco":randTruco}));
		sessionStorage.setItem("PONEDOR", JSON.stringify({"ponedor":nombre}));		
	}else{

		let puntos= JSON.parse(sessionStorage.getItem("PUNTOS"));
		if(puntos[0][1]==4){
			mensaje("Has ganado", "Ha ganado "+puntos[1][0]);
			cargarLayout(document.getElementById("central"), SKATE, uiSkate);
		}else{
			if(puntos[1][1]==4){
			mensaje("Has ganado", "Ha ganado "+puntos[0][0]);
			cargarLayout(document.getElementById("central"), SKATE, uiSkate);
		}else{
		if(puntos[0][0]==juego.turno){
			puntos[0][1]++;
			sessionStorage.setItem("PUNTOS", JSON.stringify(puntos));
		}
		if(puntos[1][0]==juego.turno){
			puntos[1][1]++;
			sessionStorage.setItem("PUNTOS", JSON.stringify(puntos));
		}
		let players= JSON.parse(sessionStorage.getItem("PLAYERS"));
		let skate=JSON.parse(sessionStorage.getItem("SKATE"));
		let randTruco=skate[Math.floor(Math.random()*skate.length)];
		let nombre;
		for (i in players){
				if(players[i]!=juego.turno){
					nombre=players[i];
				}
		}
		sessionStorage.setItem("JUEGO", JSON.stringify({"turno":nombre, "truco":randTruco}));
		sessionStorage.setItem("PONEDOR", JSON.stringify({"ponedor":nombre}));
		//falta sumar letra
		}
	}
}	//cargar datos en div usuario y truco utilizando el session Juego y skate
	actualizarDatos();
}
function onClick_truco(){
	//se queda el turno y el truco se quita
	let ponedor= JSON.parse(sessionStorage.getItem("PONEDOR")).ponedor;
	let juego= JSON.parse(sessionStorage.getItem("JUEGO"));

	if(ponedor==juego.turno){
		let trucos= JSON.parse(sessionStorage.getItem("SKATE"));
		let juego= JSON.parse(sessionStorage.getItem("JUEGO"));
		let players= JSON.parse(sessionStorage.getItem("PLAYERS"));
		let nombre;
		for (i in players){
				if(players[i]!=juego.turno){
					nombre=players[i];
				}
		}
		sessionStorage.setItem("JUEGO", JSON.stringify({"turno":nombre, "truco":juego.truco}));
		for (i in trucos){
				if(trucos[i]==juego.truco){
					trucos.splice(i, 1);
				}
		}
		let randTruco=trucos[Math.floor(Math.random()*trucos.length)];
		sessionStorage.setItem("SKATE", JSON.stringify(trucos));
		if (trucos.length==0){
			let puntos= JSON.parse(sessionStorage.getItem("PUNTOS"));
		if(puntos[0][1]>puntos[0][0]){
			mensaje("Has ganado", "Ha ganado "+puntos[0][0]);
			cargarLayout(document.getElementById("central"), SKATE, uiSkate);
		}else{
			if(puntos[1][1]>puntos[0][1]){
			mensaje("Has ganado", "Ha ganado "+puntos[1][0]);
			cargarLayout(document.getElementById("central"), SKATE, uiSkate);
			}else{
				if(puntos[1][1]==puntos[0][1]){
			mensaje("Fin", "Empate");
			cargarLayout(document.getElementById("central"), SKATE, uiSkate);
			}
			}
		}
	}
	}
	else{
		let trucos= JSON.parse(sessionStorage.getItem("SKATE"));
		let juego= JSON.parse(sessionStorage.getItem("JUEGO"));
		let players= JSON.parse(sessionStorage.getItem("PLAYERS"));
		let nombre;
		for (i in players){
				if(players[i]!=juego.turno){
					nombre=players[i];
				}
		}
		sessionStorage.setItem("JUEGO", JSON.stringify({"turno":nombre, "truco":juego.truco}));
		sessionStorage.setItem("PONEDOR", JSON.stringify({"ponedor":nombre}));
		for (i in trucos){
				if(trucos[i]==juego){
					trucos.splice(i, 1);
					
				}
		}
		let randTruco=trucos[Math.floor(Math.random()*trucos.length)];
		
		sessionStorage.setItem("SKATE", JSON.stringify(trucos));
	}
	//cargarLayout en div truco utilizando el session skate random
	actualizarDatosT();
}
