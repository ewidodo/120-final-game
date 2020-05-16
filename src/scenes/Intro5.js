class Intro5 extends Phaser.Scene {
    constructor() {
        super("intro5");
        this.uiCamera = 0;
    }

    preload() {
        this.load.tilemapCSV('introCorner', './tilemaps/introCorner.csv');
    }

    create() {
        this.mapConfig = {
            key: 'introCorner',
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
        this.player = new Player(this, game.config.width - 96, 160, 'player', 0);

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
        let scoreConfig = {
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
        
        this.testText = this.add.text(2012, 1628, "", scoreConfig).setOrigin(0.5);
    }

    update() {
        //switching gravity towards right
        if (Phaser.Input.Keyboard.JustDown(keyE) && !this.switching) {
            this.sound.play('sfx_button');
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
            this.sound.play('sfx_button');
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
        if (lastLevelCompleted < 5) {
            lastLevelCompleted = 5;
            localStorage.setItem('progress', lastLevelCompleted);
        }
        this.scene.start("levelSelect");
    }
}
