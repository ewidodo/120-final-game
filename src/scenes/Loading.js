class Loading extends Phaser.Scene{
    constructor() {
        super("loadingScene");
    }

    preload() {
        this.cameras.main.setBackgroundColor("#2A2A2A");
        let tipConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
            },
        }
        this.loading = this.add.text(game.config.width / 2, game.config.height / 2 - 144, "Loading", tipConfig).setOrigin(0.5);
        tipConfig.fontSize = '26px';
        this.tipText = this.add.text(game.config.width / 2, game.config.height / 2 + 144, "TIP", tipConfig).setOrigin(0.5);
        tipConfig.fontSize = '20px';

        this.rnd = Phaser.Math.RND;
        this.randomThings = [
            "The statement \"2+2=5\" is only true in Level 3, so keep that in mind while completing that level.",
            "When falling from a great height, be sure to immediately use your idle animation.",
            "Log in every Friday to collect your extra weekly button press.",
            "There is an easter egg that can be accessed in the loading screen by typing the following 6 times before the menu loads:\n\"Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uakitanatahu\"",
            "Celery Sticks are a common healing item, which is weird considering they don't appear ingame at all.",
            "The S rank is awarded to players who complete a level with only 0.5 of a button press.",
            "When your Gravity skill reaches 39, you can report this unintended feature to the developers.",
            "The Out-Of-This-World Whiskey Soda provides a lot of stat boosts that allow you to perform better in menu browsing.",
            "This game is best experienced in a low-light environment as lights hurt my eyes.",
            "To give a service provider extra money as a way to thank them for their excellent service",
            "Holding A allows your character to run into a wall and ponder the meaning of life.",
            "Having an SSD does not speed up the loading of this game as it does not speed up the walking sequence.",
            "Don't cry, don't lose your mind. It's only teenage wasteland.",
        ]
        this.randomTing = this.rnd.pick(this.randomThings);
        this.randomTip = this.add.text(game.config.width / 2, game.config.height / 2 + 192, this.randomTing, tipConfig).setOrigin(0.5);

        //load images 
        this.load.image('ruth_jump', './assets/ruthJump.png');
        this.load.image('ruth_fall', './assets/ruthFall.png');
        this.load.image('ruth_deth', './assets/ruthDeth.png');

        this.load.image('button', './assets/button.png');
        this.load.image('tiles', './assets/tileSheet.png');
        this.load.image('menu', './assets/mainMenu.png');
        this.load.image('new-story', './assets/newStoryButton.png');
        this.load.image('level-select', './assets/levelSelectButton.png');
        this.load.image('bg', './assets/levelSelect.png');
        this.load.image('lstext', './assets/lstext.png');
        this.load.image('door', './assets/door.png');
        this.load.image('exit', './assets/exitInstruc.png');
        this.load.image('musicIcon', './assets/musicIcon.png');
        this.load.image('musicDown', './assets/down.png');
        this.load.image('musicUp', './assets/up.png');

        //load atlases
        this.load.atlas('ruth_normal', './assets/ruth_normal.png', './assets/dialogue.json');
        this.load.atlas('ruth_confused', './assets/ruth_confused.png', './assets/dialogue.json');
        this.load.atlas('ruth_stern', './assets/ruth_stern.png', './assets/dialogue.json');
        this.load.atlas('ruth_angry', './assets/ruth_angry.png', './assets/dialogue.json');
        this.load.atlas('ruth_smug', './assets/ruth_smug.png', './assets/dialogue.json');
        this.load.atlas('ruth_laugh', './assets/ruth_laugh.png', './assets/dialogue.json');
        this.load.atlas('malarkey_normal', './assets/malarkey_normal.png', './assets/dialogue.json');
        this.load.atlas('malarkey_closed', './assets/malarkey_closed.png', './assets/dialogue.json');
        this.load.atlas('malarkey_shifty', './assets/malarkey_shifty.png', './assets/dialogue.json');
        this.load.atlas('malarkey_neutral', './assets/malarkey_neutral.png', './assets/dialogue.json');

        this.load.atlas('ruth_idle', './assets/ruthIdle.png', './assets/ruthIdle.json');
        this.load.atlas('ruth_run', './assets/ruthRun.png', './assets/ruthRun.json');
        this.load.atlas('ruth_win', './assets/ruthVictory.png', './assets/ruthVictory.json');
        this.load.atlas('malarkey', './assets/MrMalarkey.png', './assets/MrMalarkey.json');
        this.load.atlas('boye', './assets/boye.png', './assets/boye.json');

        //load audio
        this.load.audio('sfx_button', './assets/button.wav');
        this.load.audio('sfx_switch', './assets/switch.wav');
        this.load.audio('sfx_death', './assets/deth.wav');
        this.load.audio('sfx_win', './assets/victory.wav');
        this.load.audio('speechfont1', './assets/speechfont1.wav');
        this.load.audio('speechfont1Completed', './assets/speechfont1Complete.wav');
        this.load.audio('walk1', './assets/walk1.wav');
        this.load.audio('walk2', './assets/walk2.wav');
        this.load.audio('jump', './assets/jump.wav');
        this.load.audio('thud', './assets/thud.wav');
        
        this.load.audio('sfx_hover', './assets/menu_hover.wav');
        this.load.audio('sfx_select1', './assets/menu_select.wav');
        this.load.audio('sfx_select2', './assets/menu_select2.wav');

        this.load.audio('bgm_menu', './assets/bgm_menu.mp3');
        this.load.audio('bgm_ingame', './assets/bgm_ingame.mp3');
        

        //load levels
        this.load.tilemapCSV('introJump', './tilemaps/introJump.csv');
        this.load.tilemapCSV('introObst', './tilemaps/introObst.csv');
        this.load.tilemapCSV('introButton', './tilemaps/introButton.csv');
        this.load.tilemapCSV('introGrav', './tilemaps/introGrav.csv');
        this.load.tilemapCSV('introCorner', './tilemaps/introCorners.csv');
        this.load.tilemapCSV('first1', './tilemaps/first1.csv');
        this.load.tilemapCSV('first2', './tilemaps/first2.csv');
        this.load.tilemapCSV('first3', './tilemaps/first3.csv');
        this.load.tilemapCSV('first4', './tilemaps/first4.csv');
        this.load.tilemapCSV('first5', './tilemaps/first5.csv');
        this.load.tilemapCSV('first6', './tilemaps/first6.csv');
        this.load.tilemapCSV('first7', './tilemaps/first7.csv');

        //misc
        this.done = false;
        this.walk1 = true;
        this.walk2 = false;
        this.volume = 0.2;
    }

    create() {
        this.ruth = this.add.sprite(-96, game.config.height / 2, 'ruth_idle').setOrigin(0.5).setScale(2);

        //set music
        bgm_menu = this.sound.add('bgm_menu');
        bgm_menu.loop = true;
        bgm_menu.setVolume(bgm_vol);
        bgm_lvl = this.sound.add('bgm_ingame');
        bgm_lvl.loop = true;
        bgm_lvl.setVolume(bgm_vol);

        thud = this.sound.add('thud');

        this.walk1sound = this.sound.add('walk1');
        this.walk1sound.setVolume(this.volume);
        this.walk2sound = this.sound.add('walk2');
        this.walk2sound.setVolume(this.volume);
        
        //define animations
        this.anims.create({
            key: 'ruth_normal_talk',
            frames: this.anims.generateFrameNames('ruth_normal'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ruth_confused_talk',
            frames: this.anims.generateFrameNames('ruth_confused'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ruth_stern_talk',
            frames: this.anims.generateFrameNames('ruth_stern'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ruth_angry_talk',
            frames: this.anims.generateFrameNames('ruth_angry'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ruth_smug_talk',
            frames: this.anims.generateFrameNames('ruth_smug'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'ruth_laugh_talk',
            frames: this.anims.generateFrameNames('ruth_laugh'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'malarkey_normal_talk',
            frames: this.anims.generateFrameNames('malarkey_normal'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'malarkey_closed_talk',
            frames: this.anims.generateFrameNames('malarkey_closed'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'malarkey_shifty_talk',
            frames: this.anims.generateFrameNames('malarkey_shifty'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'malarkey_neutral_talk',
            frames: this.anims.generateFrameNames('malarkey_neutral'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'r_idle',
            frames: this.anims.generateFrameNames('ruth_idle'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'r_run',
            frames: this.anims.generateFrameNames('ruth_run'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'r_win',
            frames: this.anims.generateFrameNames('ruth_win'),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'm_idle',
            frames: this.anims.generateFrameNames('malarkey'),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'boye',
            frames: this.anims.generateFrameNames('boye'),
            frameRate: 12,
            repeat: -1
        });

        this.ruth.anims.play('r_run');

        //done loading
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.cameras.main.fadeOut(400, 0, 0, 0);
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.time.addEvent({
                        delay: 400,
                        callback: () => {
                            this.scene.start('menuScene');
                        }
                    })
                });
            }
        });
    }

    update() {
        if (this.ruth.x != game.config.width / 2) {
            this.ruth.x += 4;
            if(this.ruth.anims.currentFrame.index == 2 && this.walk1) {
                this.walk1 = false;
                this.walk2 = true;
                this.walk1sound.play();

                //get louder as she walks in
                this.volume += 0.1;
                this.walk1sound.setVolume(this.volume);
                this.walk2sound.setVolume(this.volume);
            }
            if(this.ruth.anims.currentFrame.index == 6 && this.walk2) {
                this.walk1 = true;
                this.walk2 = false;
                this.walk2sound.play();

                //get louder as she walks in
                this.volume += 0.1;
                this.walk1sound.setVolume(this.volume);
                this.walk2sound.setVolume(this.volume);
            }
        } else {
            if (!this.done) {
                this.done = true;
                this.ruth.anims.play('r_idle');
            }
        }
    }
}