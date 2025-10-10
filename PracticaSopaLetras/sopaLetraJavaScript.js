var filas;
var columnas;

function usarLasDimensiones(){
    filas = document.getElementById("filas").value;
    columnas = document.getElementById("columnas").value;
    numPalabras = document.getElementById("numPalabras").value;
}

let sopaLetras = document.getElementById("sopaLetras");

function montarSopaLetras(){
    console.log("A");
    usarLasDimensiones();
    console.log(filas);
    console.log(columnas);
    if(filas != null && columnas != null){
        for(var i = 0;i < filas; i++){
            var fila = document.createElement("tr");
            for(var j = 0; i < columnas; j++){
                var celda = document.createElement("td");
                celda.textContent = i + "," + j;
                fila.appendChild(celda);
                console.log("B");
            }
            sopaLetras.appendChild(fila);
        }
    }else{
        alert("Introduzca las dimensiones y numeros de palabras para la sopa de letras.");
    }
}