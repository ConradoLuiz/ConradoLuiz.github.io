function Pipe() {

    this.x = width;
    this.y = height;
    this.xv = 3;
    this.abertura = 200;
    this.teste = random(100, height/2 - 50);
    


    this.show = function () {
        //fill(255);
        //rect(this.x, 0, 70, this.teste);//RECT DE CIMA
        image(pipeUp, this.x, 0, 70, this.teste);
        //image(cima, this.x , 0, 70, teste);
        //rect(this.x, height, 70, (- height + this.teste + this.abertura)); //RECT DE BAIXO
        image(pipeDown, this.x, height, 70, (- height + this.teste + this.abertura));
        //image(baixo, this.x, height , 70 , (- height +teste + 115));
    }

    this.update = function () {
        this.x -= this.xv;
    }

    this.hits = function(bird){

        if ( bird.y < this.teste || bird.y + bird.w > ( +this.teste + this.abertura)) {

            if (bird.x + bird.w > this.x && bird.x < this.x + 70){
              return true;
            }
              
          }
          return false;
    }

    this.hitou = () => this.xv = 0;
        
}