var numRespuestas = 0;
let listadoBotones = ['btnVerd1','btnFalso1','btnVerd2','btnFalso2','btnVerd3','btnFalso3'];

function ProcessResponse(questionNum){
    numRespuestas++;
    checkAnswer();
    switch(questionNum){
        
    }

    disableBtns(btnId1, btnId2);
}

function checkAnswer(){

}


function disableBtns(btnId1, btnId2){
    document.getElementById(btnId1).disabled = true;
    document.getElementById(btnId2).disabled = true;
    
}

function checkResponses(){
    if(numRespuestas >= 3){
        alert("good job");
    }else{
        alert("El numero de respuestas marcadas es: "+numRespuestas+" Debe responder a todas las cuestiones antes de enviar.");
    }
}

function resetResponses(){
    for(i=0;i < listadoBotones.length;i++){
        document.getElementById(listadoBotones[i]).disabled = false
    }
    numRespuestas = 0;
}