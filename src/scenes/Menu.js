class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('tiles', './assets/temptiles.png');

        this.load.audio('sfx_button', './assets/button.wav');
        this.load.audio('sfx_switch', './assets/switch_temp.wav');
        this.load.audio('sfx_death', './assets/explosion38.wav');
        this.load.audio('speechfont1', './assets/speechfont1.wav');
        this.load.audio('speechfont1Completed', './assets/speechfont1Complete.wav');
    }

    create() {
        this.scene.start("levelSelect");
    }

    update() {

    }
}
