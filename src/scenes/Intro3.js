class Intro3 extends Phaser.Scene {
    constructor() {
        super("intro3");
        this.uiCamera = 0;
    }

    create() {
        this.cameras.main.fadeIn(transitionSpeed, 0, 0, 0);
        this.cameras.main.setBackgroundColor("#2A2A2A");
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
        this.gameOver = false;
        
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
        this.gameOver = false;
        this.door = false;

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

        this.dialogue = new Dialogue(this, 2012, 1564, 'player', 0, "The warehouse gets applesaucey up ahead, so grab that\nbutton, it'll be useful.", 20, 11, 3000);

        this.dialogue2 = 0;
        this.dialogue3 = 0;
        this.dialogue1Finished = false;
        this.dialogue2Started = false;
        this.dialogue3Started = false;
        this.firstSwitch = false;

        this.transitioning = false;

        let numConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '26px',
            color: '#000000',
            align: 'center',
        }
        this.numOutline = this.add.rectangle(game.config.width + 1372, game.config.height + 1436, 128, 64, 0x00000).setOrigin(0, 0).setAlpha(0);
        this.numBox = this.add.rectangle(game.config.width +1376, game.config.height + 1440, 120, 56, 0xFFFFFF).setOrigin(0, 0).setAlpha(0);
        this.numText = this.add.text(game.config.width + 1398, game.config.height + 1456, "Level 3", numConfig).setOrigin(0, 0).setAlpha(0);
        this.tweens.add({
            targets: [this.numOutline, this.numBox, this.numText],
            alpha: 1,
            duration: 500,
            repeat: 0,
            yoyo: 0,
            completeDelay: 1000,
            onComplete: () => {
                this.tweens.add({
                    targets: [this.numOutline, this.numBox, this.numText],
                    alpha: 0,
                    duration: 500,
                    repeat: 0,
                    yoyo: 0,
                });
            }
        });

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

        this.outline = this.add.rectangle(2012, 1628, 328, 96, 0x00000).setOrigin(0.5);
        this.box = this.add.rectangle(2012, 1628, 320, 88, 0xFFFFFF).setOrigin(0.5);
        this.outline.setAlpha(0);
        this.box.setAlpha(0);
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
            if (!this.transitioning) {
                this.sound.play('sfx_select2');
            }
            this.transition("levelSelect");
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
                        this.dialogue3 = new Dialogue(this, 2012, 1564, 'player', 0, "That button switches the gravity you feel. It’s how\nthe jobbies get around here. Now, let’s get a move on.", 25, 11, 3000);
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
                    this.outline.setAlpha(0.45);
                    this.box.setAlpha(0.55);
                    this.testText.setText("Q or ← to rotate left\nE or → to rotate right");
                    this.canSwitch = true;
                }
            });     
        } else {
            this.outline.setAlpha(0.45);
            this.box.setAlpha(0.55);
            this.testText.setText("Q or ← to rotate left\nE or → to rotate right");
            this.canSwitch = true;
        }
    }

    switchDialogue() {
        this.outline.destroy();
        this.box.destroy();
        this.testText.destroy();
        this.dialogue2 = new Dialogue(this, 2012, 1564, 'player', 0, "HEY WHAT THE HELL???\nWhat did that just do?!", 10, 4, 2500);
        this.dialogue2Started = true;
    }

    nextLevel() {
        this.dialogue1Finished = true;
        this.dialogue2Started = false;
        this.dialogue3Started = false;
        this.map.setCollisionBetween(16, 17, false, true, this.layer); //disable collision with the doors and slime
        this.map.setCollisionBetween(26, 27, false, true, this.layer);
        this.map.setTileIndexCallback(
            [54, 55, 56, 57, 58, 62, 63, 64, 65, 66, 68, 72, 76, 77, 78, 82, 83, 84, 85],
            () => {this.b = 1;}, this);
        if (lastLevelCompleted < 3) {
            lastLevelCompleted = 3;
            localStorage.setItem('progress', lastLevelCompleted);
        }

        this.time.delayedCall(150, () => {
            if(this.door == false){
                this.transition("intro4");
            }
    
            if (this.player.gravityState % 2 == 0) {
                this.player.setVelocityX(0);
            } else {
                this.player.setVelocityY(0);
            }
            
            this.gameOver = true;
            this.door = true;
        });
    }


    
    transition(sceneString) {
        if (!this.transitioning) {
            this.transitioning = true;
            if (sceneString == "levelSelect") {
                this.tweens.add({
                    targets: bgm_lvl,
                    volume: 0,
                    duration: transitionSpeed * 1.5,
                    onComplete: () => {
                        bgm_lvl.stop();
                        bgm_lvl.setVolume(bgm_vol);
                    }
                })
            } else {
                this.sound.play('sfx_win');
            }
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.cameras.main.fadeOut(transitionSpeed, 0, 0, 0);
                    this.cameras.main.on('camerafadeoutcomplete', () => {
                        this.time.addEvent({
                            delay: transitionSpeed,
                            callback: () => {
                                this.scene.start(sceneString);
                            }
                        })
                    });
                }
            });
        }
    }
}