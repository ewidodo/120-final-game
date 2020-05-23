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
            align: 'center',
            padding: {
                top: 20,
                bottom: 20,
                left: 27,
                right: 27,
            },
        };
        let lockedConfig = {
            fontFamily: 'Times New Roman Bold',
            fontSize: '22px',
            color: '#BDBDBD',
            align: 'center',
            padding: {
                top: 20,
                bottom: 20,
                left: 27,
                right: 27,
            },
        };

        this.level1 = this.add.rectangle(64, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level2 = this.add.rectangle(192, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level3 = this.add.rectangle(320, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level4 = this.add.rectangle(448, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level5 = this.add.rectangle(576, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level6 = this.add.rectangle(704, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level7 = this.add.rectangle(832, 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
        this.level8 = this.add.rectangle(64, 192, 64, 64, 0xFFFFFF).setOrigin(0,0);
        
        this.level1Text = this.add.text(64, 64, "1", unlockedConfig).setOrigin(0, 0);
        this.level1.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            this.scene.start("intro1");
        });

        if(lastLevelCompleted  >= 1){
            this.level2Text = this.add.text(192, 64, "2", unlockedConfig).setOrigin(0, 0);
             this.level2.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            this.scene.start("intro2");
            });
        } else {
            this.level2Text = this.add.text(192, 64, "2", lockedConfig).setOrigin(0, 0);
        }
       
        if(lastLevelCompleted  >= 2){
            this.level3Text = this.add.text(320, 64, "3", unlockedConfig).setOrigin(0, 0);
            this.level3.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("intro3");
            });
        } else {
            this.level3Text = this.add.text(320, 64, "3", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 3){
            this.level4Text = this.add.text(448, 64, "4", unlockedConfig).setOrigin(0, 0);
            this.level4.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("intro4");
            });
        } else {
            this.level4Text = this.add.text(448, 64, "4", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 4){
            this.level5Text = this.add.text(576, 64, "5", unlockedConfig).setOrigin(0, 0);
            this.level5.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("intro5");
            });
        } else {
            this.level5Text = this.add.text(576, 64, "5", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 5){
            this.level6Text = this.add.text(704, 64, "6", unlockedConfig).setOrigin(0, 0);
            this.level6.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first1");
            });
        } else {
            this.level6Text = this.add.text(704, 64, "6", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 6){
            this.level7Text = this.add.text(832, 64, "7", unlockedConfig).setOrigin(0, 0);
            this.level7.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first2");
            });
        } else {
            this.level7Text = this.add.text(832, 64, "7", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 7){
            this.level8Text = this.add.text(64, 192, "8", unlockedConfig).setOrigin(0, 0);
            this.level8.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first3");
            });
        } else {
            this.level8Text = this.add.text(64, 192, "8", lockedConfig).setOrigin(0, 0);
        }
    }

    update() {

    }
}
