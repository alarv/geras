import { GerasPlayer } from '../domain/player';
import { PlatformCreator } from '../platform/platform-creator';

const PLAYER_KEY = 'dude';

/**
 * The player is drunk
 */
export class Level2 extends Phaser.Scene {
    public static key: string = 'level2';

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private gerasPlayer: GerasPlayer;
    private randomNumber: number;
    constructor() {
        super(Level2.key);
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

    public create() {
        const platforms = PlatformCreator.createPlatform(
            this,
            this.physics,
            Level2.key,
        );

        this.gerasPlayer = new GerasPlayer(
            PLAYER_KEY,
            this.physics,
            this.anims,
            platforms,
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.gerasPlayer.animateRight();
        setInterval(() => {
            this.randomNumber = Math.random();
        }, 500);
    }

    public update() {
        const drunkMovement = this.randomNumber < 0.4;

        if (drunkMovement) {
            if (this.randomNumber < 0.2) {
                this.gerasPlayer.animateRight();
            } else if (this.randomNumber < 0.4) {
                this.gerasPlayer.animateLeft();
            }

            return;
        }

        if (this.cursors.left.isDown) {
            this.gerasPlayer.animateLeft();
        } else if (this.cursors.right.isDown) {
            this.gerasPlayer.animateRight();
        } else {
            this.gerasPlayer.stayStill();
        }

        if (this.gerasPlayer.isOnGround() && this.cursors.up.isDown) {
            this.gerasPlayer.animateUp();
        }
    }
}
