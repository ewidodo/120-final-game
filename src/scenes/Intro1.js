class Intro1 extends Phaser.Scene {
    constructor() {
        super("intro1");
        this.uiCamera = 0;
    }

    create() {
        this.mapConfig = {
            key: 'introJump',
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

        //keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //player
        spawnX = 96;
        spawnY = game.config.height - 416;
        this.player = new Player(this, spawnX, spawnY, 'player', 0);
        this.player.setSize(32, 64, true);

        //physics
        this.physics.add.collider(this.player, this.layer);

        //camera & gravity
        rotationValue = 0;
        playerRotationValue = 0;
        this.cameras.main.setRotation(rotationValue);
        this.player.setRotation(playerRotationValue);

        //ui
        this.uiCamera = this.cameras.add(0, 0, game.config.width, game.config.height);
        this.uiCamera.setScroll(1500, 1500);

        this.dialogue = new Dialogue(this, 2012, 1628, 'player', 0, "Alright, this should be an easy job.\nWe're on the clock here, so no dewdropping now.", 20, 11, 3000);

        this.dialogue1Finished = false;
        this.dialogue2Finished = false;
        this.dialogue2Started = false;
        this.dialogue3Started = false;
        this.dialogue3Finished = false;

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
        //update player
        this.player.update();

        //exit level
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("levelSelect");
        }

        //chain dialogues and stuff
       if (!this.dialogue1Finished) {
           this.dialogue.update();
           if (this.dialogue.finished) {
                this.dialogue1Finished = true;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue2 = new Dialogue(this, 2012, 1628, 'player', 0, "In case ya forgot how to do the Charleston, you can use\nthe A and D keys to move and the W or Space keys to jump.", 20, 11, 4000);
                        this.dialogue2Started = true;
                    }
                });
           }
       }

        if (this.dialogue2Started) {
            this.dialogue2.update();
            if (!this.dialogue2Finished && this.dialogue2.finished) {
                this.dialogue2Started = false;
                this.dialogue2Finished = true;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue3 = new Dialogue(this, 2012, 1628, 'player', 0, "Yeah yeah, I got it, you egg.", 20, 3, 2000);
                        this.dialogue3Started = true;
                }
                });
            }
        }

        if (this.dialogue3Started) {
            this.dialogue3.update();
            if (!this.dialogue3Finished && this.dialogue3.finished) {
                this.dialogue3Started = false;
                this.dialogue3Finished = true;
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        let instructionConfig = {
                            fontFamily: 'Times New Roman',
                            fontSize: '26px',
                            color: '#000000',
                            align: 'center',
                            padding: {
                                top: 15,
                                bottom: 15,
                                left: 15,
                                right: 15
                            },

                        }
                        this.testText = this.add.text(2012, 1628, "A and D to move\nW / Space to jump\nEsc to go back to level select", instructionConfig).setOrigin(0.5);
                    }
                });
            }
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
