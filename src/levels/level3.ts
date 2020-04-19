import { GerasPlayer } from '../domain/player';
import { PlatformCreator } from '../platform/platform-creator';
import { WORLD_CONSTANTS } from '../constants/world-constants';
import { IntroLevel4 } from './intros/intro-level4';
import { GerasScene } from '../domain/scene';
import { GerasEnemy } from '../domain/enemy';

const PLAYER_KEY = 'dude';
const ENEMY_COORDINATES = [
    {
        x: WORLD_CONSTANTS.WIDTH / 2,
        y: WORLD_CONSTANTS.HEIGHT - 150,
        distanceXFromCenter: WORLD_CONSTANTS.WIDTH / 2,
    },
    {
        x: PlatformCreator.getMiddleLeftPlatformCenterX(),
        y: PlatformCreator.getMiddleLeftPlatformCenterY() - 50,
        distanceXFromCenter: 170,
    },
    {
        x: PlatformCreator.getBottomRightPlatformCenterX(),
        y: PlatformCreator.getBottomRightPlatformCenterY() - 50,
        distanceXFromCenter: 190,
    },
];

/**
 * Player wants to go to bed and controls are changed
 * They also need to avoid the enemies
 */
export class Level3 extends GerasScene {
    public static key: string = 'level3';

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private gerasPlayer: GerasPlayer;
    private gerasEnemies: GerasEnemy[] = [];

    constructor() {
        super(Level3.key);
    }

    preload() {
        this.load.image('sky', 'assets/background.png');
        this.load.image('ground', 'assets/tile-middle.png');
        this.load.image('bunk-bed', 'assets/bunk-bed.png');

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
        );

        this.gerasEnemies = ENEMY_COORDINATES.map(
            ({ x, y, distanceXFromCenter }, index) =>
                new GerasEnemy(
                    PLAYER_KEY,
                    this,
                    platforms,
                    x,
                    y,
                    distanceXFromCenter,
                ),
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        const bed = this.physics.add.group({
            key: 'bunk-bed',
            setXY: {
                x: WORLD_CONSTANTS.WIDTH - WORLD_CONSTANTS.TILE_WIDTH,
                y: 0,
                stepX: 70,
            },
            bounceY: Phaser.Math.FloatBetween(0.4, 0.8),
        });

        this.physics.add.collider(bed, platforms);

        this.physics.add.overlap(
            this.gerasPlayer.player,
            bed,
            this.collectIcon,
            null,
            this,
        );

        this.physics.add.overlap(
            this.gerasPlayer.player,
            this.gerasEnemies.map((gerasEnemy) => gerasEnemy.enemy),
            this.lost,
            null,
            this,
        );
    }

    update() {
        if (this.cursors.left.isDown) {
            this.gerasPlayer.animateRight();
        } else if (this.cursors.up.isDown) {
            this.gerasPlayer.animateLeft();
        } else {
            this.gerasPlayer.stayStill();
        }

        if (this.cursors.right.isDown && this.gerasPlayer.isOnGround()) {
            this.gerasPlayer.animateUp();
        }

        this.gerasEnemies.forEach((enemy) => enemy.update());
    }

    private collectIcon(player, star) {
        star.disableBody(true, true);
        this.sceneFinished();
    }

    sceneFinished(): void {
        this.scene.start(IntroLevel4.key);
    }

    private lost() {
        // shake the camera
        this.cameras.main.shake(500);

        // restart game
        this.time.delayedCall(
            500,
            function () {
                this.scene.restart();
            },
            [],
            this,
        );
    }
}
