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
function desenharFundo() {
    let gradiente = ctx.createLinearGradient(0, 0, 0, 500);
    gradiente.addColorStop(0, "#b3edff");
    gradiente.addColorStop(1, "#d5ffe4");

    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, 800, 500);

    ctx.fillStyle = "rgba(255,255,255,0.7)";

    ctx.beginPath();
    ctx.arc(100, 65, 25, 0, Math.PI * 2);
    ctx.arc(130, 65, 30, 0, Math.PI * 2);
    ctx.arc(160, 65, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(620, 110, 22, 0, Math.PI * 2);
    ctx.arc(650, 110, 30, 0, Math.PI * 2);
    ctx.arc(680, 110, 22, 0, Math.PI * 2);
    ctx.fill();
}
function desenharJogador() {
    ctx.save();

    ctx.translate(jogador.x, jogador.y);

    let corpo = ctx.createRadialGradient(
        -8, -12, 3, 0, 0, 32
    );

    corpo.addColorStop(0, "#d6ff52");
    corpo.addColorStop(0.45, "#50e58b");
    corpo.addColorStop(1, "#079b70");

    ctx.fillStyle = corpo;
    ctx.beginPath();
    ctx.ellipse(0, 0, 28, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#a9ffcb";
    ctx.beginPath();
    ctx.ellipse(0, 12, 17, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#078b65";
    ctx.beginPath();
    ctx.arc(-16, -17, 10, 0, Math.PI * 2);
    ctx.arc(13, -18, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(-16, -20, 7, 0, Math.PI * 2);
    ctx.arc(13, -21, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#243c55";
    ctx.beginPath();
    ctx.arc(-14, -19, 3, 0, Math.PI * 2);
    ctx.arc(15, -20, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(16, -22, 2, 0, Math.PI * 2);
    ctx.arc(-13, -20, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e76d9a";
    ctx.beginPath();
    ctx.arc(-22, 3, 5, 0, Math.PI * 2);
    ctx.arc(22, 3, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#145c45";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 4, 8, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.restore();
}
function desenharPlataformas() {
    plataformas.forEach(p => {
        ctx.fillStyle = "#42bd79";
        ctx.fillRect(p.x, p.y, p.w, p.h);

        ctx.fillStyle = "#a5f46c";
        ctx.fillRect(p.x, p.y, p.w, 5);

        ctx.fillStyle = "#268b61";
        ctx.fillRect(p.x, p.y + p.h - 3, p.w, 3);
    });
}
function desenharEstrela(x, y) {
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = "#ffcc33";
    ctx.strokeStyle = "#f39c12";
    ctx.lineWidth = 2;

    ctx.beginPath();

    for (let i = 0; i < 10; i++) {
        let raio = i % 2 === 0 ? 12 : 5;
        let angulo = -Math.PI / 2 + i * Math.PI / 5;

        let px = Math.cos(angulo) * raio;
        let py = Math.sin(angulo) * raio;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}
function desenharInimigo(e) {
    ctx.fillStyle = "#ff5278";
    ctx.beginPath();
    ctx.arc(e.x, e.y, 19, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(e.x - 7, e.y - 4, 5, 0, Math.PI * 2);
    ctx.arc(e.x + 7, e.y - 4, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#252525";
    ctx.beginPath();
    ctx.arc(e.x - 7, e.y - 4, 2, 0, Math.PI * 2);
    ctx.arc(e.x + 7, e.y - 4, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#9e2447";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(e.x - 7, e.y + 7);
    ctx.lineTo(e.x + 7, e.y + 7);
    ctx.stroke();
}

