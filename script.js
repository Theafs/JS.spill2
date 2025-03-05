
//her henter canvas-elementene
const canvas = document.getElementById('pong');
const kontekst = canvas.getContext('2d');
const start = document.getElementById('startButton');

//paddelstørelse bestemmes med const
const paddleBredde = 10, paddleHøyde = 100;

//Spiller sin paddel, størrelse, farge, og hastighet. her har spiller en raskere hastighet for å gi en større sjanse for å vinne
const spiller = {
    x: 0,
    y: canvas.height / 2 - paddleHøyde / 2,
    width: paddleBredde,
    height: paddleHøyde,
    color: 'white',
    dy: 20,
    score: 0
};

//maskinen sin paddel, størrelse, farge og hastighet
const datamaskin = {
    x: canvas.width - paddleBredde,
    y: canvas.height / 2 - paddleHøyde / 2,
    width: paddleBredde,
    height: paddleHøyde,
    color: 'white',
    dy: 2,
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5,
    color: 'white'
};

console.log("Ballens startposisjon:", ball);

//utseende til paddel,ball og score med function
function tegnPaddle(x, y, width, height, color) {
    kontekst.fillStyle = color;
    kontekst.fillRect(x, y, width, height);
}

function tegnBall(x, y, radius, color) {
    kontekst.fillStyle = color;
    kontekst.beginPath();
    kontekst.arc(x, y, radius, 0, Math.PI * 2);
    kontekst.fill();
}

function tegnScore(x, y, score) {
    kontekst.fillStyle = 'white';
    kontekst.font = '35px Arial';
    kontekst.fillText(score, x, y);
}

//function for å bevege venste paddel med tastene
function bevegPaddle(paddle, oppTast, nedTast) {
    document.addEventListener('keydown', event => {
        switch (event.keyCode) {
            case oppTast:
                paddle.y -= paddle.dy;
                break;
            case nedTast:
                paddle.y += paddle.dy;
                break;
        }
    });
}

//reset av ballen etter poeng
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

//spilltilstand
function oppdater() {

    if (spiller.score >= 5 || datamaskin.score >= 5) {
        console.log("Spillet er over!");
        return; // Stopper spillet ved å ikke kalle requestAnimationFrame(spillLoop)
    }
    
    ball.x += ball.dx;
    ball.y += ball.dy;

    //ballen treffer topp eller bund
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
        console.log("Ballen traff veggen");
    }

    //ball treffer paddel
    if (ball.x - ball.radius < spiller.x + spiller.width && ball.y > spiller.y && ball.y < spiller.y + spiller.height) {
        ball.dx *= -1.1;
        console.log("Ballen traff spillerens paddle");
    } else if (ball.x + ball.radius > datamaskin.x && ball.y > datamaskin.y && ball.y < datamaskin.y + datamaskin.height) {
        ball.dx *= -1;
        console.log("Ballen traff datamaskinens paddle");
    }

    //sjekker om noen scorer
    if (ball.x - ball.radius < 0) {
        datamaskin.score++;
        console.log("Datamaskinen scoret! Poeng:", datamaskin.score);
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        spiller.score++;
        console.log("Spilleren scoret! Poeng:", spiller.score);
        resetBall();
    }

     // beveg datamaskinens paddel
     if (datamaskin.y + datamaskin.height / 2 < ball.y) {
        datamaskin.y += datamaskin.dy;
    } else {
        datamaskin.y -= datamaskin.dy;
    }

    // hindre paddlene fra å gå ut av canvas
    if (spiller.y < 0) spiller.y = 0;
    if (spiller.y + spiller.height > canvas.height) spiller.y = canvas.height - spiller.height;
    if (datamaskin.y < 0) datamaskin.y = 0;
    if (datamaskin.y + datamaskin.height > canvas.height) datamaskin.y = canvas.height - datamaskin.height;
}

//function tegn() for å tegne elementene
function tegn() {
    kontekst.clearRect(0, 0, canvas.width, canvas.height);
    tegnPaddle(spiller.x, spiller.y, spiller.width, spiller.height, spiller.color);
    tegnPaddle(datamaskin.x, datamaskin.y, datamaskin.width, datamaskin.height, datamaskin.color);
    tegnBall(ball.x, ball.y, ball.radius, ball.color);
    tegnScore(canvas.width / 4, canvas.height / 5, spiller.score);
    tegnScore(3 * canvas.width / 4, canvas.height / 5, datamaskin.score);
}

//spillets hovedloop
function spillLoop() {
    oppdater();
    tegn();
    requestAnimationFrame(spillLoop);
}

//starter spillet
start.addEventListener('click', () => {
    start.style.display = 'none';
    console.log("Spillet startet");
    bevegPaddle(spiller, 38, 40);
    spillLoop();
});



let retryButton = document.createElement("button");
        retryButton.innerText = "Prøv igjen";
        retryButton.classList.add("retry-button");
        retryButton.addEventListener("click", function () {
            location.reload();
        });
        document.body.appendChild(retryButton);