class Loading extends Phaser.Scene{
    constructor() {
        super("loadingScene");
    }

    preload() {
        //load images
        this.load.image('player', './assets/fuck.png');
        this.load.image('button', './assets/ass.png');
        this.load.image('tiles', './assets/temptiles.png');

        //load spritesheets

        //load audio
        this.load.audio('sfx_button', './assets/button.wav');
        this.load.audio('sfx_switch', './assets/switch_temp.wav');
        this.load.audio('sfx_death', './assets/explosion38.wav');
        this.load.audio('speechfont1', './assets/speechfont1.wav');
        this.load.audio('speechfont1Completed', './assets/speechfont1Complete.wav');

        this.load.audio('bgm_menu', './assets/bgm_menu.mp3');
        this.load.audio('bgm_ingame', './assets/bgm_ingame.mp3');

        //load levels
        this.load.tilemapCSV('introJump', './tilemaps/introJump.csv');
        this.load.tilemapCSV('introObst', './tilemaps/introObst.csv');
        this.load.tilemapCSV('introButton', './tilemaps/introButton.csv');
        this.load.tilemapCSV('introGrav', './tilemaps/introGrav.csv');
        this.load.tilemapCSV('introCorner', './tilemaps/introCorners.csv');
        this.load.tilemapCSV('first1', './tilemaps/first1.csv');
        this.load.tilemapCSV('first2', './tilemaps/first2.csv');
        this.load.tilemapCSV('first3', './tilemaps/first3.csv');
    }

    create() {
        this.scene.start("menuScene");
    }
}