class Loading extends Phaser.Scene{
    constructor() {
        super("loadingScene");
    }

    preload() {
        //load images
        this.load.image('ruth_jump', './assets/ruthJump.png');
        this.load.image('ruth_fall', './assets/ruthFall.png');
        this.load.image('button', './assets/ass.png');
        this.load.image('tiles', './assets/tileSheet.png');

        //load atlases
        this.load.atlas('ruth_normal', './assets/ruth_normal.png', './assets/dialogue.json');
        this.load.atlas('ruth_confused', './assets/ruth_confused.png', './assets/dialogue.json');
        this.load.atlas('ruth_stern', './assets/ruth_stern.png', './assets/dialogue.json');
        this.load.atlas('ruth_angry', './assets/ruth_angry.png', './assets/dialogue.json');
        this.load.atlas('malarkey_normal', './assets/malarkey_normal.png', './assets/dialogue.json');
        this.load.atlas('malarkey_closed', './assets/malarkey_closed.png', './assets/dialogue.json');

        this.load.atlas('ruth_idle', './assets/ruthIdle.png', './assets/ruthIdle.json');
        this.load.atlas('ruth_run', './assets/ruthRun.png', './assets/ruthRun.json');

        //load audio
        this.load.audio('sfx_button', './assets/button.wav');
        this.load.audio('sfx_switch', './assets/switch.wav');
        this.load.audio('sfx_death', './assets/explosion38.wav');
        this.load.audio('speechfont1', './assets/speechfont1.wav');
        this.load.audio('speechfont1Completed', './assets/speechfont1Complete.wav');
        this.load.audio('walk1', './assets/walk1.wav');
        this.load.audio('walk2', './assets/walk2.wav');
        this.load.audio('jump', './assets/jump.wav');
        this.load.audio('thud', './assets/thud.wav');

        this.load.audio('bgm_menu', './assets/bgm_menu.mp3');
        this.load.audio('bgm_ingame', './assets/bgm_ingame.mp3');
        

        //load levels
        this.load.tilemapCSV('introJump', './tilemaps/finals/_introJump.csv');
        this.load.tilemapCSV('introObst', './tilemaps/introObst.csv');
        this.load.tilemapCSV('introButton', './tilemaps/finals/_introButton.csv');
        this.load.tilemapCSV('introGrav', './tilemaps/introGrav.csv');
        this.load.tilemapCSV('introCorner', './tilemaps/finals/_introCorners.csv');
        this.load.tilemapCSV('first1', './tilemaps/first1.csv');
        this.load.tilemapCSV('first2', './tilemaps/finals/_first2.csv');
        this.load.tilemapCSV('first3', './tilemaps/finals/_first3.csv');
    }

    create() {
        //set music
        bgm_menu = this.sound.add('bgm_menu');
        bgm_menu.loop = true;
        bgm_lvl = this.sound.add('bgm_ingame');
        bgm_lvl.loop = true;

        thud = this.sound.add('thud');
        
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
            key: 'malarkey_closed_talk',
            frames: this.anims.generateFrameNames('malarkey_closed'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'r_idle',
            frames: this.anims.generateFrameNames('ruth_idle'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'r_run',
            frames: this.anims.generateFrameNames('ruth_run'),
            frameRate: 12,
            repeat: -1
        });

        console.log(this.anims.get('r_run'));
        //done loading
        this.scene.start("menuScene");
    }
}