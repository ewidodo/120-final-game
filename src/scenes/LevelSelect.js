class LevelSelect extends Phaser.Scene {
    constructor() {
        super("levelSelect");
    }

    preload() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.load.image('bg', './assets/levelSelect.png');
    }

    create() {
        this.bg  = this.add.image( 0, 0,'bg').setOrigin(0,0);
        //change music to menu music
        if (bgm_lvl.isPlaying) {
            bgm_lvl.stop();
        }
        if (!bgm_menu.isPlaying) {
            bgm_menu.play();
        }

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

        this.level1 = this.add.rectangle(192, 192, 64, 64).setOrigin(0,0);
        this.level2 = this.add.rectangle(384, 192, 64, 64).setOrigin(0,0);
        this.level3 = this.add.rectangle(576, 192, 64, 64).setOrigin(0,0);
        this.level4 = this.add.rectangle(768, 192, 64, 64).setOrigin(0,0);
        this.level5 = this.add.rectangle(192, 384, 64, 64).setOrigin(0,0);
        this.level6 = this.add.rectangle(384, 384, 64, 64).setOrigin(0,0);
        this.level7 = this.add.rectangle(576, 384, 64, 64).setOrigin(0,0);
        this.level8 = this.add.rectangle(768, 384, 64, 64).setOrigin(0,0);
        this.level9 = this.add.rectangle(192, 576, 64, 64).setOrigin(0,0);
        this.level10 = this.add.rectangle(384, 576, 64, 64).setOrigin(0,0);
        this.level11 = this.add.rectangle(576, 576, 64, 64).setOrigin(0,0);
        this.level12 = this.add.rectangle(768, 576, 64, 64).setOrigin(0,0);
        
        this.level1Text = this.add.text(192, 192, "1", unlockedConfig).setOrigin(0, 0);
        this.level1.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            this.scene.start("intro1");
        });

        if(lastLevelCompleted  >= 1){
            this.level2Text = this.add.text(384, 192, "2", unlockedConfig).setOrigin(0, 0);
             this.level2.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            this.scene.start("intro2");
            });
        } else {
            this.level2Text = this.add.text(384, 192, "2", lockedConfig).setOrigin(0, 0);
        }
       
        if(lastLevelCompleted  >= 2){
            this.level3Text = this.add.text(576, 192, "3", unlockedConfig).setOrigin(0, 0);
            this.level3.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("intro3");
            });
        } else {
            this.level3Text = this.add.text(576, 192, "3", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 3){
            this.level4Text = this.add.text(768, 192, "4", unlockedConfig).setOrigin(0, 0);
            this.level4.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("intro4");
            });
        } else {
            this.level4Text = this.add.text(768, 192, "4", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 4){
            this.level5Text = this.add.text(192, 384, "5", unlockedConfig).setOrigin(0, 0);
            this.level5.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("intro5");
            });
        } else {
            this.level5Text = this.add.text(192, 384, "5", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 5){
            this.level6Text = this.add.text(384, 384, "6", unlockedConfig).setOrigin(0, 0);
            this.level6.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first1");
            });
        } else {
            this.level6Text = this.add.text(384, 384, "6", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 6){
            this.level7Text = this.add.text(576, 384, "7", unlockedConfig).setOrigin(0, 0);
            this.level7.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first2");
            });
        } else {
            this.level7Text = this.add.text(576, 384, "7", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 7){
            this.level8Text = this.add.text(768, 384, "8", unlockedConfig).setOrigin(0, 0);
            this.level8.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first3");
            });
        } else {
            this.level8Text = this.add.text(768, 384, "8", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 8){
            this.level9Text = this.add.text(192, 576, "9", unlockedConfig).setOrigin(0, 0);
            this.level9.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first4");
            });
        } else {
            this.level9Text = this.add.text(192, 576, "9", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 9){
            this.level10Text = this.add.text(378, 576, "10", unlockedConfig).setOrigin(0, 0);
            this.level10.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first5");
            });
        } else {
            this.level10Text = this.add.text(378, 576, "10", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 10){
            this.level11Text = this.add.text(570, 576, "11", unlockedConfig).setOrigin(0, 0);
            this.level11.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first6");
            });
        } else {
            this.level11Text = this.add.text(570, 576, "11", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 11){
            this.level12Text = this.add.text(762, 576, "12", unlockedConfig).setOrigin(0, 0);
            this.level12.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.scene.start("first6");
            });
        } else {
            this.level12Text = this.add.text(762, 576, "12", lockedConfig).setOrigin(0, 0);
        }
    }

    update() {
        //main menu
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
        }
    }
}
