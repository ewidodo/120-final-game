class Intro2 extends Phaser.Scene {
    constructor() {
        super("intro2");
        this.uiCamera = 0;
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

        //keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //player
        spawnX = 96;
        spawnY = 224;
        this.player = new Player(this, spawnX, spawnY, 'player', 0);
        this.player.setSize(32, 64);
        this.gameOver = false;

        //physics
        this.physics.add.collider(this.player, this.layer);

        //camera & gravity
        rotationValue = 0;
        playerRotationValue = 0;
        this.cameras.main.setRotation(rotationValue);
        this.player.setRotation(playerRotationValue);
        this.switching = false;

        //ui
        this.uiCamera = this.cameras.add(0, 0, game.config.width, game.config.height);
        this.uiCamera.setScroll(1500, 1500);

        this.dialogue = new Dialogue(this, 2012, 2396, 'player', 0, "Hey, what's all this red gunk on the floor?", 20, 2, 3000);
        this.dialogue1Finished = false;
        this.dialogue2Started = false;

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
                        this.dialogue2 = new Dialogue(this, 2012, 2396, 'player', 0, "Some sorta top secret slime...\nit does a whole lotta baloney, so watch your pins.", 20, 11, 2500);
                        this.dialogue2Started = true;
                    }
                });
            }
        }

        if (this.dialogue2Started) {
            this.dialogue2.update();
            if (this.dialogue2.finished) {
                this.dialogue2Started = false;
            }
        }
    }

    resetScene() {
        if (!this.gameOver) {
            this.gameOver = true;
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
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
                    //reset player
                    this.player.x = spawnX;
                    this.player.y = spawnY;
                    this.player.scale = 1;

                    //undo gameOver flag
                    this.gameOver = false;
                },
                onCompleteScope: this,
            });
        }
    }

    nextLevel() {
        if (lastLevelCompleted < 2) {
            lastLevelCompleted = 2;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("intro3");
    }
}
