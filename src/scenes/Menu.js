class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('tiles', './assets/temptiles.png');

        this.load.audio('sfx_button', './assets/button.wav');
    }

    create() {
        this.scene.start("levelSelect");
    }

    update() {

    }
}
