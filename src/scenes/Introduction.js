class Introduction extends Phaser.Scene {
    constructor() {
        super("intro");
    }

    create() {
        this.cameras.main.fadeIn(650, 0, 0, 0);
        this.cameras.main.setBackgroundColor("#555555");

        this.ruth = this.add.sprite(game.config.width / 3, game.config.height / 2, 'ruth_idle').setOrigin(0.5).setScale(2);
        this.malarkey = this.add.sprite(game.config.width /3 * 2, game.config.height / 2, 'malarkey').setOrigin(0.5).setScale(2);
        this.ruth.anims.play('r_idle');
        this.malarkey.anims.play('m_idle');

        //dummy player
        this.player = new Player(this, game.config.width * 10, game.config.height * 10, 'ruth_idle', 0);

        this.dialogue = new Dialogue(this, 512, 96, 'player', 0, "So the big cheese has asked me to glaum a whole buncha\nstuff from this kooky place...", 20, 11, 3000);
        this.dialogue1Finished = false;
        this.dialogue2Started = false;
        this.dialogue3Started = false;
        this.dialogue4Started = false;
        this.dialogue5Started = false;
        this.dialogue6Started = false;
        this.dialogue7Started = false;
        this.dialogue8Started = false;
    }

    update() {
        //chain dialogues and stuff
        if (!this.dialogue1Finished) {
            this.dialogue.update();
            if (this.dialogue.finished) {
                this.dialogue1Finished = true;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue2 = new Dialogue(this, 512, 96, 'player', 0, "Apparently it's full of bizarre baloney floor to ceiling,\nand they all do weird stuff too.", 20, 11, 3000);
                        this.dialogue2Started = true;
                    }
                });
            }
        }

        if (this.dialogue2Started) {
            this.dialogue2.update();
            if (this.dialogue2.finished) {
                this.dialogue2Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue3 = new Dialogue(this, 512, 96, 'player', 0, "So I scoured the place and now we've got a list of stuff\nto snatch. That's where you come in.", 20, 11, 3000);
                        this.dialogue3Started = true;
                    }
                });
            }
        }

        if (this.dialogue3Started) {
            this.dialogue3.update();
            if (this.dialogue3.finished) {
                this.dialogue3Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue4 = new Dialogue(this, 512, 96, 'player', 0, "Wait, if you were already in there, why couldn't you do it\non your own?", 20, 2, 3000);
                        this.dialogue4Started = true;
                    }
                });
            }
        }

        if (this.dialogue4Started) {
            this.dialogue4.update();
            if (this.dialogue4.finished) {
                this.dialogue4Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue5 = new Dialogue(this, 512, 96, 'player', 0, "Look you oaf, in case it wasn't obvious I'm fat and I can't\nexactly do a clean sneak.", 20, 13, 3000);
                        this.dialogue5Started = true;
                    }
                });
            }
        }

        if (this.dialogue5Started) {
            this.dialogue5.update();
            if (this.dialogue5.finished) {
                this.dialogue5Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue6 = new Dialogue(this, 512, 96, 'player', 0, "...so you're asking a thief-for-hire instead of a proper mug to\nhelp you with this delicate job?", 20, 3, 3000);
                        this.dialogue6Started = true;
                    }
                });
            }
        }

        if (this.dialogue6Started) {
            this.dialogue6.update();
            if (this.dialogue6.finished) {
                this.dialogue6Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue7 = new Dialogue(this, 512, 96, 'player', 0, "Yes, no one else I talked to was up for the job.", 20, 12, 3000);
                        this.dialogue7Started = true;
                    }
                });
            }
        }

        if (this.dialogue7Started) {
            this.dialogue7.update();
            if (this.dialogue7.finished) {
                this.dialogue7Started = false;
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.dialogue8 = new Dialogue(this, 512, 96, 'player', 0, "Well, if it gets me more rubes then sign me in!", 20, 5, 3000);
                        this.dialogue8Started = true;
                    }
                });
            }
        }

        if (this.dialogue8Started) {
            this.dialogue8.update();
            if (this.dialogue8.finished) {
                this.dialogue8Started = false;
                this.transition();
            }
        }
    }

    transition() {
        this.time.addEvent({
            delay: 0,
            callback: () => {
                this.cameras.main.fadeOut(400, 0, 0, 0);
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.time.addEvent({
                        delay: 400,
                        callback: () => {
                            this.scene.start("intro1");
                        }
                    })
                });
            }
        });
    }
}