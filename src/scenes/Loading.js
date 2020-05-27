class Loading extends Phaser.Scene{
    constructor() {
        super("loadingScene");
    }

    preload() {
        //load images
        this.load.image('player', './assets/fuck.png');
        this.load.image('button', './assets/ass.png');
        this.load.image('tiles', './assets/temptiles.png');

        //load atlases
        this.load.atlas('ruth_normal', './assets/ruth_normal.png', './assets/dialogue.json');
        this.load.atlas('ruth_confused', './assets/ruth_confused.png', './assets/dialogue.json');
        this.load.atlas('ruth_stern', './assets/ruth_stern.png', './assets/dialogue.json');
        this.load.atlas('ruth_angry', './assets/ruth_angry.png', './assets/dialogue.json');
        this.load.atlas('malarkey_normal', './assets/malarkey_normal.png', './assets/dialogue.json');
        this.load.atlas('malarkey_closed', './assets/malarkey_closed.png', './assets/dialogue.json');

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
        //define animations
        this.anims.create({
            key: 'ruth_normal_talk',
            frames: this.anims.generateFrameNames('ruth_normal'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ruth_confused_talk',
            frames: this.anims.generateFrameNames('ruth_confused'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ruth_stern_talk',
            frames: this.anims.generateFrameNames('ruth_stern'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ruth_angry_talk',
            frames: this.anims.generateFrameNames('ruth_angry'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'malarkey_normal_talk',
            frames: this.anims.generateFrameNames('malarkey_normal'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'malarkey_closed',
            frames: this.anims.generateFrameNames('malarkey_closed'),
            frameRate: 8,
            repeat: -1
        });

        //done loading
        this.scene.start("menuScene");
    }
}