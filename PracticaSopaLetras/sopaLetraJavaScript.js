var filas;
var columnas;

function usarLasDimensiones(){
    filas = document.getElementById("filas").value;
    columnas = document.getElementById("columnas").value;
    numPalabras = document.getElementById("numPalabras").value;
}

// let sopaLetras = document.getElementById("sopaLetras");
var tableSopa = document.createElement('table');

var pedirFila = document.createElement('input');
var pedirColumna = document.createElement('input');
var buttonPutWord = document.createElement('button');

cargarBotonesInicio();


function montarSopaLetras(){
    usarLasDimensiones();
    if(filas != "" && columnas != ""){
        for(var i = 0;i < filas; i++){
            var fila = document.createElement("tr");
            for(var j = 0; j < columnas; j++){
                var celda = document.createElement("td");
                // celda.textContent = i + "," + j;
                celda.textContent = "?";
                fila.appendChild(celda);
            }
            // sopaLetras.appendChild(fila);
            tableSopa.appendChild(fila);
        }
            cargarBotonesSopa();
    }else{
        alert("Introduzca las dimensiones y numeros de palabras para la sopa de letras.");
    }
}

function cargarBotonesInicio(){
    buttonPutWord.textContent = "Añadir palabra";
    buttonPutWord.setAttribute("type","submit");
    buttonPutWord.setAttribute("onCLick","introducirPalabra()")
    pedirFila.setAttribute("type","number");
    pedirFila.setAttribute("id","pedirFila");
    pedirColumna.setAttribute("type","number");
    pedirColumna.setAttribute("id","pedirColumna");
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
    document.body.appendChild(buttonPutWord);
}

function introducirPalabra(){
    if(document.getElementById("pedirFila").value != "" && document.getElementById("pedirColumna").value != ""){
        console.log("test");
        console.log("valores "+document.getElementById("pedirFila").value+" "+document.getElementById("pedirColumna").value)
    }else{
        alert("Introduzca valoes correctos y que se encuentren en el rango de la tabla.");
    }
}