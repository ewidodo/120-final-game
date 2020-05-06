class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('block', './assets/shit.png');
    }

    create() {
        //blocks
        this.blocks = this.physics.add.staticGroup();
        this.blocks.create(game.config.width/2, game.config.height/2, 'block');
        this.blocks.create(game.config.width/2 - 64, game.config.height/2, 'block');
        this.blocks.create(game.config.width/2 + 64, game.config.height/2, 'block');

        this.blocks.create(game.config.width/2 + 128, game.config.height/2 - 64, 'block')
        this.blocks.create(game.config.width/2 + 128, game.config.height/2 - 128, 'block')

        this.blocks.create(game.config.width/2 - 128, game.config.height/2 - 64, 'block')
        this.blocks.create(game.config.width/2 - 128, game.config.height/2 - 128, 'block')

        this.blocks.create(game.config.width/2, game.config.height/2 -192, 'block');
        this.blocks.create(game.config.width/2 - 64, game.config.height/2 - 192, 'block');
        this.blocks.create(game.config.width/2 + 64, game.config.height/2 - 192, 'block');

        //player
        this.player = new Player(this, game.config.width/2, game.config.height/2 - 128, 'player', 0);
        this.player.setCollideWorldBounds(true);

        //physics
        this.physics.add.collider(this.player, this.blocks);

        //keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //camera
        rotation = 0;
        this.rotating = false;
        this.cameras.main.setRotation(rotation);
    }

    update() {
        //switching gravity towards right
        if (Phaser.Input.Keyboard.JustDown(keyE)) {
            rotation += Math.PI / 2;
            this.cameras.main.setRotation(rotation);
            this.updateGravity();
        }

        //switching gravity towards left
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            rotation -= Math.PI / 2;
            this.cameras.main.setRotation(rotation);
            this.updateGravity();
        }
    }

    updateGravity() {
        this.physics.world.gravity.x = Math.sin(rotation) * 300;
        this.physics.world.gravity.y = Math.cos(rotation) * 300;
    }
}