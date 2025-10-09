//variables para control
var numRespuestas = 0;
var score = 0;
let listadoBotones = ['btnVerd1','btnFalso1','btnVerd2','btnFalso2','btnVerd3','btnFalso3'];
let listadoPreguntas = ['pregunta1','pregunta2','pregunta3'];
// aquí estan las respuestas REALES
let listadoRespuestasReales = [true, false, true];
// aquí están las respuestas dada por el usuario
let listadoRespuestas = [false, false, false];

function ProcessResponse(questionNum, answer){
    // sumamos el numero total de respuestas seleccionadas
    numRespuestas++;
    checkAnswer(questionNum,answer);

    // dependiendo de la pregunta procesada, elegimos unos botones del array
    var btnId1;
    var btnId2;
    switch(questionNum){
        case 1:
            btnId1 = listadoBotones[0];
            btnId2 = listadoBotones[1];
            break;
        case 2:
            btnId1 = listadoBotones[2];
            btnId2 = listadoBotones[3];
            break;
        case 3:
            btnId1 = listadoBotones[4];
            btnId2 = listadoBotones[5];
            break;
        default:
            break;
    }

    disableBtns(btnId1, btnId2);
}

//vemos si son correctas
function checkAnswer(questionNum, answer){
    if (listadoRespuestasReales[questionNum-1] === answer){
        listadoRespuestas[questionNum-1] = true;
        score++;
    }else{
        listadoRespuestas[questionNum-1] = false;
    }
}

function disableBtns(btnId1, btnId2){
    document.getElementById(btnId1).disabled = true;
    document.getElementById(btnId2).disabled = true;
    
}

function checkResponses(){
    if(numRespuestas >= 3){
        alert("Numero de aciertos: "+score+", numero de fallos: "+(3-score));
        showResultados();
    }else{
        alert("El numero de respuestas marcadas es: "+numRespuestas+" Debe responder a todas las cuestiones antes de enviar.");
    }
}

function showResultados(){
    var texto = "Haga click en Aceptar para ver los resultados de su test o pulse Cancelar para ver las soluciones";
    if(confirm(texto)){
        // correfimos las preguntas
        showAnswers();
    }else{
        //enseñamos las respuestas
        showCorrection();
    }
}

function showAnswers(){
    for(var i=0; i<listadoPreguntas.length;i++){
        if(listadoRespuestas[i]){
            document.getElementById(listadoPreguntas[i]).style.color = 'green';
            // console.log("Ha llegado a verde");
        }else{
            document.getElementById(listadoPreguntas[i]).style.color = 'red';
            // console.log("Ha llegado a rojo");
        }
    }
}

function showCorrection(){
    for(var i=0; i<listadoPreguntas.length;i++){
        if(listadoRespuestasReales[i]){
            document.getElementById(listadoPreguntas[i]).style.color = 'green';
            // console.log("Ha llegado a verde");
        }else{
            document.getElementById(listadoPreguntas[i]).style.color = 'red';
            // console.log("Ha llegado a rojo");
        }
    }
}

function resetResponses(){
    // volvemos a permitir pulsar los botones
    for(i=0;i < listadoBotones.length;i++){
        document.getElementById(listadoBotones[i]).disabled = false
    }
    for(var i=0; i<listadoPreguntas.length;i++){
        document.getElementById(listadoPreguntas[i]).style.color = 'black';
    }
    numRespuestas = 0;
    score = 0;
}