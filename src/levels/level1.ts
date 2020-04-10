import { GerasPlayer } from '../domain/player';

const PLAYER_KEY = 'dude';

export class Level1 extends Phaser.Scene {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private gerasPlayer: GerasPlayer;
    constructor() {
        super('level1');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');

        this.load.spritesheet(PLAYER_KEY, 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.add.image(400, 300, 'sky');

        const platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        this.gerasPlayer = new GerasPlayer(
            this.physics,
            this.anims,
            PLAYER_KEY
        );

        this.physics.add.collider(this.gerasPlayer.player, platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.gerasPlayer.animateLeft();
        } else if (this.cursors.right.isDown) {
            this.gerasPlayer.animateRight();
        } else {
            this.gerasPlayer.stayStill();
        }

        if (this.cursors.up.isDown && this.gerasPlayer.isOnGround()) {
            this.gerasPlayer.animateJump();
        }
    }
}
