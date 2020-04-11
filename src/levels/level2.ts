import { GerasPlayer } from '../domain/player';
import { PlatformCreator } from '../platform/platform-creator';
import { WORLD_CONSTANTS } from '../constants/world-constants';
import { IntroLevel1 } from './intros/intro-level1';
import { TheEnd } from './the-end';
import { IntroLevel3 } from './intros/intro-level3';

const PLAYER_KEY = 'dude';

/**
 * The player is drunk
 */
export class Level2 extends Phaser.Scene {
    public static key: string = 'level2';

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private gerasPlayer: GerasPlayer;
    private randomNumber: number;
    private readonly drunkPossibility = 0.4;
    private currentTextCount = 0;
    private maxTextCount = 50;

    constructor() {
        super(Level2.key);
    }

    preload() {
        this.load.image('sky', 'assets/background.png');
        this.load.image('ground', 'assets/tile-middle.png');
        this.load.image('taxi', 'assets/taxi.png');

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

        setInterval(() => {
            this.randomNumber = Math.random();
            if (this.currentTextCount < this.maxTextCount) {
                this.currentTextCount++;
                this.add.text(
                    Phaser.Math.FloatBetween(0, WORLD_CONSTANTS.WIDTH),
                    Phaser.Math.FloatBetween(0, WORLD_CONSTANTS.HEIGHT),
                    'Omg so drunk',
                );
            }
        }, 500);

        const taxi = this.physics.add.group({
            key: 'taxi',
            setXY: {
                x: WORLD_CONSTANTS.WIDTH - WORLD_CONSTANTS.TILE_WIDTH,
                y: 0,
                stepX: 70,
            },
            bounceY: Phaser.Math.FloatBetween(0.4, 0.8),
        });

        this.physics.add.collider(taxi, platforms);

        this.physics.add.overlap(
            this.gerasPlayer.player,
            taxi,
            this.collectIcon,
            null,
            this,
        );
    }

    public update() {
        const drunkMovement = this.randomNumber < this.drunkPossibility;

        if (drunkMovement) {
            if (this.randomNumber < this.drunkPossibility / 2) {
                this.gerasPlayer.animateRight();
            } else if (this.randomNumber < this.drunkPossibility) {
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

    private collectIcon(taxi) {
        taxi.disableBody(true, true);
        setTimeout(() => {
            this.scene.start(IntroLevel3.key);
        });
    }
}
