class Intro4 extends Phaser.Scene {
    constructor() {
        super("intro4");
        this.uiCamera = 0;
    }

    preload() {
        this.load.tilemapCSV('introGrav', './tilemaps/introGrav.csv');
    }

    create() {     
        this.mapConfig = {
            key: 'introGrav',
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

        //keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //player
        spawnX = 96;
        spawnY = 160;
        this.player = new Player(this, spawnX, spawnY, 'player', 0);
        this.player.setSize(32, 64, true);
        this.gameOver = false;

        //physics
        this.physics.add.collider(this.player, this.layer);

        //camera & gravity
        rotationValue = 0;
        playerRotationValue = 0;
        this.cameras.main.setRotation(rotationValue);
        this.player.setRotation(playerRotationValue);
        this.switching = false;
        this.rotator = new RotationManager(this, 0, 0 , 'player', 0);

        //ui
        this.uiCamera = this.cameras.add(0, 0, game.config.width, game.config.height);
        this.uiCamera.setScroll(1500, 1500);

        this.dialogue = new Dialogue(this, 2012, 2396, 'player', 0, "The warehouse gets real applesaucey up ahead, best if\nyou use the button to proceed.", 25);
    }

    update() {
        if (!this.gameOver){
            //switching gravity towards right
            if ((Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyRIGHT)) && !this.switching) {
                this.rotator.updateGravityRight();
            }

            //switching gravity towards left
            if ((Phaser.Input.Keyboard.JustDown(keyQ) || Phaser.Input.Keyboard.JustDown(keyLEFT)) && !this.switching) {
                this.rotator.updateGravityLeft();
            }
        }

        //update player
        this.player.update();

        //exit level
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("levelSelect");
        }
    }

    resetScene(){
        this.rotator.resetScene();
    }

    nextLevel() {
        if (lastLevelCompleted < 4) {
            lastLevelCompleted = 4;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("intro5");
    }
}