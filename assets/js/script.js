const times = document.querySelector("#times");
const placar = document.querySelector("#placar");
const statusGame = document.querySelector("#status");

const select = document.querySelector("select");

let status, idGame, x, y;
let geolocalizacao = [];

// Inicializador das funções
getGame();

// Valvula de ativação do select
function changeFunc(id) {
  idGame = id;
  getInfo();
}

// Gerador dos jogos select
function getGame() {
  try {
    fetch(`coloque a api`)
      .then((value) => value.json())
      .then((games) => {
        let nameGame = Object.values(games);

        option = new Option("Select Game", 0);
        select.options[0] = option;

        Object.keys(games).forEach((game, index) => {
          option = new Option(nameGame[index].name, game);
          select.options[index + 1] = option;
        });
      });
  } catch (e) {
    window.location.reload();
  }
}

// Gerador das info do game
function getInfo() {
  try {
    fetch(`informe a api`)
      .then((value) => value.json())
      .then((game) => {
        status = game.atualizacao;

        if (status == "Intervalo") {
          statusGame.style.display = "block";
        } else {
          statusGame.style.display = "none";

          times.innerHTML = game.nome;
          placar.innerHTML = game.placar;

          geolocalizacao = game.geolocalizacao.split(",");
          x = parseFloat(geolocalizacao[0]);
          y = parseFloat(geolocalizacao[1]);
        }
      });
  } catch (e) {
    console.error(e);
    window.location.reload();
  }
}

// Gerador de Campo
document.addEventListener("DOMContentLoaded", () => {
  const tela = document.querySelector("#tela");
  const ctx = tela.getContext("2d");
  
  tela.width = 380.188;
  tela.height = 171.078

  function bola() {
    let a = x * 380.188;
    let b = y * 171.078;

    var eixoX = parseInt(a, 10);
    var eixoY = parseInt(b, 10);

    let bola = []

    bola[0] = {
      x: eixoX,
      y: eixoY
    }

    for (let i = 0;i < bola.length; i++) {
      var img = new Image();

      img.src = "./assets/img/bola.png";

      ctx.drawImage(img, bola[0].x, bola[0].y, 15, 15);
    }
  }

  function campo() {
    //cor
    ctx.strokeStyle = "white";
  
    //centro do campo
    ctx.beginPath();
    ctx.arc(187, 87, 20, 0, Math.PI * 2, true);
    ctx.stroke();
  
    //linha Do Centro
    ctx.beginPath();
    ctx.moveTo(187, 00);
    ctx.lineTo(350, 22180);
    ctx.stroke();
  
    //bolinha Do centro
    ctx.beginPath();
    ctx.arc(187.5, 87, 3, 0, Math.PI * 2, true);
    ctx.stroke();
  
    //Gol 1
    ctx.beginPath();
    ctx.strokeRect(0, 51, 50, 70);
  
    //retangulo do Gol 1
    ctx.beginPath();
    ctx.strokeRect(0, 69, 20, 35);
  
    //centro do gol
    ctx.beginPath();
    ctx.arc(35, 87, 2, 0, Math.PI * 2, true);
    ctx.stroke();
  
    //arco do gol 1
    ctx.beginPath();
    ctx.arc(50, 86.5, 20, (90 * Math.PI) / 180, (270 * Math.PI) / 180, true);
    ctx.stroke();
  
    //Gol 2
    ctx.beginPath();
    ctx.strokeRect(325, 52, 55, 70);
  
    //retangulo do gol 2
    ctx.beginPath();
    ctx.strokeRect(356, 70, 30, 35);
  
    //centro do gol
    ctx.beginPath();
    ctx.arc(340, 87, 2, 0, Math.PI * 2, true);
    ctx.stroke();
  
    //arco do gol 2
    ctx.beginPath();
    ctx.arc(321, 87, 20, (180 * Math.PI) / 115, (180 * Math.PI) / 400, true);
    ctx.stroke();
  
    //canto superior esquerdo
    ctx.beginPath();
    ctx.arc(1, 1, 4, 0, Math.PI * 2, true);
    ctx.stroke();
  
    //canto superior direito
    ctx.beginPath();
    ctx.arc(380, 1, 5, 0, Math.PI * 2, true);
    ctx.stroke();
  
    //canto inferior esquerdo
    ctx.beginPath();
    ctx.arc(1, 170, 4, 0, Math.PI * 2, true);
    ctx.stroke();
  
    //canto inferior direito
    ctx.beginPath();
    ctx.arc(380, 170, 5, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
  }

  function clearCamp() {
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, 380.188, 171.078)
  }

  function iniciar() {
    getInfo();
    clearCamp();
    bola();
  }

  setInterval(campo, 100)
  setInterval(iniciar, 5000)
});