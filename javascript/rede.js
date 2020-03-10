function Rede(layer){

    this.model = tf.sequential();

    if(layer){
        this.model.add(layer);
    }
    else{
        this.hidden = tf.layers.dense({
            units: 6,
            inputShape: [5],
            activation: 'sigmoid',
            kernelInitializer: 'leCunNormal',
            useBias: true,
            biasInitializer: 'randomNormal',
    
        });
        this.model.add(this.hidden);
    }
    

    this.output = tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    });
    this.model.add(this.output);

    this.learningRate = 0.2;
    this.opt = tf.train.sgd(this.learningRate);

    this.model.compile({
        optimizer: this.opt,
        loss: 'meanSquaredError'
    });


}

