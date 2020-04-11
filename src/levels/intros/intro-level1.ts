import { Level1 } from '../level1';
import { WORLD_CONSTANTS } from '../../constants/world-constants';

export class IntroLevel1 extends Phaser.Scene {
    public static key: string = 'intro-level1';

    constructor() {
        super(IntroLevel1.key);
    }

    private readonly _animationDuration = 3000;

    create() {
        this.add
            .text(
                WORLD_CONSTANTS.WIDTH / 2,
                WORLD_CONSTANTS.HEIGHT / 2,
                'Geras\nΓῆρας',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 74,
                    color: '#F4A259',
                    align: 'center',
                },
            )
            .setStroke('#F4A259', 16)
            .setAlpha(0.35)
            .setOrigin(0.5);

        this.add
            .text(
                WORLD_CONSTANTS.WIDTH / 2,
                WORLD_CONSTANTS.HEIGHT / 2,
                'Geras\nΓῆρας',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 74,
                    color: '#5B8E7D',
                    align: 'center',
                },
            )
            .setStroke('#F4A259', 16)
            .setOrigin(0.5);

        this.cameras.main.fadeIn(this._animationDuration);

        setTimeout(() => {
            this.input.once(
                'pointerdown',
                () => {
                    this.scene.start(Level1.key);
                },
                this,
            );
        }, this._animationDuration);
    }
}
