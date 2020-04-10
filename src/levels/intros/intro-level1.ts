import { GerasPlayer } from '../../domain/player';

const PLAYER_KEY = 'dude';

export class IntroLevel1 extends Phaser.Scene {
    constructor() {
        super('intro-level1');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.bitmapFont(
            'desyrel',
            'assets/fonts/bitmapFonts/desyrel.png',
            'assets/fonts/bitmapFonts/desyrel.xml'
        );
    }

    create() {
        this.add
            .text(400, 300, 'Geras\nΓῆρας', {
                fontFamily: 'Arial Black',
                fontSize: 74,
                color: '#F4A259',
                align: 'center',
            })
            .setStroke('#F4A259', 16)
            .setAlpha(0.35)
            .setOrigin(0.5);

        this.add
            .text(400, 300, 'Geras\nΓῆρας', {
                fontFamily: 'Arial Black',
                fontSize: 74,
                color: '#5B8E7D',
                align: 'center',
            })
            .setStroke('#F4A259', 16)
            .setOrigin(0.5);

        this.cameras.main.fadeIn(2500);
    }
}
