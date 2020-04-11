import 'phaser';
import { Level1 } from './levels/level1';
import { Level2 } from './levels/level2';
import GameConfig = Phaser.Types.Core.GameConfig;
import { IntroLevel1 } from './levels/intros/intro-level1';
import { WORLD_CONSTANTS } from './constants/world-constants';
import { IntroLevel2 } from './levels/intros/intro-level2';
import { TheEnd } from './levels/the-end';
import { Level3 } from './levels/level3';
import { IntroLevel3 } from './levels/intros/intro-level3';

const scenes = [
    IntroLevel1,
    Level1,
    IntroLevel2,
    Level2,
    IntroLevel3,
    Level3,
    TheEnd,
];
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');

const config: GameConfig = {
    type: Phaser.AUTO,
    parent: document.getElementById('game'),
    backgroundColor: '#000',
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
game.scene.start(level || IntroLevel1.key);
