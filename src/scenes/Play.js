class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('block', './assets/shit.png');
        this.load.image('block2', './assets/ass.png');
    }

    create() {
        //build level
        this.blocks = this.physics.add.staticGroup();
        this.blocks.create(game.config.width/2, game.config.height/2, 'block2');
        this.blocks.create(game.config.width/2 - 64, game.config.height/2, 'block');
        this.blocks.create(game.config.width/2 + 64, game.config.height/2, 'block');

        this.blocks.create(game.config.width/2 + 128, game.config.height/2 - 64, 'block')
        this.blocks.create(game.config.width/2 + 128, game.config.height/2 - 128, 'block')

        this.blocks.create(game.config.width/2 - 128, game.config.height/2 - 64, 'block')
        this.blocks.create(game.config.width/2 - 128, game.config.height/2 - 128, 'block')

        this.blocks.create(game.config.width/2, game.config.height/2 - 192, 'block');
        this.blocks.create(game.config.width/2 - 64, game.config.height/2 - 192, 'block');
        this.blocks.create(game.config.width/2 + 64, game.config.height/2 - 192, 'block');

        this.blocks.create(480, 480, 'block');

        //player
        this.player = new Player(this, game.config.width/2, game.config.height/2 - 128, 'player', 0);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //physics
        this.physics.add.collider(this.player, this.blocks);

        //keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //camera & gravity
        rotationValue = 0;
        this.rotating = false;
        this.cameras.main.setRotation(rotationValue);
        this.cameras.main.startFollow(this.player);
        this.switching = false;
    }

    update() {
        //switching gravity towards right
        if (Phaser.Input.Keyboard.JustDown(keyE) && !this.switching) {
            rotationValue += Math.PI / 2;
            this.player.gravityState++;
            this.player.gravityState %= 4;
            this.updateGravity();
        }

        //switching gravity towards left
        if (Phaser.Input.Keyboard.JustDown(keyQ) && !this.switching) {
            rotationValue -= Math.PI / 2;
            this.player.gravityState--;
            if (this.player.gravityState < 0) {
                this.player.gravityState = 3;
            }
            this.updateGravity();
        }

        //handle player movement
        if (keyA.isDown) {
            //move left
            //figure out whether moving left/right happens in X or Y axis
            //do not alter velocity in vertical axis
            if (this.player.gravityState % 2 == 0) {
                this.player.setVelocityX(Math.cos(this.player.rotation) * playerSpeed * -1);
            }
            if (this.player.gravityState % 2 == 1) {
                this.player.setVelocityY(Math.sin(this.player.rotation) * playerSpeed * -1);
            }
            this.player.flipX = true;

        } else if (keyD.isDown) {
            //move right
            //figure out whether moving left/right happens in X or Y axis
            //do not alter velocity in vertical axis
            if (this.player.gravityState % 2 == 0) {
                this.player.setVelocityX(Math.cos(this.player.rotation) * playerSpeed);
            }
            if (this.player.gravityState % 2 == 1) {
                this.player.setVelocityY(Math.sin(this.player.rotation) * playerSpeed);
            }
            this.player.flipX = false;

        } else {
            //not moving, check if player is on ground on the correct side of the screen
            if (this.player.gravityState == 0) { //bottom
                if (this.player.body.touching.down) {
                    //on ground and not moving
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                } else {

                }
            }
            if (this.player.gravityState == 1) { //right
                if (this.player.body.touching.right) {
                    //on ground and not moving
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                } else {

                }
            }
            if (this.player.gravityState == 2) { // top
                if (this.player.body.touching.up) {
                    //on ground and not moving
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                } else {

                }
            }
            if (this.player.gravityState == 3) { //left
                if (this.player.body.touching.left) {
                    //on ground and not moving
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                } else {

                }
            }
        }
    }

    updateGravity() {
        this.physics.world.gravity.x = Math.sin(rotationValue) * gravityStrength;
        this.physics.world.gravity.y = Math.cos(rotationValue) * gravityStrength;

        this.tweens.add({
            targets: this.cameras.main,
            rotation: rotationValue,
            duration: 350,
            ease: 'Power',
            repeat: 0,
            yoyo: false,
        });
        this.tweens.add({
            targets: this.player,
            rotation: rotationValue * -1,
            duration: 350,
            ease: 'Power',
            repeat: 0,
            yoyo: false,
        });

        //prevent player from switching too frequently
        this.switching = true;
        this.time.addEvent({
            delay: 700,
            callback: () => {
                this.switching = false;
            }
        });
    }
}