function inicio(){
	// Esta funcion se llama al cargar por primera vez la aplicación
	cargarLayout(document.getElementById("central"), INICIO, uiLoguear);
}

function onClick_LogIn(){
	//Esta funcion carga el log in
	cargarLayout(document.getElementById("central"), LOGIN, uiLogin);
}

function onClick_Regis(){
	//Carga elformulario de registro
	cargarLayout(document.getElementById("central"), REGISTRO, uiRegistrar);
}
function onClick_Entrar_cb(validado){
	if (validado) {
	cargarLayout(document.getElementById("idMenu"), NAV, uiNav);
	cargarLayout(document.getElementById("central"), MIPERFIL, uiPerfil);
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
function onClick_addP(){
	let nHijos=(document.getElementById("trucos").children.length)/2;
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
	let nHijos=(document.getElementById("trucos").children.length)/2;
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