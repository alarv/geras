import 'phaser';
import GameConfig = Phaser.Types.Core.GameConfig;
import { WORLD_CONSTANTS } from './constants/world-constants';
import { LoadingScreen } from './loading-screen';
import { IntroLevel1 } from './levels/intros/intro-level1';
import { Level1 } from './levels/level1';
import { IntroLevel2 } from './levels/intros/intro-level2';
import { Level2 } from './levels/level2';
import { IntroLevel4 } from './levels/intros/intro-level4';
import { Level4 } from './levels/level4';
import { TheEnd } from './levels/the-end';
import { Level3 } from './levels/level3';
import { IntroLevel3 } from './levels/intros/intro-level3';

const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');
const scenes = [
    LoadingScreen,
    IntroLevel1,
    Level1,
    IntroLevel2,
    Level2,
    IntroLevel3,
    Level3,
    IntroLevel4,
    Level4,
    TheEnd,
];

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
game.scene.start(level || LoadingScreen.key);
