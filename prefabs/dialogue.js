class Dialogue extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, text, textSpeed) {
        super(scene, x, y, texture, frame)

        //hide the texture
        this.alpha = 0;

        //add to existing scene
        scene.add.existing(this);

        //flag if dialogue needs to be removed early
        this.finished = false;

        this.text = text;
        this.textSpeed = textSpeed;
        this.counter = 1;
        this.outline = this.scene.add.rectangle(x, y, 768, 96, 0x00000).setOrigin(0.5).setScale(0);
        this.box = this.scene.add.rectangle(x, y, 760, 88, 0xFFFFFF).setOrigin(0.5).setScale(0);

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
        let textDisplay = {
            fontFamily: 'Times New Roman Bold',
            fontSize: '26px',
            color: '#000000',
            align: 'left',
        };
        
        this.face = this.scene.add.image(this.x - 324, this.y, 'player').setOrigin(0.5);
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
            this.scene.sound.play('speechfont1');
        } else {
            this.scene.sound.play('speechfont1Completed');
            this.scene.time.addEvent({
                delay: 2000,
                callback: () => {
                    if(!this.finished){
                        this.deleteDialogue();
                    };
                }
            });
        }
    }
}