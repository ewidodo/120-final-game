class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.gravityState = 0; //from default view, 0 -> towards bottom, 1 -> towards right, 2 -> towards top, 3 -> towards left
        this.isJumping = false;
        this.body.setMaxVelocity(1000,1000);
        }

    update() {
        //handle player movement
        if (keyA.isDown) {
            //move left
            //figure out whether moving left/right happens in X or Y axis
            //do not alter velocity in vertical axis
            if (this.gravityState % 2 == 0) {
                this.setVelocityX(Math.cos(this.rotation) * playerSpeed * -1);
            }
            if (this.gravityState % 2 == 1) {
                this.setVelocityY(Math.sin(this.rotation) * playerSpeed * -1);
            }
            this.flipX = true;

        } else if (keyD.isDown) {
            //move right
            //figure out whether moving left/right happens in X or Y axis
            //do not alter velocity in vertical axis
            if (this.gravityState % 2 == 0) {
                this.setVelocityX(Math.cos(this.rotation) * playerSpeed);
            }
            if (this.gravityState % 2 == 1) {
                this.setVelocityY(Math.sin(this.rotation) * playerSpeed);
            }
            this.flipX = false;

        } else {
            //not moving, set relative horizontal movement to 0
            if (this.gravityState % 2 == 0) {
                this.setVelocityX(0);
            }
            if (this.gravityState % 2 == 1) {
                this.setVelocityY(0);
            }
        }

        //jumping
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isJumping && !this.scene.switching) {
            console.log("jump pressed");
  
            if (this.gravityState % 2 == 0) {
                this.setVelocityY(Math.cos(rotationValue) * jumpSpeed);
            }
            if (this.gravityState % 2 == 1) {
                this.setVelocityX(Math.sin(rotationValue) * jumpSpeed);
            } 
            
            this.scene.time.delayedCall(10, () => {
                this.isJumping = true;
            });
        }

        

        if (this.gravityState == 0 && this.body.blocked.down) { //bottom
            //console.log("blocked bottom");
            this.isJumping = false;
        }
        if (this.gravityState == 1 && this.body.blocked.right) { //right
            this.isJumping = false;
        }
        if (this.gravityState == 2 && this.body.blocked.up) { // top
            this.isJumping = false;
        }
        if (this.gravityState == 3 && this.body.blocked.left) { //left
            this.isJumping = false;
        }
    }
}