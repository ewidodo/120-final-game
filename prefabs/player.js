class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.gravityState = 0; //from default view, 0 -> towards bottom, 1 -> towards right, 2 -> towards top, 3 -> towards left
        this.isJumping = false;
        this.isJumpingButton = false;
        this.isFalling = false;
        this.idle = true;
        this.body.setMaxVelocity(925,925);
    }

    update() {
        if (!this.scene.gameOver) {
            //handle player movement
            if (keyA.isDown) {
                //move left
                //figure out whether moving left/right happens in X or Y axis
                //do not alter velocity in vertical axis
                if (!this.isJumpingButton && !this.isFalling) {
                    if (!this.idle) {
                        this.idle = true;
                        this.anims.play('r_run');
                    }
                }
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
                if (!this.isJumpingButton && !this.isFalling) {
                    if (!this.idle) {
                        this.idle = true;
                        this.anims.play('r_run');
                    }
                }
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

                if (!this.isJumpingButton && !this.isFalling) {
                    if (this.idle) {
                        this.idle = false;
                        this.anims.play('r_idle');
                    }
                }
            }

            //jumping
            if ((Phaser.Input.Keyboard.JustDown(keyW) || Phaser.Input.Keyboard.JustDown(keySPACE)) && !this.isJumping && !this.scene.switching) {
                if (this.gravityState % 2 == 0) {
                    this.setVelocityY(Math.cos(rotationValue) * jumpSpeed);
                }
                if (this.gravityState % 2 == 1) {
                    this.setVelocityX(Math.sin(rotationValue) * jumpSpeed);
                } 

                this.anims.stop();
                this.setTexture('ruth_jump', 0);
                this.isJumpingButton = true;
                
                this.scene.time.delayedCall(10, () => {
                    this.isJumping = true;
                });
            }
        }

        if (this.gravityState == 0) { //bottom
            if (this.body.velocity.y > 0 && !this.isFalling) {
                this.isFalling = true;
                this.anims.stop();
                this.setTexture('ruth_fall', 0);
                this.body.setSize(32, 64, true);
            }
            if ((this.isJumping || this.isFalling) && this.body.blocked.down) {
                this.unJump();
                this.body.setSize(32, 64, true);
            }
        }
        if (this.gravityState == 1) { //right
            if (this.body.velocity.x > 0 && !this.isFalling) {
                this.isFalling = true;
                this.anims.stop();
                this.setTexture('ruth_fall', 0);
                this.body.setSize(64, 32, true);
            }
            if ((this.isJumping || this.isFalling) && this.body.blocked.right) {
                this.unJump();
                this.body.setSize(64, 32, true);
            }
        }
        if (this.gravityState == 2 ) { // top
            if (this.body.velocity.y < 0 && !this.isFalling) {
                this.isFalling = true;
                this.anims.stop();
                this.setTexture('ruth_fall', 0);
                this.body.setSize(32, 64, true);
            }
            if ((this.isJumping || this.isFalling) && this.body.blocked.up) {
                this.unJump();
                this.body.setSize(32, 64, true);
            }
        }
        if (this.gravityState == 3) { //left
            if (this.body.velocity.x < 0 && !this.isFalling) {
                this.isFalling = true;
                this.anims.stop();
                this.setTexture('ruth_fall', 0);
                this.body.setSize(64, 32, true);
            }
            if ((this.isJumping || this.isFalling) && this.body.blocked.left) {
                this.unJump();
                this.body.setSize(64, 32, true);
            }
        }
    }

    unJump() {
        this.isJumping = false;
        this.isJumpingButton = false;
        this.isFalling = false;
        if (keyA.isDown || keyD.isDown) {
            this.anims.play('r_run');
            this.idle = false;
        } else {
            this.anims.play('r_idle');
            this.idle = true;
        }
    }
}