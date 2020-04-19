import { WORLD_CONSTANTS } from '../../constants/world-constants';
import { Level4 } from '../level4';
import { GerasScene } from '../../domain/scene';
import { GerasIntroScene } from './intro';

export class IntroLevel4 extends GerasIntroScene {
    public static key: string = 'intro-level4';

    constructor() {
        super(IntroLevel4.key);
    }

    create() {
        this.add
            .text(
                WORLD_CONSTANTS.WIDTH / 2,
                WORLD_CONSTANTS.HEIGHT / 2,
                'You got old👵\nNot so much power \nleft in you',
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
                'You got old👵\nNot so much power \nleft in you',
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
        this.scene.start(Level4.key);
    }
}
