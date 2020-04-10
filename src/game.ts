import 'phaser';
import { Level1 } from './levels/level1';
import { Level2 } from './levels/level2';
import GameConfig = Phaser.Types.Core.GameConfig;
import { IntroLevel1 } from './levels/intros/intro-level1';

const config: GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [IntroLevel1, Level1, Level2],
};
const game = new Phaser.Game(config);
game.scene.start('intro-level1');
