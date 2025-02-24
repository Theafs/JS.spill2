
//henter canvas-elementene
const canvas = document.getElementById('pong');
const kontekst = canvas.getContext('2d');
const start = document.getElementById('startButton');

//paddelstørelse 
const paddleBredde = 10, paddleHøyde = 100;

//Spiller sin paddel
const spiller = {
    x: 0,
    y: canvas.height / 2 - paddleHøyde / 2,
    width: paddleBredde,
    height: paddleHøyde,
    color: 'white',
    dy: 10,
    score: 0
};

//maskinen sin paddel
const datamaskin = {
    x: canvas.width - paddleBredde,
    y: canvas.height / 2 - paddleHøyde / 2,
    width: paddleBredde,
    height: paddleHøyde,
    color: 'white',
    dy: 5,
    score: 0
};

//starter spillet
start.addEventListener('click', () => {
    start.style.display = 'none';
    console.log("Spillet startet");
});