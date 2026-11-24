const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let estado = "menu";
let pontos = 0;
let teclas = {};

let jogador;
let plataformas;
let estrelas;
let inimigos;

function iniciarJogo() {
    pontos = 0;

    jogador = {
        x: 100,
        y: 380,
        r: 25,
        vx: 0,
        vy: 0,
        velocidade: 5,
        pulando: false
    };

    plataformas = [
        {x: 0, y: 460, w: 800, h: 40},
        {x: 120, y: 370, w: 130, h: 15},
        {x: 330, y: 300, w: 130, h: 15},
        {x: 550, y: 230, w: 130, h: 15},
        {x: 300, y: 160, w: 130, h: 15},
        {x: 80, y: 90, w: 130, h: 15}
    ];

    estrelas = [
        {x: 185, y: 330, pega: false},
        {x: 395, y: 260, pega: false},
        {x: 615, y: 190, pega: false},
        {x: 365, y: 120, pega: false},
        {x: 145, y: 50, pega: false}
    ];

    inimigos = [
        {x: 300, y: 430, vx: 2, min: 270, max: 500},
        {x: 570, y: 200, vx: 2, min: 550, max: 680}
    ];

    estado = "jogando";
}
