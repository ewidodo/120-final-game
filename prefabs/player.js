class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.gravityState = 0; //from default view, 0 -> towards bottom, 1 -> towards right, 2 -> towards top, 3 -> towards left
        this.isJumping = false;
        this.isJumpingButton = false;
        this.isFalling = false;
        this.idle = true; //i just realized the way i implemented this it's more like this.walking, so treat it that way
        this.walk1 = true;
        this.walk2 = false;
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
                this.walk1 = true;
                this.walk2 = false;
            }

            //walk sounds
            if (this.idle && (!this.isJumpingButton && !this.isFalling)) {
                if(this.anims.currentFrame.index == 2 && this.walk1) {
                    this.walk1 = false;
                    this.walk2 = true;
                    this.scene.sound.play('walk1');
                }
                if(this.anims.currentFrame.index == 6 && this.walk2) {
                    this.walk1 = true;
                    this.walk2 = false;
                    this.scene.sound.play('walk2');
                }
            }

            //jumping
            if ((Phaser.Input.Keyboard.JustDown(keyW) || Phaser.Input.Keyboard.JustDown(keySPACE)) && !this.isJumping && !this.scene.switching) {
                this.anims.stop();
                this.setTexture('ruth_jump', 0);
                this.scene.sound.play('jump');
                this.isJumpingButton = true;
                this.isFalling = false;

                if (this.gravityState % 2 == 0) {
                    this.setVelocityY(Math.cos(rotationValue) * jumpSpeed);
                    this.body.setSize(32, 64, true);
                }
                if (this.gravityState % 2 == 1) {
                    this.setVelocityX(Math.sin(rotationValue) * jumpSpeed);
                    this.body.setSize(64, 32, true);
                } 
                
                this.scene.time.delayedCall(10, () => {
                    this.isJumping = true;
                });
            }
        }

        if (this.gravityState == 0) { //bottom
            if (this.body.velocity.y > 0 && !this.isFalling) { //falling
                if (!this.scene.gameOver) {
                    this.isFalling = true;
                    this.anims.stop();
                    this.setTexture('ruth_fall', 0);
                    this.body.setSize(32, 64, true);
                }
            }
            if ((this.isJumping || this.isFalling) && this.body.blocked.down) {
                if (!this.scene.gameOver) {
                    this.unJump();
                    thud.play();
                    this.body.setSize(32, 64, true);
                }
            }
        }
        if (this.gravityState == 1) { //right
            if (this.body.velocity.x > 0 && !this.isFalling) { //falling
                if (!this.scene.gameOver) {
                    this.isFalling = true;
                    this.anims.stop();
                    this.setTexture('ruth_fall', 0);
                    this.body.setSize(64, 32, true);
                }
            }
            if ((this.isJumping || this.isFalling) && this.body.blocked.right) {
                if (!this.scene.gameOver) {
                    this.unJump();
                    thud.play();
                    this.body.setSize(64, 32, true);
                }
            }
        }
        if (this.gravityState == 2 ) { // top
            if (this.body.velocity.y < 0 && !this.isFalling) { //falling
                if (!this.scene.gameOver) {
                    this.isFalling = true;
                    this.anims.stop();
                    this.setTexture('ruth_fall', 0);
                    this.body.setSize(32, 64, true);
                }
            }
            if ((this.isJumping || this.isFalling) && this.body.blocked.up) {
                if (!this.scene.gameOver) {
                    this.unJump();
                    thud.play();
                    this.body.setSize(32, 64, true);
                }
            }
        }
        if (this.gravityState == 3) { //left
            if (this.body.velocity.x < 0 && !this.isFalling) { //falling
                if (!this.scene.gameOver) {
                    this.isFalling = true;
                    this.anims.stop();
                    this.setTexture('ruth_fall', 0);
                    this.body.setSize(64, 32, true);
                }
            }
            if ((this.isJumping || this.isFalling) && this.body.blocked.left) {
                if (!this.scene.gameOver) {
                    this.unJump();
                    thud.play();
                    this.body.setSize(64, 32, true);
                }
            }
        }

        if (this.scene.gameOver) {
            this.anims.stop();
            this.setTexture('ruth_deth', 0);
        }
    }

    unJump() {
        this.isJumping = false;
        this.isJumpingButton = false;
        this.isFalling = false;
        if (keyA.isDown || keyD.isDown) {
            this.anims.play('r_run');
            this.idle = true;
        } else {
            this.anims.play('r_idle');
            this.idle = false;
        }
        this.walk1 = true;
        this.walk2 = false;
    }
}