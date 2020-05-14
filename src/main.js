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
                y: 2000,
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
    scene: [Menu, LevelSelect, Intro1, Intro2, Intro3, Intro4, Intro5],
};

let game = new Phaser.Game(config);

//keyboard reservations + vars
let keyA, keyD, keyW, keyQ, keyE;
let rotationValue, playerRotationValue;
let gravityStrength = 2000;
let playerSpeed = 350;
let jumpSpeed = -600;
let rotationSpeed = 350;

let lastLevelCompleted = parseInt(localStorage.getItem('progress')) || 0;
