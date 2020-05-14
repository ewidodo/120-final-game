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
                y: 1500,
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
    scene: [Menu, LevelSelect, Intro1],
};

let game = new Phaser.Game(config);

//keyboard reservations + vars
let keyA, keyD, keyW, keyLeft, keyRight;
let rotationValue, playerRotationValue;
let gravityStrength = 1000;
let playerSpeed = 350;
let jumpSpeed = -500;
let rotationSpeed = 350;

let lastLevelCompleted = parseInt(localStorage.getItem('progress')) || 0;