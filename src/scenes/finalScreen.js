class finalScreen extends Phaser.Scene {
    constructor() {
        super("finalScreen");
        this.uiCamera = 0;
    }
    preload(){
        this.load.image('final_Screen', './assets/finalScreen.png');
    }
    create() {
        this.img = this.add.image(0,0,'final_Screen').setOrigin(0,0);
        this.cameras.main.fadeIn(transitionSpeed, 0, 0, 0);
        this.cameras.main.setBackgroundColor("#2A2A2A");
       
       

       
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

       
       
        this.transitioning = false;

        //music
        if (!bgm_lvl.isPlaying) {
            bgm_lvl.play();
        }
        if (bgm_menu.isPlaying) {
            bgm_menu.stop();
        }

       
    }

    update() {
        //exit level
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            if (!this.transitioning) {
                this.sound.play('sfx_select2');
            }
            this.transition("menuScene");
        }

    }

    
    transition(sceneString) {
        if (!this.transitioning) {
            this.transitioning = true;
            if (sceneString == "menuScene") {
                this.tweens.add({
                    targets: bgm_lvl,
                    volume: 0,
                    duration: transitionSpeed * 1.5,
                    onComplete: () => {
                        bgm_lvl.stop();
                        bgm_lvl.setVolume(bgm_vol);
                    }
                })
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
