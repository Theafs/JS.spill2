
//henter canvas-elementene
const canvas = document.getElementById('pong');
const kontekst = canvas.getContext('2d');
const start = document.getElementById('startButton');

//starter spillet
start.addEventListener('click', () => {
    start.style.display = 'none';
    console.log("Spillet startet");
});