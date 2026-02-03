const c = document.getElementById("myCanvas");
var scoreLabel = document.getElementById("lblScore");
var timeLabel = document.getElementById("lblTime");
var positionLabel = document.getElementById("lblPosition");
const ctx = c.getContext("2d");

let canvasWidth, canvasHeight;
let box;
let enemy;
let score = 0;
var running = false;
var tiempoRestante = 30;

//disable right click 🚀
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

const contenido = document.querySelector("#instrucciones .hidden");

document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        contenido.classList.toggle("hidden");
    }
});

function resizeCanvas() {
    const rect = c.parentElement.getBoundingClientRect();
    c.width = rect.width;
    c.height = rect.height;
    canvasWidth = c.width;
    canvasHeight = c.height;

    if (!box) {
        reset_box();
    }
    place_enemy();

    draw();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

window.addEventListener("keydown", e => {
    if (keys.hasOwnProperty(e.key)){
        keys[e.key] = true;
    }
    e.preventDefault();
});

window.addEventListener("keyup", e => {
    if (keys.hasOwnProperty(e.key)){
        keys[e.key] = false;
    }
    e.preventDefault();
});

function update() {
    if (!box) return;
    if (!enemy) place_enemy();

    if(running){
        if (keys.ArrowUp) box.y -= box.speed;
        if (keys.ArrowDown) box.y += box.speed;
        if (keys.ArrowLeft) box.x -= box.speed;
        if (keys.ArrowRight) box.x += box.speed;

        if (box.x < 0) box.x = 0;
        if (box.y < 0) box.y = 0;
        if (box.x + box.width > canvasWidth) box.x = canvasWidth - box.width;
        if (box.y + box.height > canvasHeight) box.y = canvasHeight - box.height;

        if(isColliding(box, enemy)){
            addTextToScroll("Has colisionado!");
            increase_score();
            place_enemy();
        }

    }

    draw();
    requestAnimationFrame(update);
}

c.addEventListener("mousemove", (e) =>{
    getMousePosition(c, e);
});

c.addEventListener("click", () =>{
    if(!running) return;
    clickTimeout = setTimeout(() => {
        score  += Math.floor(Math.random(10) * 10)+1;
        scoreLabel.innerHTML = `Score: ${score}`;
        addTextToScroll("You clicked one!");
    },200); //delay para q no haga este metodo i hace doble click
});

c.addEventListener("dblclick", () =>{
    if(!running) return;
    score  += 20;
    clearTimeout(clickTimeout);
    
    scoreLabel.innerHTML = `Score: ${score}`;
    addTextToScroll("You doubled clicked!");
});

function draw() {
    if (!box) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(box.x, box.y, box.width, box.height);
}

update();

function place_enemy(){
    enemy = {
            x: Math.floor(Math.random() * canvasWidth) - 25,
            y: Math.floor(Math.random() * canvasHeight) - 25,
            width: 50,
            height: 50
        };
}

function reset_box(){
    box = {
            x: canvasWidth / 2 - 25,
            y: canvasHeight / 2 - 25,
            width: 50,
            height: 50,
            speed: 5
        };
}

function isColliding(box, enemy) {
    return (
        box.x < enemy.x + enemy.width &&
        box.x + box.width > enemy.x &&
        box.y < enemy.y + enemy.height &&
        box.y + box.height > enemy.y
    );
}

function increase_score(){
    score += 1;
    scoreLabel.innerHTML = `Score: ${score}`;
}

function reset(){
    score = 0;
    scoreLabel.innerHTML = `Score: ${score}`;
    tiempoRestante = 30;
    timeLabel.innerHTML = "Tiempo: 00:30";
    reset_box();
    for (let k in keys) {
        keys[k] = false;
    }
}

document.getElementById("btnStart").onclick = () => {
    if(running){
    }else{
        running = true;
        var downloadTimer = setInterval(function(){
            tiempoRestante -= 1;
            timeLabel.innerHTML = `Tiempo: 00:${tiempoRestante < 10 ? "0" + tiempoRestante : tiempoRestante}`;
            if(tiempoRestante <= 0){
                clearInterval(downloadTimer);
                endGamePopup();
                running = false;
                reset(); 
            }
        }, 1000);
    }
}

function endGamePopup(){
    alert(`Tu puntuacion es: ${score}`);
};

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor(event.clientX - rect.left);
    let y = Math.floor(event.clientY - rect.top);
    console.log("CoordX: " + x,
        "CoordY: " + y);
}

c.addEventListener("mousemove", (e) =>{
    getMousePosition(c, e);
});

c.addEventListener("click", () =>{
    if(!running) return;
        console.log("Clicked");
        score  += Math.floor(Math.random(10) * 10)+1;
        scoreLabel.innerHTML = `Score: ${score}`;
});

c.addEventListener("dblclick", () => {
    if (!running) return;
    score += 20;
    scoreLabel.innerHTML = `Score: ${score}`;
});
