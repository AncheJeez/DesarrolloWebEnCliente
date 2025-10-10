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
    if(filas != null || columnas != null){
        for(var i = 0;i < filas; i++){
            for(var j = 0; i < columnas; j++){
                sopaLetras.append('<td>'+i+'</td>');
                console.log("B");
            }
        }
    }else{
        alert("Introduzca las dimensiones y numeros de palabras para la sopa de letras.");
    }
}