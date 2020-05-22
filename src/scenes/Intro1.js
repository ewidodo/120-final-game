class Intro1 extends Phaser.Scene {
    constructor() {
        super("intro1");
        this.uiCamera = 0;
    }

    preload() {
        this.load.tilemapCSV('introJump', './tilemaps/introJump.csv');
    }

    create() {

        this.mapConfig = {
            key: 'introJump',
            tileWidth: 64,
            tileHeight: 64
        }

        this.map = this.make.tilemap(this.mapConfig);
        this.map.setCollision(0); //0 is tile index, we can set specific tiles to have collision i think.
        this.map.setCollision(2);
        this.map.setCollision(4);
        this.tileset = this.map.addTilesetImage('tilesetImage', 'tiles');

        this.layer = this.map.createStaticLayer(0, this.tileset);

        //collision events
        this.map.setTileIndexCallback(4, this.nextLevel, this);


        //player
        this.player = new Player(this, 96, game.config.height - 416, 'player', 0);

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
          
        this.dialogue = new Dialogue(this, 2012, 1628, 'player', 0, "Alright, looks like your next job is just up ahead.", 2500);
        this.time.addEvent({
            delay: 3200,
            callback: () => {
                this.dialogue3 = new Dialogue(this, 2012, 1628, 'player', 0, "In case ya forgot how to do the Charleston, you can use\nthe A and D keys to move and the W key to jump.", 3000);
            }
        });
    }

    update() {
        //update player
        this.player.update();

        //exit level
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("levelSelect");
        }
    }

    nextLevel() {
        if (lastLevelCompleted < 1) {
            lastLevelCompleted = 1;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("intro2");
    }
}