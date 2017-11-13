
var turno = 1;
var Casillas = [0,0,0,0,0,0,0,0,0];
var terminado = false;
var Lineas = [[0,1,2],[3,4,5],[6,7,8],
			  [0,3,6],[1,4,7],[2,5,8],
			  [0,4,8],[2,4,6]]; 



function juego(boton) {
	if(turno < 10 && !terminado){
		if(colocarCasilla(boton)){
			maquina();
			if(turno == 10 && !terminado){
				alert(" HAS EMPATADO!!!");
			}
		}
	}
}

function colocarCasilla(boton){
	var id = boton.id;

	if(Casillas[id] == 0){
		if(turno%2 == 0){
			boton.className = "btn btn-outline-success btn-block";
			boton.innerHTML = "<i class='fa fa-circle-o fa-4x' aria-hidden='true'></i>";
			Casillas[id] = 1;
		}else{
			boton.className = "btn btn-outline-danger btn-block";
			boton.innerHTML = "<i class='fa fa-close fa-4x' aria-hidden='true'></i>";
			Casillas[id] = 2;
		}
		turno++;
		return true;
	}else{
		return false;
	}

}

function comenzar(){
	var turno_1 = -1;
	var random = 0;
	var objeto;

	while (turno_1 == -1 ){
		random = Math.round((Math.random()*100) % 9); 
		if(random%2 == 0){
			turno_1 = random;
		} 
	}

	objeto = document.getElementById(""+ turno_1);
	colocarCasilla(objeto);
}

function maquina(){
	var tiro = false, casilla_vacia = -1, cas = -1, posible_cas = -1, bloqueo = -1;
	var cont_uno=0, cont_dos=0;

	for(var x=0; x < 8 ; ++x){
		for(var y=0; y < 3; ++y){
			cas = Lineas[x][y];
			switch(Casillas[cas]){
				case 1: cont_uno++; break;
				case 2: cont_dos++; break;
				default: casilla_vacia = cas;
			}
		}
		
		if(casilla_vacia != -1){
			if(cont_uno == 2){
				bloqueo = casilla_vacia;
			}else{
				if(cont_dos == 2) {
					x = 10;	tiro=true;
					terminado = true;
					var objeto = document.getElementById(""+casilla_vacia);
					colocarCasilla(objeto);	
					alert("HAS PERDIDO, VUELVE A INTENTARLO");
				}else{
					if(cont_dos == 1 && cont_uno == 0){
						posible_cas = casilla_vacia;
					}
				}
			}
		}

		cont_uno = 0;	cont_dos=0;	casilla_vacia=-1;
	}

	if(!tiro){
		if(bloqueo !=-1 ){
			var objeto = document.getElementById(""+bloqueo);
			colocarCasilla(objeto);			
		}else{
			if(posible_cas == -1){
				while (posible_cas == -1 ){
					random = Math.round((Math.random()*100) % 9);
					if(Casillas[random] == 0){
						posible_cas = random;
					} 
				}	
			}

			var objeto = document.getElementById(""+posible_cas);
			colocarCasilla(objeto);
		}
	}
}
