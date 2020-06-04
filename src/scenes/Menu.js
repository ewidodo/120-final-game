class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        this.menuBG = this.add.image(0, 0, 'menu').setOrigin(0, 0);
        this.newStory = this.add.image(80, 512, 'new-story').setOrigin(0, 0);
        this.levelSelect = this.add.image(game.config.width - 318, 512, 'level-select').setOrigin(0, 0);

        this.transitioning = false;
    }

    create() {
        this.cameras.main.fadeIn(transitionSpeed, 0, 0, 0);
        this.newOver = false;

        this.time.addEvent({
            delay: 400,
            callback: () => {
                if (bgm_lvl.isPlaying) {
                    bgm_lvl.stop();
                }
                if (!bgm_menu.isPlaying) {
                    bgm_menu.play();
                }
            }
        });

        //sets the menu buttons to have hover effect and switch scenes when clicked
        this.newStory.setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            if (!this.transitioning) {
                this.transitioning = true;
                this.time.addEvent({
                    delay: 0,
                    callback: () => {
                        this.sound.play('sfx_select1');
                        this.cameras.main.fadeOut(400, 0, 0, 0);
                        this.cameras.main.on('camerafadeoutcomplete', () => {
                            this.time.addEvent({
                                delay: transitionSpeed,
                                callback: () => {
                                    this.scene.start("intro");
                                }
                            })
                        });
                    }
                });
            }
        })
        .on('pointerover', () => { //scale text up a bit when hovering
            this.newStory.setScale(1.05,1.05);
            this.sound.play('sfx_hover');
        }) 
        .on('pointerout', ()  => { //scale back down if not
            this.newStory.setScale(1,1);
        });


        this.levelSelect.setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            if (!this.transitioning) {
                this.transitioning = true;
                this.time.addEvent({
                    delay: 0,
                    callback: () => {
                        this.sound.play('sfx_select1');
                        this.cameras.main.fadeOut(400, 0, 0, 0);
                        this.cameras.main.on('camerafadeoutcomplete', () => {
                            this.time.addEvent({
                                delay: transitionSpeed,
                                callback: () => {
                                    this.scene.start("levelSelect");
                                }
                            })
                        });
                    }
                });
            }
        })
        .on('pointerover', () => { //scale text up a bit when hovering
            this.levelSelect.setScale(1.05,1.05);
            this.sound.play('sfx_hover');
        }) 
        .on('pointerout', ()  => { //scale back down if not
            this.levelSelect.setScale(1,1);
        });

       
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if (bgm_vol > 0.05) {
                bgm_vol -= 0.1;
            } else {
                bgm_vol = 0;
            }
            localStorage.setItem('bgm_volume', bgm_vol);
            bgm_menu.setVolume(bgm_vol);
            bgm_lvl.setVolume(bgm_vol);
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            if (bgm_vol < 1) {
                bgm_vol += 0.1;
                localStorage.setItem('bgm_volume', bgm_vol);
                bgm_menu.setVolume(bgm_vol);
                bgm_lvl.setVolume(bgm_vol);
            }
        }
    }
}
