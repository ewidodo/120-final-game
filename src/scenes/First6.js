class First6 extends Phaser.Scene {
    constructor() {
        super("first6");
        this.uiCamera = 0;
    }

    create() {
        this.cameras.main.fadeIn(650, 0, 0, 0);
        this.mapConfig = {
            key: 'first6',
            tileWidth: 64,
            tileHeight: 64
        }

        this.map = this.make.tilemap(this.mapConfig);
        this.map.setCollisionBetween(4, 10);
        this.map.setCollisionBetween(14, 20);
        this.map.setCollisionBetween(24, 35);
        this.map.setCollisionBetween(38, 45);
        this.map.setCollisionBetween(48, 85);
        this.tileset = this.map.addTilesetImage('tilesetImage', 'tiles');

        this.layer = this.map.createStaticLayer(0, this.tileset);

        //collision events
        this.map.setTileIndexCallback(
            [54, 55, 56, 57, 58, 62, 63, 64, 65, 66, 68, 72, 76, 77, 78, 82, 83, 84, 85],
            this.resetScene, this);
        this.map.setTileIndexCallback(
            [16, 17, 26, 27],
            this.nextLevel, this);

        //player
        spawnX = 96;
        spawnY = game.config.height - 416;
        this.player = new Player(this, spawnX, spawnY, 'player', 0);
        this.player.setSize(32, 64, true);
        this.gameOver = false;
        this.door = false;

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
        
        this.dialogue = new Dialogue(this, 2012, 1564, 'player', 0, "Uh, when are we going to get to the owl? Feels like\nI've been circling for a while now...", 20, 3, 3000);
        this.dialogue1Finished = false;
        this.dialogue2Started = false;
        this.dialogue3Started = false;
        this.dialogue4Started = false;

        //music
        if (!bgm_lvl.isPlaying) {
            bgm_lvl.play();
        }
        if (bgm_menu.isPlaying) {
            bgm_menu.stop();
        }

        thud.setVolume(0);
        this.time.delayedCall(200, () => {
            thud.setVolume(1);
        });
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
            this.transition("levelSelect");
        }

        //chain dialogues and stuff
        if (!this.dialogue1Finished) {
            this.dialogue.update();
            if (this.dialogue.finished) {
                this.dialogue1Finished = true;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue2 = new Dialogue(this, 2012, 1564, 'player', 0, "Hold onto your socks, it's going to be in the next room.", 20, 11, 3000);
                        this.dialogue2Started = true;
                    }
                });
            }
        }

        if (this.dialogue2Started) {
            this.dialogue2.update();
            if (this.dialogue2.finished) {
                this.dialogue2Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue3 = new Dialogue(this, 2012, 1564, 'player', 0, "I swear if it's not in the next room I might just\nsock you for the hoot of it.", 20, 3, 3000);
                        this.dialogue3Started = true;
                    }
                });
            }
        }

        if (this.dialogue3Started) {
            this.dialogue3.update();
            if (this.dialogue3.finished) {
                this.dialogue3Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue4 = new Dialogue(this, 2012, 1564, 'player', 0, "Look, just... believe me, it's there.", 10, 12, 3000);
                        this.dialogue4Started = true;
                    }
                });
            }
        }

        if (this.dialogue4Started) {
            this.dialogue4.update();
            if (this.dialogue4.finished) {
                this.dialogue4Started = false;
            }
        }
    }

    resetScene() {
        this.rotator.resetScene();
    }

    nextLevel() {
        this.dialogue1Finished = true;
        this.dialogue2Started = false;
        this.dialogue3Started = false;
        this.dialogue4Started = false;
        if (lastLevelCompleted < 8) {
            lastLevelCompleted = 8;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        if(this.door == false){
            this.transition("levelSelect");
        }
        
        this.door = true;
    }

    
    transition(sceneString) {
        this.time.addEvent({
            delay: 0,
            callback: () => {
                this.cameras.main.fadeOut(400, 0, 0, 0);
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.time.addEvent({
                        delay: 400,
                        callback: () => {
                            this.scene.start(sceneString);
                        }
                    })
                });
            }
        });
    }
}
