class First3 extends Phaser.Scene {
    constructor() {
        super("first3");
        this.uiCamera = 0;
    }

    preload() {
        this.load.tilemapCSV('first3', './tilemaps/first3.csv');
    }

    create() {
        this.mapConfig = {
            key: 'first3',
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
        this.player = new Player(this, game.config.width - 96, game.config.height - 96, 'player', 0);

        //physics
        this.physics.add.collider(this.player, this.layer);


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
        //this.cameras.main.startFollow(this.player);
        this.player.setRotation(playerRotationValue);
        this.switching = false;

        //ui
        this.uiCamera = this.cameras.add(0, 0, game.config.width, game.config.height);
        this.uiCamera.setScroll(1500, 1500);
        
        this.dialogue = new Dialogue(this, 2012, 1628, 'player', 0, "I'll' be square, I don't even know how we got\nhalf the junk we got here.", 25);
        this.dialogue1Finished = false;
        this.dialogue2Started = false;
    }

    update() {
        //switching gravity towards right
        if (Phaser.Input.Keyboard.JustDown(keyE) && !this.switching) {
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

        //update player
        this.player.update();

        //exit level
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("levelSelect");
        }

        //chain dialogues and stuff
        if (!this.dialogue1Finished && this.dialogue.finished) {
            this.dialogue1Finished = true;
            this.dialogue2 = new Dialogue(this, 2012, 1628, 'player', 0, "I'd rather not know though. All of this hooey gives me\nthe heebie-jeebies.", 25);
            this.dialogue2Started = true;
        }

        if (this.dialogue2Started) {
            if(this.dialogue2.finished) {
                this.dialogue2Started = false;
                this.dialogue2 = new Dialogue(this, 2012, 1628, 'player', 0, "But hey, better to keep all of this garbage away\nfrom the streets I suppose...", 25);
            }
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
        this.time.addEvent({
            delay: rotationSpeed + 75,
            callback: () => {
                this.sound.play('sfx_button');
            }
        });
        this.switching = true;
        this.time.addEvent({
            delay: rotationSpeed * 2,
            callback: () => {
                this.switching = false;
            }
        });
    };

     resetScene(){
        this.scene.restart();
    }

    nextLevel() {
        if (lastLevelCompleted < 8) {
            lastLevelCompleted = 8;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("levelSelect");
    }
}