class Dialogue extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, text, textSpeed, type, finishDelay) {
        super(scene, x, y, texture, frame)

        //hide the texture
        this.alpha = 0;

        //add to existing scene
        scene.add.existing(this);

        //flag if dialogue needs to be removed early
        this.finished = false;
        this.finishDelay = finishDelay;

        this.text = text;
        this.textSpeed = textSpeed;
        this.counter = 1;
        this.outline = this.scene.add.rectangle(x, y, 768, 96, 0x00000).setOrigin(0.5).setScale(0);
        this.box = this.scene.add.rectangle(x, y, 760, 88, 0xFFFFFF).setOrigin(0.5).setScale(0);
        if (y == 1628) { //1 -> top of screen, 2 -> bottom of screen
            this.state = 1;
        } else {
            this.state = 2;
        }

        this.active = false;

        /*
        LIST FOR WHO IS TALKING
        -----------------------
        Ruth neutral expr. = 1
        Ruth one raised eyebrow = 2
        Ruth annoyed = 3
        Ruth angry = 4

        Malarkey regular = 11
        Malarkey closed eyes = 12
        */

        if (type == 1) {
            this.who = 'ruth_normal';
        }
        if (type == 2) {
            this.who = 'ruth_confused';
        }
        if (type == 3) {
            this.who = 'ruth_stern';
        }
        if (type == 4) {
            this.who = 'ruth_angry';
        }
        if (type == 11) {
            this.who = 'malarkey_normal';
        }
        if (type == 12) {
            this.who = 'malarkey_closed';
        }

        this.scene.tweens.add({
            targets: [this.outline, this.box],
            scale: 1,
            delay: 100,
            duration: 200,
            ease: 'Power',
            repeat: 0,
            yoyo: false,
            completeDelay: 100,
            onComplete: function() {
                this.displayText();
            },
            onCompleteScope: this,
        });
    }

    displayText() {
        this.active = true;
        let textDisplay = {
            fontFamily: 'Times New Roman Bold',
            fontSize: '26px',
            color: '#000000',
            align: 'left',
        };
        
        this.face = this.scene.add.sprite(this.x - 324, this.y, this.who).setOrigin(0.5).play(this.who + '_talk');
        this.dialogue = this.scene.add.text(this.x- 260, this.y - 30, "", textDisplay);
        this.letterByLetter = this.scene.time.addEvent({
            delay: this.textSpeed,
            callback: this.nextLetter,
            args: [this.dialogue, this.text],
            callbackScope: this,
            repeat: this.text.length,
        });
    }

    deleteDialogue() {
        this.finished = true;
        this.letterByLetter.paused = true;
        this.face.alpha = 0;
        this.dialogue.alpha = 0;
        this.scene.tweens.add({
            targets: [this.outline, this.box],
            scale: 0,
            duration: 200,
            ease: 'Power',
            repeat: 0,
            yoyo: false,
            completeDelay: 100,
            onComplete: function() {
                this.destroy();
            },
            onCompleteScope: this,
        });
    }

    nextLetter(textObject, text) {
        if (this.counter <= this.text.length) {
            textObject.text = text.substr(0, this.counter);
            this.counter++;
            if (this.counter % 2 == 1) {
                this.scene.sound.play('speechfont1');
            }
        } else {
            this.scene.sound.play('speechfont1Completed');
            this.face.anims.stop();
            this.face.setFrame('1');
            this.scene.time.addEvent({
                delay: this.finishDelay,
                callback: () => {
                    if(!this.finished){
                        this.deleteDialogue();
                    };
                }
            });
        }
    }

    update() {
        if (!this.finished) {
            if (this.scene.player.gravityState == 0) {
                if (this.state == 1 & this.scene.player.y < game.config.height / 3) {
                    this.shiftBottom();
                }
                if (this.state == 2 & this.scene.player.y > game.config.height / 3 * 2) {
                    this.shiftTop();
                }
            }
            if (this.scene.player.gravityState == 1) {
                if (this.state == 1 & this.scene.player.x < game.config.height / 3) {
                    this.shiftBottom();
                }
                if (this.state == 2 & this.scene.player.x > game.config.height / 3 * 2) {
                    this.shiftTop();
                }
            }
            if (this.scene.player.gravityState == 2) {
                if (this.state == 2 & this.scene.player.y < game.config.height / 3) {
                    this.shiftTop();
                }
                if (this.state == 1 & this.scene.player.y > game.config.height / 3 * 2) {
                    this.shiftBottom();
                }
            }
            if (this.scene.player.gravityState == 3) {
                if (this.state == 2 & this.scene.player.x < game.config.height / 3) {
                    this.shiftTop();
                }
                if (this.state == 1 & this.scene.player.x > game.config.height / 3 * 2) {
                    this.shiftBottom();
                }
            }
        }
    }

    shiftTop() {
        this.state = 1;
        this.outline.y = 1628;
        this.box.y = 1628;
        this.y = 1628;
        if (this.active) {
            this.face.y = 1628;
            this.dialogue.y = 1598;
        }
    }

    shiftBottom() {
        this.state = 2;
        this.outline.y = 2396;
        this.box.y = 2396;
        this.y = 2396;
        if (this.active) {
            this.face.y = 2396;
            this.dialogue.y = 2366;
        }
    }
}