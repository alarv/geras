import { GerasScene } from '../../domain/scene';

export abstract class GerasIntroScene extends Phaser.Scene
    implements GerasScene {
    private _animationDuration = 1500;

    fadeIn() {
        this.cameras.main.fadeIn(this._animationDuration);
    }

    addListeners() {
        setTimeout(() => {
            this.input.once(
                'pointerdown',
                () => {
                    this.sceneFinished();
                },
                this,
            );
            this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
                if (event.code === 'Space') {
                    this.sceneFinished();
                }
            });
        }, this._animationDuration);
    }

    abstract sceneFinished(): void;
}
