import { WORLD_CONSTANTS } from '../constants/world-constants';

export class TheEnd extends Phaser.Scene {
    public static key: string = 'the-end';
    private readonly _animationDuration = 3000;

    constructor() {
        super(TheEnd.key);
    }

    create() {
        this.add
            .text(
                WORLD_CONSTANTS.WIDTH / 2,
                WORLD_CONSTANTS.HEIGHT / 2,
                'THE END\nYou died \nfrom coronavirus',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 60,
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
                'THE END\nYou died \nfrom coronavirus',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 60,
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
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                },
                this,
            );
        }, this._animationDuration);
    }
}
