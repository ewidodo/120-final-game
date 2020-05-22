class Intro3 extends Phaser.Scene {
    constructor() {
        super("intro3");
        this.uiCamera = 0;
    }

    preload() {
        this.load.image('button', './assets/ass.png');
        this.load.tilemapCSV('introButton', './tilemaps/introButton.csv');
    }

    create() {
        this.mapConfig = {
            key: 'introButton',
            tileWidth: 64,
            tileHeight: 64
        }

        this.map = this.make.tilemap(this.mapConfig);
        this.map.setCollision(0); //0 is tile index, we can set specific tiles to have collision i think.
        this.map.setCollision(2);
        this.tileset = this.map.addTilesetImage('tilesetImage', 'tiles');

        this.layer = this.map.createStaticLayer(0, this.tileset);

        //collision events
        this.map.setTileIndexCallback(4, this.nextLevel, this);


        //player
        this.player = new Player(this, 96, game.config.height - 360, 'player', 0);
        this.button = this.physics.add.sprite(game.config.width / 2, game.config.height - 416, 'button');

        //physics
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.button, this.layer);
        this.physics.add.overlap(this.player, this.button, this.pickup, null, this);

        
        //keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //camera & gravity
        rotationValue = 0;
        playerRotationValue = 0;
        this.cameras.main.setRotation(rotationValue);
        this.player.setRotation(playerRotationValue);
        this.switching = false;
        this.canSwitch = false;

        //ui
        this.uiCamera = this.cameras.add(0, 0, game.config.width, game.config.height);
        this.uiCamera.setScroll(1500, 1500);

        this.dialogue = new Dialogue(this, 2012, 1628, 'player', 0, "OK, that's the button you have to pack up.\nPick it up and whatever you do, do NOT press it...", 2000);
        this.dialogue1Finished = false;
        this.time.addEvent({
            delay: 2700,
            callback: () => {
                this.dialogue1Finished = true;
            }
        })
        this.firstSwitch = false;
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
            if (Phaser.Input.Keyboard.JustDown(keyE) && !this.switching) {
                if (this.firstSwitch == false) {
                    this.switchDialogue();
                }
                this.firstSwitch = true;
                this.time.delayedCall(10, () => {
                    this.sound.play('sfx_switch');
                });
                rotationValue += Math.PI / 2;
                console.log(playerRotationValue);
                playerRotationValue -= Math.PI / 2;
                this.player.gravityState++;
                this.player.gravityState %= 4;
                this.updateGravity();
            }

            //switching gravity towards left
            if (Phaser.Input.Keyboard.JustDown(keyQ) && !this.switching) {
                if (this.firstSwitch == false) {
                    this.switchDialogue();
                }
                this.firstSwitch = true;
                this.time.delayedCall(10, () => {
                    this.sound.play('sfx_switch');
                });
                rotationValue -= Math.PI / 2;
                console.log(playerRotationValue);
                playerRotationValue += Math.PI / 2;
                this.player.gravityState--;
                if (this.player.gravityState < 0) {
                    this.player.gravityState = 3;
                }
                this.updateGravity();
            }
        }

        //update player
        this.player.update();

        //exit level
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("levelSelect");
        }
    }

    updateGravity() {
        this.physics.world.gravity.x = Math.sin(rotationValue) * gravityStrength;
        this.physics.world.gravity.y = Math.cos(rotationValue) * gravityStrength;

        this.tweens.add({
            targets: this.cameras.main,
            rotation: rotationValue,
            duration: rotationSpeed,
            ease: 'Power',
            repeat: 0,
            yoyo: false,
        });

        playerRotationValue %= Math.PI * 2;
        console.log(playerRotationValue);

        this.tweens.add({
            targets: this.player,
            rotation: playerRotationValue,
            duration: rotationSpeed,
            ease: 'Power',
            repeat: 0,
            yoyo: false,
        });

        if (playerRotationValue > 0) {
            playerRotationValue -= Math.PI * 2;
        }
        console.log(playerRotationValue);

        //prevent player from switching too frequently
        this.switching = true;
        this.time.addEvent({
            delay: rotationSpeed + 100,
            callback: () => {
                this.sound.play('sfx_button');
            }
        });
        this.time.addEvent({
            delay: rotationSpeed * 2,
            callback: () => {
                this.switching = false;
            }
        });
    };

    pickup() {
        this.button.destroy();
        if (!this.dialogue1Finished){
            this.dialogue.deleteDialogue();
            this.dialogue.finished = true;
            this.time.addEvent({
                delay: 410,
                callback: () => {
                    this.testText.setText("Q to switch gravity left\nE to switch gravity right");
                    this.canSwitch = true;
                }
            });     
        } else {
            this.testText.setText("Q to switch gravity left\nE to switch gravity right");
            this.canSwitch = true;
        }
    }

    switchDialogue(){
        this.testText.destroy();
        this.dialogue2 = new Dialogue(this, 2012, 1628, 'player', 0, "WHAT DID YOU DO???\nOh god I hear everything breaking...", 2500);
        this.time.addEvent({
            delay: 3200,
            callback: () => {
                this.dialogue3 = new Dialogue(this, 2012, 1628, 'player', 0, "Look gal, if you want to keep your job, you best get to fixin'\nall of this before the big cheese finds out. No dewdropping!", 3000);
            }
        });
    }

    nextLevel() {
        if (lastLevelCompleted < 3) {
            lastLevelCompleted = 3;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("intro4");
    }
}