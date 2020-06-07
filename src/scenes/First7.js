class First7 extends Phaser.Scene {
    constructor() {
        super("first7");
        this.uiCamera = 0;
    }

    create() {
        this.cameras.main.fadeIn(transitionSpeed, 0, 0, 0);
        this.cameras.main.setBackgroundColor("#2A2A2A");
        this.mapConfig = {
            key: 'first7',
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
        this.boye = this.add.sprite(game.config.width - 192, game.config.height - 299, 'boye');
        this.boye.anims.play('boye');
        this.acquired = false;
        //spawnX = 96;
        //spawnY = 224;
        spawnX = 96;
        spawnY = 224;
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
        
        this.dialogue = new Dialogue(this, 2012, 1564, 'player', 0, "I think I see it! Guess I don't get to sock you then.", 20, 5, 3000);
        this.dialogue1Finished = false;
        this.dialogue2Started = false;
        this.dialogue3Started = false;
        this.dialogue4Started = false;
        this.dialogue5Started = false;
        this.dialogue6Started = false;
        this.dialogue7Started = false;
        this.dialogue8Started = false;
        this.dialogue9Started = false;
        this.dialogue10Started = false;
        this.dialogue11Started = false;
        
        this.transitioning = false;

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
                if (!this.acquired) {
                    this.rotator.updateGravityRight();
                }
            }

            //switching gravity towards left
            if ((Phaser.Input.Keyboard.JustDown(keyQ) || Phaser.Input.Keyboard.JustDown(keyLEFT)) && !this.switching) {
                if (!this.acquired) {
                    this.rotator.updateGravityLeft();
                }
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

        //check if you picked up the owl
        if (!this.acquired) {
            if (this.player.x < this.boye.x + this.boye.width - 6 &&
                this.player.x + this.player.width > this.boye.x + 6 &&
                this.player.y < this.boye.y + this.boye.height - 6 &&
                this.player.y + this.player.height > this.boye.y + 6) {
                    this.acquired = true;
                    this.sound.play('sfx_win');
                    this.pickup();
            }
        } else {
            if (this.player.gravityState == 0) {
                this.boye.x = this.player.x;
                this.boye.y = this.player.y - 56;
                this.boye.rotation = this.player.rotation;
            }
            if (this.player.gravityState == 1) {
                this.boye.x = this.player.x - 56;
                this.boye.y = this.player.y;
                this.boye.rotation = this.player.rotation;
            }
            if (this.player.gravityState == 2) {
                this.boye.x = this.player.x;
                this.boye.y = this.player.y + 56;
                this.boye.rotation = this.player.rotation;
            }
            if (this.player.gravityState == 3) {
                this.boye.x = this.player.x + 56;
                this.boye.y = this.player.y;
                this.boye.rotation = this.player.rotation;
            }
        }

        //chain dialogues and stuff
        if (!this.dialogue1Finished) {
            this.dialogue.update();
            if (this.dialogue.finished) {
                this.dialogue1Finished = true;
            }
        }

        if (this.dialogue2Started) {
            if (this.dialogue2.finished) {
                this.dialogue2Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue3 = new Dialogue(this, 2012, 1564, 'player', 0, "...uh, where is the next door?", 25, 6, 3000);
                        this.dialogue3Started = true;
                    }
                });
            }
        }

        if (this.dialogue3Started) {
            if (this.dialogue3.finished) {
                this.dialogue3Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue4 = new Dialogue(this, 2012, 1564, 'player', 0, "Hmm, it appears as if the architects forgot to put the door\nthere, or they haven't built the rest of the warehouse yet.", 20, 11, 3000);
                        this.dialogue4Started = true;
                    }
                });
            }
        }

        if (this.dialogue4Started) {
            if (this.dialogue4.finished) {
                this.dialogue4Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue5 = new Dialogue(this, 2012, 1564, 'player', 0, "What? What do you mean they haven't built the rest of the\nwarehouse yet?", 20, 2, 3000);
                        this.dialogue5Started = true;
                    }
                });
            }
        }

        if (this.dialogue5Started) {
            if (this.dialogue5.finished) {
                this.dialogue5Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue6 = new Dialogue(this, 2012, 1564, 'player', 0, "I think the big cheese once said these rooms are only meant\nas a showcase of what's to come next.", 20, 11, 3000);
                        this.dialogue6Started = true;
                    }
                });
            }
        }

        if (this.dialogue6Started) {
            if (this.dialogue6.finished) {
                this.dialogue6Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue7 = new Dialogue(this, 2012, 1564, 'player', 0, "Wh-, then why use it as a warehouse already?", 10, 4, 3000);
                        this.dialogue7Started = true;
                    }
                });
            }
        }

        if (this.dialogue7Started) {
            if (this.dialogue7.finished) {
                this.dialogue7Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue8 = new Dialogue(this, 2012, 1564, 'player', 0, "The warehouse has floating boxes and danger slime and\nthat's what you're questioning?", 20, 13, 3000);
                        this.dialogue8Started = true;
                    }
                });
            }
        }

        if (this.dialogue8Started) {
            if (this.dialogue8.finished) {
                this.dialogue8Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue9 = new Dialogue(this, 2012, 1564, 'player', 0, "Pfft, whatever.", 20, 3, 2500);
                        this.dialogue9Started = true;
                    }
                });
            }
        }

        if (this.dialogue9Started) {
            if (this.dialogue9.finished) {
                this.dialogue9Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue10 = new Dialogue(this, 2012, 1564, 'player', 0, "...", 2, 3, 1500);
                        this.dialogue10Started = true;
                    }
                });
            }
        }

        if (this.dialogue10Started) {
            if (this.dialogue10.finished) {
                this.dialogue10Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue11 = new Dialogue(this, 2012, 1564, 'player', 0, "Can we get out of this room? My arms are getting tired now.", 2, 3, 2000);
                        this.dialogue11Started = true;
                    }
                });
            }
        }

        if (this.dialogue11Started) {
            if (this.dialogue11.finished) {
                this.dialogue11Started = false;
                //do ending stuff here
                this.transition('finalScreen');
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
        if (lastLevelCompleted < 12) {
            lastLevelCompleted = 12;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        if(this.door == false){
            this.transition("levelSelect");
        }
        
        this.door = true;
    }

    pickup() {
        this.boye.setAlpha(0);
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.gameOver = true;
                if (this.player.gravityState % 2 == 0) {
                    this.player.setVelocityX(0);
                } else {
                    this.player.setVelocityY(0);
                }
                this.boye.setAlpha(1);
                this.dialogue2 = new Dialogue(this, 2012, 1564, 'player', 0, "I DID IT! I got the owl!", 10, 6, 4500);
                this.dialogue2Started = true;
            }
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
            }
            this.time.addEvent({
                delay: 0,
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
