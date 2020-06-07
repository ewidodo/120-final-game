/*
Ruth Rutherford, Mr Malarkey, and the Woodenickel Warehouse, by Jameson Danning, Colin Watterson, Enrico Widodo

Credits
-------
Jameson Danning - Art, Design, Coding
Colin Watterson - Level Design, Coding
Enrico Widodo - Coding, Sound Design, Art
*/

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
            debug: false,
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
    scene: [Loading, Menu, LevelSelect, Introduction, Intro1, Intro2, Intro3, Intro4, Intro5, First1, First2, First3, First4, First5, First6, First7,finalScreen],
};

let game = new Phaser.Game(config);

//keyboard reservations + vars
let keyA, keyD, keyW, keyQ, keyE, keyESC, keyLEFT, keyRIGHT, keySPACE;
let rotationValue, playerRotationValue;
let spawnX, spawnY;
let transitionSpeed = 300;
let gravityStrength = 2000;
let playerSpeed = 350;
let jumpSpeed = -600;
let rotationSpeed = 350;
let bgm_menu, bgm_lvl, thud;

let bgm_vol = 1;
let sfx_vol = 1;
let lastLevelCompleted = parseInt(localStorage.getItem('progress')) || 0;
