var filas;
var columnas;
var estadoTablero = false;

var arraySopaLetras = [];

var palabrasRespuesta = [];

function usarLasDimensiones(){
    filas = document.getElementById("filas").value;
    columnas = document.getElementById("columnas").value;
    numPalabras = document.getElementById("numPalabras").value;
}

let sopaLetras = document.getElementById("sopaLetras");
var tableSopa = document.createElement('table');

var pedirFila = document.createElement('input');
var pedirColumna = document.createElement('input');
var pedirPalabra = document.createElement('input');
var buttonPutWord = document.createElement('button');
var buttonStartGame = document.createElement('button');
var divRadioButtons = document.createElement('div');


function cargarTablero(){
    const bloque = document.getElementsByClassName("hacerDesaparecer")[0];
    if(!estadoTablero){
        montarSopaLetras();
        document.getElementById("cargarTablero").textContent = "Resetear tablero";
        bloque.style.display = "block";
        estadoTablero = true;
    }else{
        bloque.style.display = "none";
        estadoTablero = false;
    }
}

function montarSopaLetras(){
    tableSopa.innerHTML = "";
    arraySopaLetras = [];
    if (divRadioButtons) divRadioButtons.innerHTML = "";
    usarLasDimensiones();
    if(filas != "" && columnas != ""){
        for(var i = 0;i < filas; i++){
            var fila = document.createElement("tr");
            var newArrayFila = [];
            arraySopaLetras.push(newArrayFila);
            for(var j = 0; j < columnas; j++){
                var celda = document.createElement("td");
                newArrayFila.push(i + "," + j);
                // newArrayFila.push("?")
                celda.textContent = newArrayFila[j];
                fila.appendChild(celda);
            }
            // sopaLetras.appendChild(fila);
            tableSopa.appendChild(fila);
        }
            document.body.appendChild(tableSopa);
            // cargarBotonesSopa();
            // cargarBotonesInicio();
    }else{
        alert("Introduzca las dimensiones y numeros de palabras para la sopa de letras.");
    }
}

function actualizarSopaLetras(){
    for(var i = 0;i < filas; i++){
        for(var j = 0; j < columnas; j++){
            var celda = tableSopa.rows[i].cells[j];
            celda.textContent = arraySopaLetras[i][j];
        }
    }
}

function cargarBotonesInicio(){
    pedirFila.setAttribute("type","number");
    pedirFila.setAttribute("id","pedirFila");
    pedirColumna.setAttribute("type","number");
    pedirColumna.setAttribute("id","pedirColumna");
    pedirPalabra.setAttribute("id","pedirPalabra");
    
    var groupName = 'radioPosicion';
    //radio horizontal
    var horizontalOpt = document.createElement("input");
    horizontalOpt.setAttribute("type","radio");
    horizontalOpt.setAttribute("id","horizontal");
    horizontalOpt.setAttribute("name", groupName);
    divRadioButtons.appendChild(horizontalOpt);
    var horizontalLabel = document.createElement("label");
    horizontalLabel.setAttribute("for","radioOpt1");
    horizontalLabel.innerHTML="Horizontal";
    divRadioButtons.appendChild(horizontalLabel);

    divRadioButtons.appendChild(document.createElement("br"));

    //radio vertical arriba
    var verticalArribaOpt = document.createElement("input");
    verticalArribaOpt.setAttribute("type","radio");
    verticalArribaOpt.setAttribute("id","verticalArriba");
    verticalArribaOpt.setAttribute("name", groupName);
    divRadioButtons.appendChild(verticalArribaOpt);
    var verticalArribaLabel = document.createElement("label");
    verticalArribaLabel.setAttribute("for","radioOpt2");
    verticalArribaLabel.innerHTML="Vertical Arriba";
    divRadioButtons.appendChild(verticalArribaLabel);

    divRadioButtons.appendChild(document.createElement("br"));

    //radio vertical abajo
    var verticalAbajoOpt = document.createElement("input");
    verticalAbajoOpt.setAttribute("type","radio");
    verticalAbajoOpt.setAttribute("id","verticalAbajo");
    verticalAbajoOpt.setAttribute("name", groupName);
    divRadioButtons.appendChild(verticalAbajoOpt);
    var verticalAbajoLabel = document.createElement("label");
    verticalAbajoLabel.setAttribute("for","radioOpt3");
    verticalAbajoLabel.innerHTML="Vertical Abajo";
    divRadioButtons.appendChild(verticalAbajoLabel);
    
    buttonPutWord.textContent = "Añadir palabra";
    buttonPutWord.setAttribute("type","submit");
    buttonPutWord.setAttribute("onCLick","introducirPalabra()");

    buttonStartGame.textContent = "Empezar juego";
    buttonStartGame.setAttribute("type","submit");
    buttonStartGame.setAttribute("onClick","empezarJuego()");
}

