class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('tiles', './assets/temptiles.png');
    }

    create() {
        this.scene.start("levelSelect");
    }

    update() {

    }
}