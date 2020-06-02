class Introduction extends Phaser.Scene {
    constructor() {
        super("intro");
    }

    create() {
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        this.ruth = this.add.sprite()
    }
}