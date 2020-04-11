import 'phaser';
import { Level1 } from './levels/level1';
import { Level2 } from './levels/level2';
import GameConfig = Phaser.Types.Core.GameConfig;
import { IntroLevel1 } from './levels/intros/intro-level1';
import { WORLD_CONSTANTS } from './constants/world-constants';

const scenes = [IntroLevel1, Level1, Level2];

const config: GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: WORLD_CONSTANTS.WIDTH,
    height: WORLD_CONSTANTS.HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false,
        },
    },
    scene: scenes,
};

const game = new Phaser.Game(config);
game.scene.start(Level2.key);
