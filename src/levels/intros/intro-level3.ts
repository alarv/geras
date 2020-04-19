import { Level2 } from '../level2';
import { WORLD_CONSTANTS } from '../../constants/world-constants';
import { GerasScene } from '../../domain/scene';
import { GerasIntroScene } from './intro';
import { Level3 } from '../level3';

export class IntroLevel3 extends GerasIntroScene {
    public static key: string = 'intro-level3';

    constructor() {
        super(IntroLevel3.key);
    }

    create() {
        this.add
            .text(
                WORLD_CONSTANTS.WIDTH / 2,
                WORLD_CONSTANTS.HEIGHT / 2,
                `You made it home 🏠` +
                    `\nLet'see if you` +
                    `\ncan make it to bed` +
                    `\nwithout waking up` +
                    `\nyour flatmates`,
                {
                    fontFamily: 'Arial Black',
                    fontSize: 40,
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
                `You made it home 🏠` +
                    `\nLet'see if you` +
                    `\ncan make it to bed` +
                    `\nwithout waking up` +
                    `\nyour flatmates`,
                {
                    fontFamily: 'Arial Black',
                    fontSize: 40,
                    color: '#5B8E7D',
                    align: 'center',
                },
            )
            .setStroke('#F4A259', 16)
            .setOrigin(0.5);

        this.fadeIn();
        this.addListeners();
    }

    sceneFinished(): void {
        this.scene.start(Level3.key);
    }
}
