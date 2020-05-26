class First1 extends Phaser.Scene {
    constructor() {
        super("first1");
        this.uiCamera = 0;
    }

    preload() {
        this.load.tilemapCSV('first1', './tilemaps/first1.csv');
    }

    create() {
        this.mapConfig = {
            key: 'first1',
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
        spawnX = 96;
        spawnY = 224;
        this.player = new Player(this, spawnX, spawnY, 'player', 0);
        this.player.setSize(32, 64, true);
        this.gameOver = false;

        //physics
        this.physics.add.collider(this.player, this.layer);


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
        
        this.dialogue = new Dialogue(this, 2012, 2396, 'player', 0, "Alright gal, first object we're fixin' is a laughing owl.\nThis bird faded back in '14, but that's beside the point.", 25);
        this.dialogue1Finished = false;
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

        //chain dialogues and stuff
        if (!this.dialogue1Finished && this.dialogue.finished) {
            this.dialogue1Finished = true;
            this.dialogue2 = new Dialogue(this, 2012, 2396, 'player', 0, "This bird is causing all sorts of hoots to float in the\nair and that ain't swanky, so we gotta calm it down.", 25);
        }
    }

    resetScene(){
        if (!this.gameOver) {
            this.gameOver = true;
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.physics.world.gravity.x = 0;
            this.physics.world.gravity.y = 0;
            this.player.setSize(32, 64, true);
            this.sound.play('sfx_death');
            this.tweens.add({
                targets: this.player,
                scale: 0,
                duration: rotationSpeed,
                ease: 'Power',
                repeat: 0,
                yoyo: false,
                completeDelay: 100,
                onComplete: function() {
                    //reset rotation + gravity
                    rotationValue = 0;
                    playerRotationValue = 0;
                    this.cameras.main.setRotation(rotationValue);
                    this.player.setRotation(playerRotationValue);
                    this.physics.world.gravity.x = Math.sin(rotationValue) * gravityStrength;
                    this.physics.world.gravity.y = Math.cos(rotationValue) * gravityStrength;

                    //reset player
                    this.player.x = spawnX;
                    this.player.y = spawnY;
                    this.player.scale = 1;
                    this.player.gravityState = 0;
                    

                    //undo gameOver flag
                    this.gameOver = false;
                },
                onCompleteScope: this,
            });
        }
    }

    nextLevel() {
        if (lastLevelCompleted < 6) {
            lastLevelCompleted = 6;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("first2");
    }
}
