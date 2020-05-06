class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.gravityState = 0; //from default view, 0 -> towards bottom, 1 -> towards right, 2 -> towards top, 3 -> towards left
        this.onGround = false;
    }

    update() {

    }
}