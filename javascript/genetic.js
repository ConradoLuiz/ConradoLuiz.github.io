function exchangeBias(tensorA, tensorB){
    const size = Math.ceil(tensorA.size / 2);

    return tf.tidy(() => {
        const a = tensorA.slice([0], [size]);
        const b = tensorB.slice([0], [size]);
        //console.log(typeof a);
        return a.concat(b);
    })
}

function setBias(model, bias){
    const newModel = model;
    newModel.brain.model.layers[0].bias = newModel.brain.model.layers[0].bias.write(bias);

    return newModel;

}

function crossOver(a, b){
    const biasA = a.brain.model.layers[0].bias.read();
    const biasB = b.brain.model.layers[0].bias.read();

    return setBias(a, exchangeBias(biasA, biasB));
}

function createModel(hiddenLayer){
    let newBrain;
    tf.tidy(() => {
        newBrain = new Rede(hiddenLayer);
        tf.keep(newBrain);
    });
    return new Bird(newBrain);
}

function mutateBias(pop){
    return pop.map(bird => {
        const hiddenLayer = tf.layers.dense({
            units: 6,
            inputShape: [5],
            activation: 'sigmoid',
            kernelInitializer: 'leCunNormal',
            useBias: true,
            biasInitializer: tf.initializers.constant({
                value: random(-2,2),
            }),
        });
        
        return createModel(hiddenLayer);
    });
}

function evolve(){
    //console.log(savedBirds.length);
    let winners = savedBirds;

    const cross1 = crossOver(winners[0], winners[1]);
    const cross2 = crossOver(winners[2], winners[3]);

    let mutatedWinners = mutateBias(winners);

    //console.log(winners.length);
    //console.log(mutatedWinners.length);

    birds = [cross1, ...winners, cross2, ...mutatedWinners];

    for (bird of birds){
        bird.resetBird();
    }
    winners = [];
    mutatedWinners = [];

    savedBirds = [];
}
