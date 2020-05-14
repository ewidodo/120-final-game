class Test2 extends Phaser.Scene {
    constructor() {
        super("testScene");
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('block', './assets/shit.png');
        this.load.image('block2', './assets/ass.png');
       
       
       
       
        this.load.tilemapCSV('map', './tilemaps/introGrav1.csv');
        this.load.image('tiles', './assets/temptiles.png');
    }

    create() {

        //build walls       
        // this.wall1 = this.physics.add.sprite(0,0,'block').setOrigin(0,0).setScale(1,16);
        //     this.wall1.body.setImmovable(true);
        //     this.wall1.body.setAllowGravity(false);

        // this.wall2 = this.physics.add.sprite(game.config.width-64,0,'block').setOrigin(0,0).setScale(1,16);
        //     this.wall2.body.setImmovable(true);
        //     this.wall2.body.setAllowGravity(false);

        // this.wall3 = this.physics.add.sprite(0,game.config.height-64,'block').setOrigin(0,0).setScale(16,1);
        //     this.wall3.body.setImmovable(true);
        //     this.wall3.body.setAllowGravity(false);

        // this.wall4 = this.physics.add.sprite(0,0,'block').setOrigin(0,0).setScale(16,1);
        //     this.wall4.body.setImmovable(true);
        //     this.wall4.body.setAllowGravity(false);
        
        this.mapConfig = {
            key: 'map',
            tileWidth: 64,
            tileHeight: 64
        }

        this.map = this.make.tilemap(this.mapConfig);
        this.map.setCollision(0); //0 is tile index, we can set specific tiles to have collision i think.
        this.map.setCollision(2);
        this.map.setCollision(3);
        this.tileset = this.map.addTilesetImage('tilesetImage', 'tiles');

        this.layer = this.map.createStaticLayer(0, this.tileset);

        //This function calls resetScene when the player collides with a damage tile.
        //3 is the tile index
        this.map.setTileIndexCallback(3, this.resetScene, this);
       
       

        //player
        this.player = new Player(this, 900, 100, 'player', 0);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(30,30);

        //physics
        this.physics.add.collider(this.player, this.layer);

        
        //keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

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
        if (Phaser.Input.Keyboard.JustDown(keyRight) && !this.switching) {
            rotationValue += Math.PI / 2;
            console.log(playerRotationValue);
            playerRotationValue -= Math.PI / 2;
            this.player.gravityState++;
            this.player.gravityState %= 4;
            this.updateGravity();
        }

        //switching gravity towards left
        if (Phaser.Input.Keyboard.JustDown(keyLeft) && !this.switching) {
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

     resetScene(){
        this.scene.restart();
    }
}