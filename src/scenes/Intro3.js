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

        this.dialogue = new Dialogue(this, 2012, 1628, 'player', 0, "OK, that's the button you have to pack up.\nPick it up and whatever you do, do NOT press it...", 25);

        this.dialogue2 = 0;
        this.dialogue3 = 0;
        this.dialogue1Finished = false;
        this.dialogue2Started = false;
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
                        this.dialogue3 = new Dialogue(this, 2012, 1628, 'player', 0, "Look gal, if you want to keep your job, you best get to fixin'\nall of this before the big cheese finds out. No dewdropping!", 25);
                    }
                });
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
        this.dialogue2 = new Dialogue(this, 2012, 1628, 'player', 0, "WHAT DID YOU DO???\nOh god I hear everything breaking...", 10);
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