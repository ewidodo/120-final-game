class ColinTest extends Phaser.Scene {
    constructor() {
        super("ColinTest");
        this.uiCamera = 0;
    }

    preload() {
        this.load.image('player', './assets/fuck.png');
        this.load.image('block', './assets/shit.png');
        this.load.image('block2', './assets/ass.png');
        this.load.image('water', './assets/tempWaterParticle.png');

        this.load.tilemapCSV('map', './tilemaps/intro1.csv');
        this.load.image('tiles', './assets/temptiles.png');
    }

    create() {

        this.mapConfig = {
            key: 'map',
            tileWidth: 64,
            tileHeight: 64
        }

        this.map = this.make.tilemap(this.mapConfig);
        this.map.setCollision(0); //0 is tile index, we can set specific tiles to have collision i think.
        this.map.setCollision(2);
        this.map.setCollision(4);
        this.tileset = this.map.addTilesetImage('tilesetImage', 'tiles');

        this.map.setTileIndexCallback(4, this.nextLevel, this);

        this.layer = this.map.createStaticLayer(0, this.tileset);

        //player
        this.player = new Player(this, 128, game.config.height - 416, 'player', 0);

        //physics
        this.physics.add.collider(this.player, this.layer);

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
        this.isSide = 1; // -1 is walking on walls;

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
        this.testText = this.add.text(1628, 1596, "test UI", scoreConfig).setOrigin(0,0);

        //particles
        this.waterParticles = this.add.particles('water');
        this.waterParticleEmitter = this.waterParticles.createEmitter({
            //follow: this.player,
            //frame: ['trailParticle 0.png'],
            x: game.config.width/2 - 50,
            y: game.config.height/2 - 50,
            alpha: { start: 1, end: 1 },
            scale: { start: 0.2, end: 0 },
            speedX: { min: 500, max: 500 },
            speedY: { min: 0, max: 0},
            frequency: 5,
            quantity: {min : 10, max: 10},
            //angle: { min : 0, max : 360},
            lifespan: 500,
            gravityX:  this.physics.world.gravity.x,
            gravityY:  this.physics.world.gravity.y,
        });
        this.waterParticleEmitter.start();
    }

    update() {
        //switching gravity towards right
        if (Phaser.Input.Keyboard.JustDown(keyE) && !this.switching) {
            rotationValue += Math.PI / 2;
            //console.log(playerRotationValue);
            playerRotationValue -= Math.PI / 2;
            this.player.gravityState++;
            this.player.gravityState %= 4;
            this.updateGravity();
        }

        //switching gravity towards left
        if (Phaser.Input.Keyboard.JustDown(keyQ) && !this.switching) {
            rotationValue -= Math.PI / 2;
            //console.log(playerRotationValue);
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

    nextLevel() {
        lastLevelCompleted = 1;
        localStorage.setItem('progress', lastLevelCompleted);
        this.scene.start("levelSelect");
    }

    updateGravity() {
        if(this.isSide == 1) {
            this.isSide = -1;
        } else {
            this.isSide = 1;
        }
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
        //console.log(playerRotationValue);

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
        //console.log(playerRotationValue);
        console.log(" X :" + this.physics.world.gravity.x);
        console.log(" Y :" + this.physics.world.gravity.y);
        //prevent player from switching too frequently
        this.switching = true;
        this.time.addEvent({
            delay: rotationSpeed * 2,
            callback: () => {
                this.switching = false;
            }
        });
        this.waterParticleEmitter.setSpeedX(100);
        
        this.waterParticleEmitter.gravityY = 1000 * this.isSide ;
    };
    

}