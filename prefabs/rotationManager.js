class RotationManager extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame,){
        super(scene, x, y, texture, frame);

        //hide the texture
        this.alpha = 0;

        //add to existing scene
        scene.add.existing(this);
    }

    updateGravityRight() {
        this.scene.sound.play('sfx_switch');
        rotationValue += Math.PI / 2;
        console.log(playerRotationValue);
        playerRotationValue -= Math.PI / 2;
        this.scene.player.gravityState++;
        this.scene.player.gravityState %= 4;
        if (this.scene.player.gravityState == 0) {
            this.scene.player.y -= 32;
            this.scene.player.setSize(32, 64, true);
        }
        if (this.scene.player.gravityState == 1) {
            this.scene.player.x -= 32;
            this.scene.player.setSize(64, 32, true);
        }
        if (this.scene.player.gravityState == 2) {
            this.scene.player.y += 32;
            this.scene.player.setSize(32, 64, true);
        }
        if (this.scene.player.gravityState == 3) {
            this.scene.player.x += 32;
            this.scene.player.setSize(64, 32, true);
        }
        this.updateGravity();
    }

    updateGravityLeft() {
        this.scene.sound.play('sfx_switch');
        rotationValue -= Math.PI / 2;
        console.log(playerRotationValue);
        playerRotationValue += Math.PI / 2;
        this.scene.player.gravityState--;
        if (this.scene.player.gravityState < 0) {
            this.scene.player.gravityState = 3;
        }
        if (this.scene.player.gravityState == 0) {
            this.scene.player.y -= 32;
            this.scene.player.setSize(32, 64, true);
        }
        if (this.scene.player.gravityState == 1) {
            this.scene.player.x -= 32;
            this.scene.player.setSize(64, 32, true);
        }
        if (this.scene.player.gravityState == 2) {
            this.scene.player.y += 32;
            this.scene.player.setSize(32, 64, true);
        }
        if (this.scene.player.gravityState == 3) {
            this.scene.player.x += 32;
            this.scene.player.setSize(64, 32, true);
        }
        this.updateGravity();
    }

    updateGravity() {
        this.scene.physics.world.gravity.x = Math.sin(rotationValue) * gravityStrength;
        this.scene.physics.world.gravity.y = Math.cos(rotationValue) * gravityStrength;

        this.scene.tweens.add({
            targets: this.scene.cameras.main,
            rotation: rotationValue,
            duration: rotationSpeed,
            ease: 'Power',
            repeat: 0,
            yoyo: false,
        });

        playerRotationValue %= Math.PI * 2;
        console.log(playerRotationValue);

        this.scene.tweens.add({
            targets: this.scene.player,
            rotation: playerRotationValue,
            duration: rotationSpeed,
            ease: 'Power',
            repeat: 0,
            yoyo: false,
        });

        if (playerRotationValue > 0) {
            playerRotationValue -= Math.PI * 2;
        }
        console.log(playerRotationValue);

        //prevent player from switching too frequently
        this.scene.switching = true;
        this.scene.time.addEvent({
            delay: rotationSpeed + 75,
            callback: () => {
                this.scene.sound.play('sfx_button');
            }
        });
        this.scene.time.addEvent({
            delay: rotationSpeed * 2,
            callback: () => {
                this.scene.switching = false;
            }
        });
    }
}