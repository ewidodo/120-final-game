//Jamo's scene for testing
class Test extends Phaser.Scene {
    constructor() {
        super("testScene");
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('block', './assets/shit.png');
        this.load.image('block2', './assets/ass.png');
    }

    create() {

        //build walls       
        this.wall1 = this.physics.add.sprite(0,0,'block').setOrigin(0,0).setScale(1,16);
            this.wall1.body.setImmovable(true);
            this.wall1.body.setAllowGravity(false);

        this.wall2 = this.physics.add.sprite(game.config.width-64,0,'block').setOrigin(0,0).setScale(1,16);
            this.wall2.body.setImmovable(true);
            this.wall2.body.setAllowGravity(false);

        this.wall3 = this.physics.add.sprite(0,game.config.height-64,'block').setOrigin(0,0).setScale(16,1);
            this.wall3.body.setImmovable(true);
            this.wall3.body.setAllowGravity(false);

        this.wall4 = this.physics.add.sprite(0,0,'block').setOrigin(0,0).setScale(16,1);
            this.wall4.body.setImmovable(true);
            this.wall4.body.setAllowGravity(false);
        
       
        //build level
        this.blocks = this.physics.add.staticGroup();
        //middle
        this.blocks.create(game.config.width/2, game.config.height/2, 'block2').setOrigin(0.5);
        //this.blocks.getChildren().body.setCircle(64)

        //this.blocks.create(32, 32, 'block')//.setOrigin(0,0);
        //this.blocks.create(game.config.width - 32, 32, 'block')//.setOrigin(0,0);
        //this.wallBlocks.create(game.config.width - 64, 0, 'block');
        //this.wallBlocks.create(game.config.width - 64, 0, 'block');

        // this.blocks.create(game.config.width/2 + 128, game.config.height/2 - 64, 'block')
        // this.blocks.create(game.config.width/2 + 128, game.config.height/2 - 128, 'block')

        // this.blocks.create(game.config.width/2 - 128, game.config.height/2 - 64, 'block')
        // this.blocks.create(game.config.width/2 - 128, game.config.height/2 - 128, 'block')

        // this.blocks.create(game.config.width/2, game.config.height/2 - 192, 'block');
        // this.blocks.create(game.config.width/2 - 64, game.config.height/2 - 192, 'block');
        // this.blocks.create(game.config.width/2 + 64, game.config.height/2 - 192, 'block');

        //player
        this.player = new Player(this, game.config.width/2, game.config.height/2 - 128, 'player', 0);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //physics
        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.player, this.wall1);
        this.physics.add.collider(this.player, this.wall2);
        this.physics.add.collider(this.player, this.wall3);
        this.physics.add.collider(this.player, this.wall4);

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
        //this.cameras.main.startFollow(this.player);
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

        //update player
        this.player.update();
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
    }
}