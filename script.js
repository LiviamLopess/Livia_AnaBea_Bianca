const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let estado = "menu";
let pontos = 0;
let teclas = {};

let jogador;
let plataformas;
let estrelas;
let inimigos;