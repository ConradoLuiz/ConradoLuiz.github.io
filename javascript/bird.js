function Bird(brain) {

    this.x = width / 2 - 150;
    this.y = height / 2 - 100;
    this.xv = 15;
    this.yv = 0;
    this.score = 0;
    this.distance = 0;
    this.pontuacao = 0;
    this.red = false;

    if (brain){
        this.brain = brain;
    }
    else{
        this.brain = new Rede();
    }

    this.w = 20;

    this.lift = -25;
    this.gravity = 1;

    this.inputs;

    // this.inicia = function(){
    //     this.brain.model.compile({
    //         optimizer: tf.train.sgd(0.2),
    //         loss: 'meanSquaredError'
    //     });
    // }

    /* this.train = function(){

        this.brain.model.fit(inputs,)
    } */

    this.resetBird = function(){
        this.distance = 0;
        this.pontuacao = 0;
        this.score = 0;
    }
    
    this.think = function (pipes) {
        /* this.brain.model.compile({
            optimizer: tf.train.sgd(0.2),
            loss: 'meanSquaredError'
        }); */
        tf.tidy(() => {

            let hor = map(pipes[0].x - this.x, 0, width, 0, 1);
            let hei = map(this.y, 0, height, 1, 0) - map(pipes[0].teste + (pipes[0].abertura/2), 0, height, 1, 0);
            inputs = tf.tensor2d([
                [hor,hei, this.y, pipes[0].teste + (pipes[0].abertura/2), pipes[0].x]
            ]);
    
            let outTensor = this.brain.model.predict(inputs);
    
            let output = outTensor.dataSync();
    
            //console.log(output[0]);
            if(output[0] > 0.5){
                this.fly();
            }
        });
    }

    this.hitChao = function() {
        if (this.y > height -this.w - 2){
            return true;
        }
            
        return false;
    }


    this.show = function () {
        if(!this.red)
            fill(255, 60);
        else    
            fill(255,0,0);
        //image(dino, this.x, this.y, 20 , 20);
        //rect(this.x, this.y, this.w, this.w, 7);
        image(birdIm, this.x, this.y, this.w, this.w);
    }

    this.red = function(){
        fill(255,0,0);
        rect(this.x, this.y, this.w, this.w, 7);
    }

    this.fly = function(){
        this.yv += this.lift;
        this.y += this.yv;
    }

    this.hitou = function() {
        this.gravity = 0;
        this.yv = 0;
        this.y = 0;

    }
    

    this.update = function () {

        this.yv += this.gravity;
        this.yv *= 0.9;
        //System.out.println(this.yv);

        this.distance += 1;

        if (this.yv > 15)
            this.yv = 15;


        this.y += this.yv;


        //this.yv *= 0.9; 


        if (this.y > height - this.w) {

            this.y = height - this.w;
            this.yv = 0;

            //somMorte();

            //over();

        }

        if (this.y < 0) {

            this.y = 0;
            this.yv = 0;

        }

        this.score = ((this.distance*this.distance) -(abs(heightDif(this))/2)) + (this.pontuacao * this.pontuacao); 

    }
}