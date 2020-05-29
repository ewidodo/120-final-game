class Intro3 extends Phaser.Scene {
    constructor() {
        super("intro3");
        this.uiCamera = 0;
    }

    create() {
        this.mapConfig = {
            key: 'introButton',
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
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //player
        spawnX = 96;
        spawnY = game.config.height - 360;
        this.player = new Player(this, spawnX, spawnY, 'player', 0);
        this.player.setSize(32, 64, true);
        this.button = this.physics.add.sprite(game.config.width / 2, game.config.height - 416, 'button');

        //physics
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.button, this.layer);
        this.physics.add.overlap(this.player, this.button, this.pickup, null, this);

        //camera & gravity
        rotationValue = 0;
        playerRotationValue = 0;
        this.cameras.main.setRotation(rotationValue);
        this.player.setRotation(playerRotationValue);
        this.switching = false;
        this.canSwitch = false;
        this.rotator = new RotationManager(this, 0, 0 , 'player', 0);

        //ui
        this.uiCamera = this.cameras.add(0, 0, game.config.width, game.config.height);
        this.uiCamera.setScroll(1500, 1500);

        this.dialogue = new Dialogue(this, 2012, 1628, 'player', 0, "The warehouse gets applesaucey up ahead, so grab that\nbutton, it'll be useful.", 20, 11, 3000);

        this.dialogue2 = 0;
        this.dialogue3 = 0;
        this.dialogue1Finished = false;
        this.dialogue2Started = false;
        this.dialogue3Started = false;
        this.firstSwitch = false;

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

        let instructionConfig = {
            fontFamily: 'Times New Roman Bold',
            fontSize: '26px',
            color: '#000000',
            align: 'left',
            padding: {
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
            },
        }

        this.testText = this.add.text(2012, 1628, "", instructionConfig).setOrigin(0.5);
    }

    update() {
        if (this.canSwitch) {
            //switching gravity towards right
            if ((Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyRIGHT)) && !this.switching) {
                if (this.firstSwitch == false) {
                    this.switchDialogue();
                    this.firstSwitch = true;
                }
                this.rotator.updateGravityRight();
            }

            //switching gravity towards left
            if ((Phaser.Input.Keyboard.JustDown(keyQ) || Phaser.Input.Keyboard.JustDown(keyLEFT)) && !this.switching) {
                if (this.firstSwitch == false) {
                    this.switchDialogue();
                    this.firstSwitch = true;
                }   
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
        if (!this.dialogue1Finished) {
            this.dialogue.update();
            if (this.dialogue.finished) {
                this.dialogue1Finished = true;
            }
        }

        if (this.dialogue2Started) {
            this.dialogue2.update();
            if (this.dialogue2.finished) {
                this.dialogue2Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue3 = new Dialogue(this, 2012, 1628, 'player', 0, "That button switches the gravity of the room you're in.\nShould've said that earlier, but we gotta breeze through.", 25, 11, 3000);
                        this.dialogue3Started = true;
                    }
                });
            }
        }

        if (this.dialogue3Started) {
            this.dialogue3.update()
            if (this.dialogue3.finished) {
                this.dialogue3Started = false;
            }
        }
    }

    pickup() {
        this.button.destroy();
        if (!this.dialogue1Finished){
            this.dialogue.deleteDialogue();
            this.time.addEvent({
                delay: 400,
                callback: () => {
                    this.testText.setText("Q or ← to rotate left\nE or → to rotate right");
                    this.canSwitch = true;
                }
            });     
        } else {
            this.testText.setText("Q or ← to rotate left\nE or → to rotate right");
            this.canSwitch = true;
        }
    }

    switchDialogue() {
        this.testText.destroy();
        this.dialogue2 = new Dialogue(this, 2012, 1628, 'player', 0, "HEY WHAT THE HELL???\nWhat did that just do?!", 10, 4, 2500);
        this.dialogue2Started = true;
    }

    nextLevel() {
        if (lastLevelCompleted < 3) {
            lastLevelCompleted = 3;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("intro4");
    }
}