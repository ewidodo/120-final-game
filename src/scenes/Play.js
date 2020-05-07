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
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //camera & gravity
        rotationValue = 0;
        playerRotationValue = 0;
        this.cameras.main.setRotation(rotationValue);
        this.cameras.main.startFollow(this.player);
        this.player.setRotation(playerRotationValue);
        this.switching = false;
    }

    update() {
        //switching gravity towards right
        if (Phaser.Input.Keyboard.JustDown(keyE) && !this.switching) {
            rotationValue += Math.PI / 2;
            console.log(playerRotationValue);
            playerRotationValue -= Math.PI / 2;
            this.player.gravityState++;
            this.player.gravityState %= 4;
            this.updateGravity();
        }

        //switching gravity towards left
        if (Phaser.Input.Keyboard.JustDown(keyQ) && !this.switching) {
            rotationValue -= Math.PI / 2;
            console.log(playerRotationValue);
            playerRotationValue += Math.PI / 2;
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
            //not moving, set relative horizontal movement to 0
            if (this.player.gravityState % 2 == 0) {
                this.player.setVelocityX(0);
            }
            if (this.player.gravityState % 2 == 1) {
                this.player.setVelocityY(0);
            }
        }

        //jumping
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.player.isJumping && !this.switching) {
            this.player.isJumping = true;
            if (this.player.gravityState % 2 == 1) {
                this.player.setVelocityX(Math.sin(rotationValue) * jumpSpeed);
                console.log(this.player.body.velocity.x);
            }
            if (this.player.gravityState % 2 == 0) {
                this.player.setVelocityY(Math.cos(rotationValue) * jumpSpeed);
                console.log(this.player.body.velocity.y);
            }
        }

        if (this.player.gravityState == 0 && this.player.body.touching.down) { //bottom
            this.player.isJumping = false;
        }
        if (this.player.gravityState == 1 && this.player.body.touching.right) { //right
            this.player.isJumping = false;
        }
        if (this.player.gravityState == 2 && this.player.body.touching.up) { // top
            this.player.isJumping = false;
        }
        if (this.player.gravityState == 3 && this.player.body.touching.left) { //left
            this.player.isJumping = false;
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

        playerRotationValue %= Math.PI * 2;
        console.log(playerRotationValue);

        this.tweens.add({
            targets: this.player,
            rotation: playerRotationValue,
            duration: 350,
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
            delay: 700,
            callback: () => {
                this.switching = false;
            }
        });
    }
}