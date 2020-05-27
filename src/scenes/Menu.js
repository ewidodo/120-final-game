class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
    }

    create() {
        if (bgm_lvl.isPlaying) {
            bgm_lvl.stop();
        }
        if (!bgm_menu.isPlaying) {
            bgm_menu.play();
        }
        this.scene.start("levelSelect");
    }

    update() {

    }
}
