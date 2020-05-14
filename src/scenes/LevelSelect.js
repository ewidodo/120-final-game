class LevelSelect extends Phaser.Scene {
    constructor() {
        super("levelSelect");
    }

    preload() {

    }

    create() {
        let unlockedConfig = {
            fontFamily: 'Times New Roman Bold',
            fontSize: '22px',
            color: '#000000',
            align: 'left',
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            },  
        };

        let lockedConfig = {
            fontFamily: 'Times New Roman Bold',
            fontSize: '22px',
            color: '#BDBDBD',
            align: 'left',
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            },  
        };

        this.level1 = this.add.rectangle(64, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level2 = this.add.rectangle(192, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level3 = this.add.rectangle(320, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level4 = this.add.rectangle(448, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level5 = this.add.rectangle(576, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);

        this.level1.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            this.scene.start("intro1");
        });

        this.level2.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            this.scene.start("ColinTest");
        });

        this.level3.setInteractive({useHandCursor: true}).on('pointerdown', () => {

        });

        this.level4.setInteractive({useHandCursor: true}).on('pointerdown', () => {

        });

        this.level5.setInteractive({useHandCursor: true}).on('pointerdown', () => {

        });
    }

    update() {
        
    }
}