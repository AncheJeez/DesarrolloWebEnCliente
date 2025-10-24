var filas;
var columnas;
var estadoTablero = false;

var arraySopaLetras = [];

var palabrasRespuesta = [];
let copiaOriginal = [];

function usarLasDimensiones(){
    filas = document.getElementById("filas").value;
    columnas = document.getElementById("columnas").value;
    numPalabras = document.getElementById("numPalabras").value;
}

let sopaLetras = document.getElementById("sopaLetras");
var tableSopa = document.createElement('table');

function cargarTablero(){
    const bloque = document.getElementsByClassName("divMontarSopa")[0];
    if(!estadoTablero){
        montarSopaLetras();
        document.getElementById("cargarTablero").textContent = "Resetear tablero";
        bloque.style.display = "block";
        estadoTablero = true;
    }else{
        tableSopa.innerHTML = "";
        document.getElementById("cargarTablero").textContent = "Cargar tablero  ";
        bloque.style.display = "none";
        estadoTablero = false;
    }
}

function printArray(){
    for(var i=0; i < arraySopaLetras.length; i++){
        for(var j=0;j < arraySopaLetras.length; j++){
            console.log(arraySopaLetras[i][j]);
        }
    }
}

function montarSopaLetras(){
    arraySopaLetras = [];
    copiaOriginal = [];
    tableSopa.innerHTML = "";
    // if (divRadioButtons) divRadioButtons.innerHTML = "";
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
                celda.classList.add("letra-view");
                fila.appendChild(celda);
            }
            tableSopa.appendChild(fila);
        }
            document.body.appendChild(tableSopa);
    }else{
        alert("Introduzca las dimensiones y numeros de palabras para la sopa de letras.");
    }
}

function actualizarSopaLetras(){
    for(var i = 0;i < filas; i++){
        for(var j = 0; j < columnas; j++){
            var celda = tableSopa.rows[i].cells[j];
            celda.textContent = arraySopaLetras[i][j].toUpperCase();
        }
    }
}

function introducirPalabra(){

    var filaDada = parseInt(document.getElementById("pedirFila").value);
    var columnaDada = parseInt(document.getElementById("pedirColumna").value);
    var palabra = document.getElementById("pedirPalabra").value;

    if (!isNaN(filaDada) && !isNaN(columnaDada) && palabra !== "") {

        if(filaDada <= parseInt(filas) && columnaDada <= parseInt(columnas)){
            if(filaDada >=0 && columnaDada >=0){
                // Aqui añadimos la palabra introducida a la lista de respuestas
                // palabrasRespuesta.push(document.getElementById("pedirPalabra").value);
                // var cadena = (document.getElementById("pedirPalabra").value).split('');
                var cadena = palabra.split('');

                const posicion = document.querySelector('input[name="radioPosicion"]:checked')?.id;
                console.log(posicion);
                
                let puedeInsertar = true;

                for (let k = 0; k < cadena.length; k++) {
                    let fila = filaDada;
                    let col = columnaDada;

                    switch(posicion){
                        case 'horizontal':
                            col = columnaDada + k;
                            break;
                        case 'verticalArriba':
                            fila = filaDada - k;
                            break;
                        case 'verticalAbajo':
                            fila = filaDada + k;
                            break;
                    }

                    if (fila < 0 || fila >= filas || col < 0 || col >= columnas) {
                        puedeInsertar = false;
                        break;
                    }


                    // Si ya hay letra distinta a la coma no se puede poner
                    // if (arraySopaLetras[fila][col] && !arraySopaLetras[fila][col].match(",")) {
                    if (arraySopaLetras[fila] && arraySopaLetras[fila][col] && !arraySopaLetras[fila][col].includes(",")) {
                        puedeInsertar = false;
                        console.log("Se pone encima de otra palabra")
                        break;
                    }
                }

                if (!puedeInsertar) {
                    alert("No se puede colocar la palabra en esa posición, ya hay letras ocupadas o se sale de la sopa.");
                    return;
                }
                palabrasRespuesta.push(palabra);

                switch(posicion){
                    case 'horizontal':
                        horizontal(cadena, filaDada, columnaDada);
                        break;
                    case 'verticalArriba':
                        verticalArriba(cadena, filaDada, columnaDada);
                        break;
                    case 'verticalAbajo':
                        verticalAbajo(cadena, filaDada, columnaDada);
                        break;
                }
                actualizarSopaLetras();
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
    printArray();
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

function verticalArriba(cadena, filaDada, columnaDada){
    printArray();
    if (parseInt(filaDada) - (cadena.length - 1) < 0) {
        alert("La palabra no cabe hacia arriba desde esa posición");
        return;
    }
    for (var j = 0; j < cadena.length; j++) {
        arraySopaLetras[parseInt(filaDada) - j][parseInt(columnaDada)] = cadena[j];
    }
}

function verticalAbajo(cadena, filaDada, columnaDada){
    printArray();
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function empezarJuego(){
    if(palabrasRespuesta.length > 0){
        const arrayLetras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];
        //hacemos una copia del original para poder comprobar las respuestas luego
        for (let a = 0; a < filas; a++) {
            // los tres puntos hace que se haga una copia real y no que haga referencia
            copiaOriginal.push([...arraySopaLetras[a]]);
        }

        for(var i = 0;i < filas; i++){
            for(var j = 0; j < columnas; j++){
                // si contiene coma en el array, lo sustituye por una letra random
                if(arraySopaLetras[i][j].includes(",")){
                    arraySopaLetras[i][j] = arrayLetras[getRandomInt(26)];
                }
                //sustituimos 
                var celda = tableSopa.rows[i].cells[j];
                celda.textContent = arraySopaLetras[i][j].toUpperCase();

            }
        }
    }else{
        alert("No ha introducido usted ninguna palabra en la sopa de letras");
    }
}

function mostrarRespuestas() {
    if(palabrasRespuesta.length > 0){
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                const celda = tableSopa.rows[i].cells[j];
                const letraOriginal = copiaOriginal[i][j];

                if (letraOriginal.includes(",")) {
                    // letra de relleno → rojo
                    celda.style.backgroundColor = "red";
                    celda.style.color = "white";
                    // Opcional: mostrar la letra real que estaba puesta al azar
                    // celda.textContent = arraySopaLetras[i][j].toUpperCase();
                } else {
                    // letra de palabra → verde
                    celda.style.backgroundColor = "green";
                    celda.style.color = "white";
                    celda.textContent = letraOriginal.toUpperCase();
                }
            }
        }
    }else{
        alert("No ha introducido usted ninguna palabra en la sopa de letras");
    }
}