function inicio(){
	// Esta funcion se llama al cargar por primera vez la aplicación
	if (sessionStorage.getItem("USUARIO")){
			cargarLayout(document.getElementById("idMenu"), NAV, uiNav);
			cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
			cargarLayout(document.getElementById("salirDiv"), SALIR, uiSalir);
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
	cargarLayout(document.getElementById("central"), LOGIN, uiLogin);
	document.getElementById("idMenu").innerHTML="";


}
function onClick_Regis(){
	//Carga elformulario de registro
	cargarLayout(document.getElementById("central"), REGISTRO, uiRegistrar);
}
function onClick_Entrar_cb(validado){
	if (validado) {
	cargarLayout(document.getElementById("idMenu"), NAV, uiNav);
	cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
	cargarLayout(document.getElementById("salirDiv"), SALIR, uiSalir);
	}else {
		alert("Usuario incorrecto");
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
let newUsuario=true;
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

function onClick_grabarUsuario(e) {
    if (DEBUG) console.log("Grabar:"+e);
    setUser(new User(
        document.getElementById("usuario").value,
        document.getElementById("pass1").value,
        document.getElementById("mail").value,
        document.getElementById("nombre").value,
        hechos=[],
        pendientes=[]
    ),newUsuario);
    if (newUsuario)//recargar el central solo cuando se crea un nuevo usuario desde la gestión
        cargarLayout(document.getElementById("central"), LOGIN, uiLogin);
    alert("Usuario creado correctamente");
    newUsuario=false;
}

function onClick_Probar(){
	alert("El modo de prueba estrá disponible el 3 de junio");
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

					alert(US.pendientes[j]+" ha sido eliminado");
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

					alert(US.hechos[j]+" ha sido eliminado");
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
				alert("truco ya existente");				
			}else{
				US.hechos.push(selecion[i]);
				US.pendientes.splice(j, 1);
			}
		}
	}US.hechos=eliminarDuplicados(US.hechos);
	setUser(US,newUsuario);
	cargarLayout(document.getElementById("pendientes"), PENDIENTESE, uiPendientesE);
}

/*eventos de nav*/
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

function onClick_addP(){
	let nHijos=(document.getElementById("trucos").children.length)/3;
	let selecion=[];
	for(let i=0; i<nHijos; i++){
		if(document.getElementById("truco"+i).checked==true){
			selecion.push(document.getElementById("truco"+i).value);
		}
	}
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	for(let i=0; i<selecion.length;i++){
		let num=US.pendientes.length;
	if(num==0){
		if(selecion[i]==US.pendientes[0]){
				alert(selecion[i]+" ya existente");	
			}else{
				US.pendientes.push(selecion[i]);
			}
	}else{
		for(let j=0; j<num; j++){
			if(selecion[i]==US.pendientes[j]){
				alert(selecion[i]+" ya existente");	
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
	let nHijos=(document.getElementById("trucos").children.length)/3;
	let selecion=[];
	for(let i=0; i<nHijos; i++){
		if(document.getElementById("truco"+i).checked==true){
			selecion.push(document.getElementById("truco"+i).value);
		}
	}
	const US=JSON.parse(sessionStorage.getItem("USUARIO"));
	for(let i=0; i<selecion.length;i++){
		let num=US.hechos.length;
	if(num==0){
		if(selecion[i]==US.hechos[0]){
				alert(selecion[i]+" ya existente");	
			}else{
				US.hechos.push(selecion[i]);
			}
	}else{
		for(let j=0; j<num; j++){
			if(selecion[i]==US.hechos[j]){
				alert(selecion[i]+" ya existente");	
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
	
	console.log(event.target.className);
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
	if (us==""||us==undefined) {
		document.getElementById("player1").style.borderColor="red";
	}else{
		// document.getElementById("play").className=us;
		cargarLayout(document.getElementById("skateDiv"), CARGAR, uiCarga(us));
	}
}
function cargarD(usuario){
	/* preparar los trucos*/
	let contrincanteH=usuario[0].hechos;
	let aspiranteH=JSON.parse(sessionStorage.getItem("USUARIO")).hechos;
	let mezclaH=contrincanteH.concat(aspiranteH);
	let contrincanteP=usuario[0].pendientes;
	let aspiranteP=JSON.parse(sessionStorage.getItem("USUARIO")).pendientes;
	let mezclaP=contrincanteP.concat(aspiranteP);
	let mezcla=mezclaH.concat(mezclaP);
	mezcla=eliminarDuplicados(mezcla);
	sessionStorage.setItem("SKATE", JSON.stringify(mezcla));
	/*preparar los ausuarios*/
	let players=[usuario[0].user, JSON.parse(sessionStorage.getItem("USUARIO")).user];
	sessionStorage.setItem("PLAYERS", JSON.stringify(players));
	/*cargar layout del juego*/
	cargarLayout(document.getElementById("central"),JUEGO, uiJuego);
}
function onClick_noTruco(){
	//pierde el turno y el truco se queda
	let juego= JSON.parse(sessionStorage.getItem("JUEGO"));
	let players= JSON.parse(sessionStorage.getItem("PLAYERS"));
	let skate=JSON.parse(sessionStorage.getItem("SKATE"));
	let randTruco=skate[Math.floor(Math.random()*skate.length)];
	let nombre;
	for (i in players){
			if(players[i]!=juego.usuario){
				nombre=players[i];
			}
	}
	sessionStorage.setItem("JUEGO", JSON.stringify({"usuario":nombre, "truco":randTruco}));
	//cargar datos en div usuario y truco utilizando el session Juego y skate
	actualizarDatos();
}
function onClick_truco(){
	//se queda el turno y el truco se quita
	let juego= JSON.parse(sessionStorage.getItem("JUEGO")).truco;
	let trucos= JSON.parse(sessionStorage.getItem("SKATE"));
	let nombre= JSON.parse(sessionStorage.getItem("JUEGO")).usuario;
	for (i in trucos){
			if(trucos[i]==juego){
				trucos.splice(i, 1);
				console.log('on click splice'+trucos);
			}
	}
	let randTruco=trucos[Math.floor(Math.random()*trucos.length)];
	console.log('on click si truco'+trucos);
	sessionStorage.setItem("JUEGO", JSON.stringify({"usuario":nombre, "truco":randTruco}));
	sessionStorage.setItem("SKATE", JSON.stringify(trucos));
	//cargarLayout en div truco utilizando el session skate random
	actualizarDatosT();
}