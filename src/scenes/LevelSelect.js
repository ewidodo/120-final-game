class LevelSelect extends Phaser.Scene {
    constructor() {
        super("levelSelect");
    }

    preload() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.transitioning = false;
    }

    create() {
        this.cameras.main.fadeIn(transitionSpeed, 0, 0, 0);
        this.bg  = this.add.image( 0, 0,'bg').setOrigin(0,0);
        this.lstext = this.add.image(game.config.width/2, 128, 'lstext').setOrigin(0.5);
        this.exit = this.add.image(game.config.width/2, game.config.height - 96, 'exit').setOrigin(0.5);
        
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

        this.level1 = this.add.image(192, 192, 'door').setOrigin(0,0);
        this.level2 = this.add.image(384, 192, 'door').setOrigin(0,0);
        this.level3 = this.add.image(576, 192, 'door').setOrigin(0,0);
        this.level4 = this.add.image(768, 192, 'door').setOrigin(0,0);
        this.level5 = this.add.image(192, 384, 'door').setOrigin(0,0);
        this.level6 = this.add.image(384, 384, 'door').setOrigin(0,0);
        this.level7 = this.add.image(576, 384, 'door').setOrigin(0,0);
        this.level8 = this.add.image(768, 384, 'door').setOrigin(0,0);
        this.level9 = this.add.image(192, 576, 'door').setOrigin(0,0);
        this.level10 = this.add.image(384, 576, 'door').setOrigin(0,0);
        this.level11 = this.add.image(576, 576, 'door').setOrigin(0,0);
        this.level12 = this.add.image(768, 576, 'door').setOrigin(0,0);
        
        this.level1Text = this.add.text(192, 192, "1", unlockedConfig).setOrigin(0, 0);
        this.level1.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            this.transition("intro1");
        }).on('pointerover', () => { //set text to cyan when hovering
            this.level1Text.setColor("#00FFFF");
            this.sound.play('sfx_hover');
        }).on('pointerout', ()  => { //otherwise set it back to black
            this.level1Text.setColor("#000000")
        });

        if(lastLevelCompleted  >= 1){
            this.level2Text = this.add.text(384, 192, "2", unlockedConfig).setOrigin(0, 0);
             this.level2.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("intro2");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level2Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level2Text.setColor("#000000")
            });
        } else {
            this.level2Text = this.add.text(384, 192, "2", lockedConfig).setOrigin(0, 0);
        }
       
        if(lastLevelCompleted  >= 2){
            this.level3Text = this.add.text(576, 192, "3", unlockedConfig).setOrigin(0, 0);
            this.level3.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("intro3");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level3Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level3Text.setColor("#000000")
            });
        } else {
            this.level3Text = this.add.text(576, 192, "3", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 3){
            this.level4Text = this.add.text(768, 192, "4", unlockedConfig).setOrigin(0, 0);
            this.level4.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("intro4");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level4Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level4Text.setColor("#000000")
            });
        } else {
            this.level4Text = this.add.text(768, 192, "4", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 4){
            this.level5Text = this.add.text(192, 384, "5", unlockedConfig).setOrigin(0, 0);
            this.level5.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("intro5");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level5Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level5Text.setColor("#000000")
            });
        } else {
            this.level5Text = this.add.text(192, 384, "5", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 5){
            this.level6Text = this.add.text(384, 384, "6", unlockedConfig).setOrigin(0, 0);
            this.level6.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("first1");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level6Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level6Text.setColor("#000000")
            });
        } else {
            this.level6Text = this.add.text(384, 384, "6", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 6){
            this.level7Text = this.add.text(576, 384, "7", unlockedConfig).setOrigin(0, 0);
            this.level7.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("first2");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level7Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level7Text.setColor("#000000")
            });
        } else {
            this.level7Text = this.add.text(576, 384, "7", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 7){
            this.level8Text = this.add.text(768, 384, "8", unlockedConfig).setOrigin(0, 0);
            this.level8.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("first3");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level8Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level8Text.setColor("#000000")
            });
        } else {
            this.level8Text = this.add.text(768, 384, "8", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 8){
            this.level9Text = this.add.text(192, 576, "9", unlockedConfig).setOrigin(0, 0);
            this.level9.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("first4");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level9Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level9Text.setColor("#000000")
            });
        } else {
            this.level9Text = this.add.text(192, 576, "9", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 9){
            this.level10Text = this.add.text(378, 576, "10", unlockedConfig).setOrigin(0, 0);
            this.level10.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("first5");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level10Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level10Text.setColor("#000000")
            });
        } else {
            this.level10Text = this.add.text(378, 576, "10", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 10){
            this.level11Text = this.add.text(570, 576, "11", unlockedConfig).setOrigin(0, 0);
            this.level11.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("first6");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level11Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level11Text.setColor("#000000")
            });
        } else {
            this.level11Text = this.add.text(570, 576, "11", lockedConfig).setOrigin(0, 0);
        }

        if(lastLevelCompleted  >= 11){
            this.level12Text = this.add.text(762, 576, "12", unlockedConfig).setOrigin(0, 0);
            this.level12.setInteractive({useHandCursor: true}).on('pointerdown', () => {
                this.transition("first6");
            }).on('pointerover', () => { //set text to cyan when hovering
                this.level12Text.setColor("#00FFFF");
                this.sound.play('sfx_hover');
            }).on('pointerout', ()  => { //otherwise set it back to black
                this.level12Text.setColor("#000000")
            });
        } else {
            this.level12Text = this.add.text(762, 576, "12", lockedConfig).setOrigin(0, 0);
        }
    }

    update() {
        //main menu
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.transition("menuScene")
           
        }
    }


    transition(sceneString) {
        if (!this.transitioning) {
            this.transitioning = true;
            if (sceneString != 'menuScene') {
                this.sound.play('sfx_select1');
                this.tweens.add({
                    targets: bgm_menu,
                    volume: 0,
                    duration: transitionSpeed * 1.5,
                    onComplete: () => {
                        bgm_menu.stop();
                        bgm_menu.setVolume(bgm_vol);
                    }
                })
            } else {
                this.sound.play('sfx_select2');
            }
            this.time.addEvent({
                delay: 0,
                callback: () => {
                    this.cameras.main.fadeOut(transitionSpeed, 0, 0, 0);
                    this.cameras.main.on('camerafadeoutcomplete', () => {
                        this.time.addEvent({
                            delay: transitionSpeed,
                            callback: () => {
                                this.scene.start(sceneString);
                            }
                        })
                    });
                }
            });
        }
    }
    
}
