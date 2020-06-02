class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        this.menuBG = this.add.image(0, 0, 'menu').setOrigin(0, 0);
        this.newStory = this.add.image(80, 512, 'new-story').setOrigin(0, 0);
        this.levelSelect = this.add.image(game.config.width - 318, 512, 'level-select').setOrigin(0, 0);
    }

    create() {
        this.cameras.main.fadeIn(650, 0, 0, 0);
        this.newOver = false;

        this.time.addEvent({
            delay: 400,
            callback: () => {
                if (bgm_lvl.isPlaying) {
                    bgm_lvl.stop();
                }
                if (!bgm_menu.isPlaying) {
                    bgm_menu.play();
                }
            }
        });

        //sets the menu buttons to have hover effect and switch scenes when clicked
        this.newStory.setInteractive({useHandCursor: true})
        .on('pointerdown', () => { this.scene.start("intro1"); } )
        .on('pointerover', () => { this.newStory.setScale(1.05,1.05); } ) 
        .on('pointerout', ()  => { this.newStory.setScale(1,1); } );


        this.levelSelect.setInteractive({useHandCursor: true})
        .on('pointerdown', () => { this.scene.start("levelSelect"); } )
        .on('pointerover', () => { this.levelSelect.setScale(1.05,1.05); } ) 
        .on('pointerout', ()  => { this.levelSelect.setScale(1,1); } );

       
    }

    update() {
        
    }
}
