let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 1024,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    resolution: window.devicePixelRatio,

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 300,
            },
            checkCollision: {
                left: true,
                right: true,
            },
        },
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scene: [Menu, Play, test],
};

let game = new Phaser.Game(config);

//keyboard reservations + vars
let keyA, keyD, keyQ, keyE;
let rotationValue, playerRotationValue;
let gravityStrength = 600;
let playerSpeed = 200;