import { GerasPlayer } from '../domain/player';
import { PlatformCreator } from '../platform/platform-creator';
import { WORLD_CONSTANTS } from '../constants/world-constants';
import { TheEnd } from './the-end';

const PLAYER_KEY = 'dude';

export class Level3 extends Phaser.Scene {
    public static key: string = 'level3';

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private gerasPlayer: GerasPlayer;

    constructor() {
        super(Level3.key);
    }
    preload() {
        this.load.image('sky', 'assets/background.png');
        this.load.image('ground', 'assets/tile-middle.png');
        this.load.image('coronavirus', 'assets/coronavirus.png');

        this.load.spritesheet(PLAYER_KEY, 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        const platforms = PlatformCreator.createPlatform(
            this,
            this.physics,
            Level3.key,
        );

        this.gerasPlayer = new GerasPlayer(
            PLAYER_KEY,
            this.physics,
            this.anims,
            platforms,
            800,
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        const coronavirus = this.physics.add.group({
            key: 'coronavirus',
            setXY: {
                x: WORLD_CONSTANTS.WIDTH - WORLD_CONSTANTS.TILE_WIDTH,
                y: WORLD_CONSTANTS.HEIGHT - WORLD_CONSTANTS.TILE_HEIGHT * 2,
                stepX: 70,
            },
            bounceY: Phaser.Math.FloatBetween(0.4, 0.8),
            velocityX: -50,
        });

        this.physics.add.collider(coronavirus, platforms);

        this.physics.add.overlap(
            this.gerasPlayer.player,
            coronavirus,
            this.collectIcon,
            null,
            this,
        );
    }

    update() {
        if (this.cursors.left.isDown) {
            this.gerasPlayer.animateLeft(50);
        } else if (this.cursors.right.isDown) {
            this.gerasPlayer.animateRight(50);
        } else {
            this.gerasPlayer.stayStill();
        }

        if (this.cursors.up.isDown && this.gerasPlayer.isOnGround()) {
            this.gerasPlayer.animateUp();
        }
    }

    private collectIcon(player, star) {
        star.disableBody(true, true);
        this.scene.start(TheEnd.key);
    }
}
