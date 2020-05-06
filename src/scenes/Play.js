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
        rotation = 0;
        this.rotating = false;
        this.cameras.main.setRotation(rotation);
        this.switching = false;
    }

    update() {
        //switching gravity towards right
        if (Phaser.Input.Keyboard.JustDown(keyE) && !this.switching) {
            rotation += Math.PI / 2;
            this.cameras.main.setRotation(rotation);
            this.player.setRotation(rotation * -1);
            this.player.gravityState++;
            this.player.gravityState %= 4;
            this.updateGravity();
        }

        //switching gravity towards left
        if (Phaser.Input.Keyboard.JustDown(keyQ) && !this.switching) {
            rotation -= Math.PI / 2;
            this.cameras.main.setRotation(rotation);
            this.player.setRotation(rotation * -1);
            this.player.gravityState--;
            if (this.player.gravityState < 0) {
                this.player.gravityState = 3;
            }
            this.updateGravity();
        }

        //handle player movement
        if (keyA.isDown) {
            //move left
            if (Math.cos(this.player.rotation) != 0) {
                console.log('A x');
                this.player.setVelocityX(Math.cos(this.player.rotation) * playerSpeed * -1);
            }
            if (Math.sin(this.player.rotation) != 0) {
                console.log('A y');
                this.player.setVelocityY(Math.sin(this.player.rotation) * playerSpeed * -1);
            }
        } else if (keyD.isDown) {
            //move right
            if (Math.cos(this.player.rotation) != 0) {
                console.log('B x');
                this.player.setVelocityX(Math.cos(this.player.rotation) * playerSpeed);
            }
            if (Math.sin(this.player.rotation) != 0) {
                console.log('B y');
                this.player.setVelocityY(Math.sin(this.player.rotation) * playerSpeed);
            }
        } else {
            //not moving, check if player is on ground on the correct side of the screen
            if (this.player.gravityState == 0) { //bottom
                if (this.player.body.touching.down) {
                    //on ground and not moving
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                    this.player.onGround = true;
                } else {
                    this.player.onGround = false;
                }
            }
            if (this.player.gravityState == 1) { //right
                if (this.player.body.touching.right) {
                    //on ground and not moving
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                    this.player.onGround = true;
                } else {
                    this.player.onGround = false;
                }
            }
            if (this.player.gravityState == 2) { // top
                if (this.player.body.touching.up) {
                    //on ground and not moving
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                    this.player.onGround = true;
                } else {
                    this.player.onGround = false;
                }
            }
            if (this.player.gravityState == 3) { //left
                if (this.player.body.touching.left) {
                    //on ground and not moving
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                    this.player.onGround = true;
                } else {
                    this.player.onGround = false;
                }
            }
        }

        
    }

    updateGravity() {
        this.physics.world.gravity.x = Math.sin(rotation) * gravityStrength;
        this.physics.world.gravity.y = Math.cos(rotation) * gravityStrength;

        //prevent player from switching too frequently
        this.switching = true;
        this.time.addEvent({
            delay: 750,
            callback: () => {
                this.switching = false;
            }
        });
    }
}