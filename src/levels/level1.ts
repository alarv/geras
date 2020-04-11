import { GerasPlayer } from '../domain/player';
import { WORLD_CONSTANTS } from '../constants/world-constants';
import { PlatformCreator } from '../platform/platform-creator';

const PLAYER_KEY = 'dude';

export class Level1 extends Phaser.Scene {
    public static key: string = 'level1';

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private gerasPlayer: GerasPlayer;

    constructor() {
        super(Level1.key);
    }

    preload() {
        this.load.image('sky', 'assets/background.png');
        this.load.image('ground', 'assets/tile-middle.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');

        this.load.spritesheet(PLAYER_KEY, 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        const platforms = PlatformCreator.createPlatform(this, this.physics);

        this.gerasPlayer = new GerasPlayer(
            PLAYER_KEY,
            this.physics,
            this.anims,
            platforms,
        );

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.gerasPlayer.getPosition().x < 500) {
            this.gerasPlayer.animateUp();
            this.gerasPlayer.animateRight();
        }

        // if (this.cursors.left.isDown) {
        //     this.gerasPlayer.animateLeft();
        // } else if (this.cursors.right.isDown) {
        //     this.gerasPlayer.animateRight();
        // } else {
        //     this.gerasPlayer.stayStill();
        // }
        //
        // if (this.cursors.up.isDown && this.gerasPlayer.isOnGround()) {
        //     this.gerasPlayer.animateJump();
        // }
    }
}
