const TOTAL = 10;

var birds = [];
var savedBirds = [];
var cano;
let melhorPassaro;
let melhorPontuacao = 0;
let ultimaGeracao = 0;
let podeAtualizar = true;

let realDistance = 0;
let counter = 0;

let geracao = 0;

var pipes = [];

var pontos = 0;
var topPontos = 0;

let slider;

//let model;

let birdIm, pipeUp, pipeDown, bgIm;

function preload() {
  birdIm = loadImage("data/meu-dino.png");
  pipeUp = loadImage("data/cano_cima.png");
  pipeDown = loadImage("data/cano_baixo.png");
  bgIm = loadImage("data/fundo.png");
}

function setup() {
  const canvas = createCanvas(400, 600);

  canvas.parent("sketch-holder");

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }

  pipes.push(new Pipe());

  slider = document.getElementById("myRange");
  // slider = createSlider(0, 240, 30);
  // slider.parent("slider-wrapper");
}

function draw() {
  background(bgIm);

  for (let n = 0; n < slider.value; n++){

    for (let i = 0; i < pipes.length - 1; i++) {
      for (let j = birds.length - 1; j >= 0; j--) {
        
        if (getHit(pipes[i], birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);

          if (birds.length < 1) {
            over();
            break;
          }
        }
      }

      pipes[i].update();
      pipes[i].show();

      let disBird = birds[0];
      for (b of birds) {
        if (b.distance > disBird.distance) disBird = b;
      }

      if (pipes[i].x + 37 == disBird.x) {
        pontos++;
        disBird.pontuacao++;
      }
    }

    for (let i = 0; i < pipes.length - 1; i++) {
      if (pipes[i].x < -80) {
        //console.log("tira da frente");
        pipes.shift();
      }
    }

    
    for (let i = birds.length - 1; i >= 0  ; i--) {
      birds[i].think(pipes);
      birds[i].update();
      if (birds[i].hitChao()) savedBirds.push(birds.splice(i, 1)[0]);
    }
    realDistance += 1;

    if (counter % 100 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    let bestBird = birds[0];
    for (let i = birds.length - 1; i >= 0; i--)
      if (birds[i].score > bestBird.score) bestBird = birds[i];


    pontuacao();
  }


  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }

  

  document.getElementById("fps").innerHTML = "FPS: " + nf(frameRate(), 1, 2);
  // document.getElementById("population").innerHTML = "populacao: " + count;
  // document.getElementById("geracao").innerHTML = "geracao: " + geracao;

  
  //console.log(slider.value);
  //console.log(bestBird.score);

  //console.log(heightDif(birds[0]));
  //console.log(birds[0].score);
}

function horDist(bird) {
  return pipes[0].x - bird.x;
}

function heightDif(bird) {
  return bird.y - (pipes[0].teste + pipes[0].abertura / 2);
}

function newRow() {
  let table = document.getElementsByTagName("table")[0];
  melhorPontuacao = pontos;
  if (ultimaGeracao != geracao) {
    let nRow = table.insertRow(table.rows.length);

    let cell1 = nRow.insertCell(0);
    let cell2 = nRow.insertCell(1);
    let cell3 = nRow.insertCell(2);

    melhorPassaro = savedBirds[0];

    cell1.innerHTML = geracao;
    cell2.innerHTML = melhorPontuacao;
    cell3.innerHTML = realDistance;
  } else {
    table.deleteRow(-1);

    let nRow = table.insertRow(-1);

    let cell1 = nRow.insertCell(0);
    let cell2 = nRow.insertCell(1);
    let cell3 = nRow.insertCell(2);

    melhorPassaro = savedBirds[0];

    cell1.innerHTML = geracao;
    cell2.innerHTML = melhorPontuacao;
    cell3.innerHTML = realDistance;
  }
  ultimaGeracao = geracao;
}

function atualizaRow() {
  let table = document.getElementsByTagName("table")[0];
  melhorPontuacao = pontos;
  if (ultimaGeracao == geracao) {
    table.deleteRow(-1);

    let nRow = table.insertRow(-1);

    let cell1 = nRow.insertCell(0);
    let cell2 = nRow.insertCell(1);
    let cell3 = nRow.insertCell(2);

    melhorPassaro = birds[0];

    cell1.innerHTML = geracao;
    cell2.innerHTML = melhorPontuacao;
    cell3.innerHTML = realDistance;
  } else {
    let nRow = table.insertRow(table.rows.length);

    let cell1 = nRow.insertCell(0);
    let cell2 = nRow.insertCell(1);
    let cell3 = nRow.insertCell(2);

    melhorPassaro = birds[0];

    cell1.innerHTML = geracao;
    cell2.innerHTML = melhorPontuacao;
    cell3.innerHTML = realDistance;
  }
  ultimaGeracao = geracao;
}

function calcFitness() {
  let melhor, segundo, terceiro, quarto;
  melhor = savedBirds[0];
  segundo = savedBirds[1];
  terceiro = savedBirds[2];
  quarto = savedBirds[3];

  for (let i = 10 - 1; i >= 0; i--) {
    if (savedBirds[i].score > melhor.score) {
      melhor = savedBirds[i];
    } else if (savedBirds[i].score > segundo.score) {
      segundo = savedBirds[i];
    } else if (savedBirds[i].score > terceiro.score) {
      terceiro = savedBirds[i];
    } else if (savedBirds[i].score > quarto.score) {
      quarto = savedBirds[i];
    }
  }
  melhorPassaro = melhor;
  //melhorPontuacao = melhor.pontuacao;
  // console.log(melhor.pontuacao)
  savedBirds = [melhor, segundo, terceiro, quarto];
}

function over() {
  for (let i = 0; i < pipes.length - 1; i++) {
    pipes[i].xv = 0;
    pipes[i].show();
  }

  /*  console.log(savedBirds[0].score);
    console.log(savedBirds[1].score);
    console.log(savedBirds[2].score); */

  reset();
  pontos = 0;
  realDistance = 0;
}

function reset() {
  pipes = [];

  pipes.push(new Pipe());

  // for(let i=0; i < TOTAL; i++){
  //     birds[i] = new Bird();
  // }

  calcFitness();
  melhorPontuacao = pontos;
  if (podeAtualizar) newRow();
  evolve();

  geracao++;
}

function getHit(p, b) {
  if (p.hits(b)) {
    b.hitou();

    /* for (var i = 0; i < pipes.length - 1; i++) {
            pipes[i].hitou();
        } */

    return true;
  }

  return false;
}

function keyPressed() {
  if (key == " ") {
    for (b of birds) {
      //b.fly();
    }
  }
  if (key == "s") {
    savedBirds.push(birds[0]);
  }
}

function mousePressed() {
  for (let i = birds.length - 1; i >= 0; i--) {
    if (mouseX == birds[i].x && mouseY == birds.y) {
      console.log("oi");
      birds[i].red();
    }
  }
}

function pontuacao() {
  textSize(24);
  fill(255);
  stroke(0);

  if (pontos > topPontos) topPontos = pontos;

  text(pontos, width / 2 - 10, height / 2 - 150);

  text(topPontos, width - 60, 50);
}
