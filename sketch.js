// variaveis da bola
let xBola = 250;
let yBola = 150;
let diametro = 18;
let raio = diametro / 2;

// variaveis velocidade da bola
let velocidadeXBola = 5;
let velocidadeYBola = 5;

// variaveis da raquete 1
let xRaquete = 5;
let yRaquete = 100;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

// variaveis da raquete 2 oponente
let xRaqueteOponente = 485;
let yRaqueteOponente = 100;
let velocidadeYOponente;

// variaveis pontuacao
let meusPontos = 0;
let pontosOponente = 0;

//variavel booleana para verificar a colisao
let colisao = false;

//variaveis de som do jogo
let somRaquete;
let somPonto;
let somFundo;

//variavel para calcular o erro do oponente
let erroOponente = 0;

function setup() {
  createCanvas(500, 300);
  somFundo.loop();
}

function draw() {
  background(0);
  exibirBola();
  movimentarBola();
  verificarColisaoBorda();
  exibirRaquete(xRaquete, yRaquete);
  movimentarMinhaRaquete();
  vereficarColisaoRaquete(xRaquete, yRaquete);
  exibirRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentarRaqueteOponenteMaquina();
  // movimentarRaqueteOponenteJogador();
  vereficarColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  placarJogo();
  marcarPontos();
  bolaPresa();
}

function exibirBola() {
  circle(xBola, yBola, diametro);
}

function movimentarBola() {
  xBola += velocidadeXBola; // movimento da bolinha x
  yBola += velocidadeYBola; // movimento da bolinha y
}

function verificarColisaoBorda() {
  if (xBola + raio > width || xBola - raio < 0) {
    velocidadeXBola *= -1;
  }

  if (yBola + raio > height || yBola - raio < 0) {
    velocidadeYBola *= -1;
  }
}

function exibirRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentarMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function vericarColisaoRaquete() {
  if (
    xBola - raio < xRaquete + comprimentoRaquete &&
    yBola - raio < yRaquete + alturaRaquete &&
    yBola + raio > yRaquete
  ) {
    velocidadeXBola *= -1;
    somRaquete.play();
  }
}

function vereficarColisaoRaquete(x, y) {
  colisao = collideRectCircle(
    x,
    y,
    comprimentoRaquete,
    alturaRaquete,
    xBola,
    yBola,
    raio
  );

  if (colisao) {
    velocidadeXBola *= -1;
    somRaquete.play();
  }
}
// bug da bola presa na raquete
function bolaPresa() {
  if (xBola - raio < 0) {
    xBola = 23;
  }
}

// modo 1 jogador jogando contra a maquina
function movimentarRaqueteOponenteMaquina() {
  velocidadeYOponente = yBola - yRaqueteOponente - comprimentoRaquete / 2 - 50;
  yRaqueteOponente += velocidadeYOponente;
}

/*
// modo 2 jogadores simultaneos w e s 
function movimentarRaqueteOponenteJogador() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}
*/

function placarJogo() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(54, 54, 54));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 25);
  fill(color(54, 54, 54));
  rect(350, 10, 40, 20);
  fill(255);
  text(pontosOponente, 370, 25);
}

function marcarPontos() {
  if (xBola > 490) {
    meusPontos += 1;
    somPonto.play();
  }

  if (xBola < 10) {
    pontosOponente += 1;
    somPonto.play();
  }
}

function preload() {
  somFundo = loadSound("trilha.mp3");
  somRaquete = loadSound("raquetada.mp3");
  somPonto = loadSound("ponto.mp3");
}
