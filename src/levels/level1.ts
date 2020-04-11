import { GerasPlayer } from '../domain/player';
import { PlatformCreator } from '../platform/platform-creator';
import { WORLD_CONSTANTS } from '../constants/world-constants';
import { IntroLevel2 } from './intros/intro-level2';

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
        this.load.image('baby-bottle', 'assets/baby-bottle.png');

        this.load.spritesheet(PLAYER_KEY, 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        const platforms = PlatformCreator.createPlatform(
            this,
            this.physics,
            Level1.key,
        );

        this.gerasPlayer = new GerasPlayer(
            PLAYER_KEY,
            this.physics,
            this.anims,
            platforms,
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        const babyBottle = this.physics.add.group({
            key: 'baby-bottle',
            setXY: {
                x: WORLD_CONSTANTS.WIDTH - WORLD_CONSTANTS.TILE_WIDTH,
                y: 0,
                stepX: 70,
            },
            bounceY: Phaser.Math.FloatBetween(0.4, 0.8),
        });

        this.physics.add.collider(babyBottle, platforms);

        this.physics.add.overlap(
            this.gerasPlayer.player,
            babyBottle,
            this.collectIcon,
            null,
            this,
        );
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
            this.gerasPlayer.animateUp();
        }
    }

    private collectIcon(player, star) {
        star.disableBody(true, true);
        this.scene.start(IntroLevel2.key);
    }
}
