class Level0 extends Phaser.Scene {
    constructor() {
        super("Level0");
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('block', './assets/shit.png');
        this.load.image('block2', './assets/ass.png');
       
       
       
       
        this.load.tilemapCSV('map', './tilemaps/testTilemap1.csv'); //csv file
        this.load.image('tiles', './assets/factory_tileset.png'); //tileset for that csv (you can have different ones if you want)
    }

    create() {

        this.mapConfig = {
            key: 'map',
            tileWidth: 16,
            tileHeight: 16
        }

        this.map = this.make.tilemap(this.mapConfig);
        this.map.setCollision(0); //0 is tile index, we can set specific tiles to have collision i think.
        this.tileset = this.map.addTilesetImage('tilesetImage', 'tiles');

        this.layer = this.map.createStaticLayer(0, this.tileset);
       
        //build level
        this.blocks = this.physics.add.staticGroup();
        
        //player
        this.player = new Player(this, game.config.width/2, game.config.height/2 - 128, 'player', 0);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //physics colliders
        this.physics.add.collider(this.player, this.layer);
        
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