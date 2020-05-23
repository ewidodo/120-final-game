class Intro2 extends Phaser.Scene {
    constructor() {
        super("intro2");
        this.uiCamera = 0;
    }

    preload() {
        this.load.tilemapCSV('introObst', './tilemaps/introObst.csv');
    }

    create() {

        this.mapConfig = {
            key: 'introObst',
            tileWidth: 64,
            tileHeight: 64
        }

        this.map = this.make.tilemap(this.mapConfig);
        this.map.setCollision(0); //0 is tile index, we can set specific tiles to have collision i think.
        this.map.setCollision(2);
        this.map.setCollision(3);
        this.map.setCollision(4);
        this.tileset = this.map.addTilesetImage('tilesetImage', 'tiles');

        this.layer = this.map.createStaticLayer(0, this.tileset);

        //collision events
        this.map.setTileIndexCallback(3, this.resetScene, this);
        this.map.setTileIndexCallback(4, this.nextLevel, this);

        //player
        this.player = new Player(this, 96, 160, 'player', 0);

        //physics
        this.physics.add.collider(this.player, this.layer);

        //keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //camera & gravity
        rotationValue = 0;
        playerRotationValue = 0;
        this.cameras.main.setRotation(rotationValue);
        this.player.setRotation(playerRotationValue);
        this.switching = false;

        //ui
        this.uiCamera = this.cameras.add(0, 0, game.config.width, game.config.height);
        this.uiCamera.setScroll(1500, 1500);

        this.dialogue = new Dialogue(this, 2012, 2396, 'player', 0, "That red dingus you see is some sorta classified slime...\nIt does a whole lotta baloney, so watch your pins.", 25);
    }

    update() {
        //update player
        this.player.update();

        //exit level
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("levelSelect");
        }
    }

    resetScene(){
        //this.sound.play('sfx_death');
        this.scene.restart();
    }

    nextLevel() {
        if (lastLevelCompleted < 2) {
            lastLevelCompleted = 2;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("intro3");
    }
}