function cargarBotonesSopa(){
    document.body.appendChild(tableSopa);

    document.body.appendChild(document.createElement('br'));

    var divPedirFila = document.createElement('div');
    divPedirFila.innerHTML = "Posicion Fila: ";
    document.body.appendChild(divPedirFila);
    document.body.appendChild(pedirFila);

    document.body.appendChild(document.createElement('br'));

    var divPedirColumna = document.createElement('div');
    divPedirColumna.innerHTML = "Posicion Columna: ";
    document.body.appendChild(divPedirColumna);
    document.body.appendChild(pedirColumna);

    document.body.appendChild(document.createElement('br'));

    var divPedirPalabra = document.createElement('div');
    divPedirPalabra.innerHTML = "Palabra a introducir: ";
    document.body.appendChild(divPedirPalabra);
    document.body.appendChild(pedirPalabra);

    document.body.appendChild(document.createElement('br'));

    document.body.appendChild(divRadioButtons);

    document.body.appendChild(buttonPutWord);

    document.body.appendChild(buttonStartGame);
}

function introducirPalabra(){

    var filaDada = document.getElementById("pedirFila").value;
    var columnaDada = document.getElementById("pedirColumna").value;

    if(filaDada != "" && columnaDada != "" && document.getElementById("pedirPalabra") != ""){

        if(filaDada <= parseInt(filas) && columnaDada <= parseInt(columnas)){
            if(filaDada >=0 && columnaDada >=0){
                // Aqui añadimos la palabra introducida a la lista de respuestas
                palabrasRespuesta.push(document.getElementById("pedirPalabra").value);
                var cadena = (document.getElementById("pedirPalabra").value).split('');

                // aqui asignamos la cadena dada a un valor en el array de arrays
                const posicion = document.querySelector('input[name="radioPosicion"]:checked')?.id;
                console.log(posicion);

                switch(posicion){
                    case 'horizontal':
                        horizontal(cadena, filaDada, columnaDada);
                        break;
                    case 'verticalArriba':
                        veticalArriba(cadena, filaDada, columnaDada);
                        break;
                    case 'verticalAbajo':
                        verticalAbajo(cadena, filaDada, columnaDada);
                        break;
                }
                actualizarSopaLetras();

                console.log("valores "+document.getElementById("pedirFila").value+" "+document.getElementById("pedirColumna").value);
            }else{
                alert("No introduzca números menores que 0.");
            }
        }else{
            alert("Introduzca valores menores o iguales a: "+filas+"x"+columnas+".");
        }
    }else{
        alert("Introduzca valores para la posicion fila x columna y la palabra.");
    }
}

function horizontal(cadena, filaDada, columnaDada){
    if (parseInt(columnaDada) + (cadena.length - 1) > columnas-1) {
        alert("La palabra no cabe hacia a la derecha horizontalemnte desde esa posición");
        return;
    }
    var i = 0;
    for(var j = columnaDada; j < cadena.length+parseInt(columnaDada); j++){
        arraySopaLetras[parseInt(filaDada)][j] = cadena[i];
        i++;
    }
}

function veticalArriba(cadena, filaDada, columnaDada){
    if (parseInt(filaDada) - (cadena.length - 1) < 0) {
        alert("La palabra no cabe hacia arriba desde esa posición");
        return;
    }
    for (var j = 0; j < cadena.length; j++) {
        arraySopaLetras[parseInt(filaDada) - j][parseInt(columnaDada)] = cadena[j];
    }
}

function verticalAbajo(cadena, filaDada, columnaDada){
    if (parseInt(filaDada) + (cadena.length - 1) > filas-1) {
        alert("La palabra no cabe hacia abajo desde esa posición");
        return;
    }
    var j = 0;
    for(var i = filaDada; i < cadena.length+parseInt(columnaDada); i++){
        arraySopaLetras[i][parseInt(columnaDada)] = cadena[j];
        j++;
    }
}

function empezarJuego(){
    if(palabrasRespuesta.length > 0){

    }else{
        alert("No ha introducido usted ninguna palabra en la sopa de letras");
    }
}