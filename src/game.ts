import 'phaser';
import { Level1 } from './levels/level1';
import SceneManager = Phaser.Scenes.SceneManager;
import { Level2 } from './levels/level2';
import GameConfig = Phaser.Types.Core.GameConfig;

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
    scene: [Level1, Level2],
};
const game = new Phaser.Game(config);
// sceneManager.add('level2', new Level2());
game.scene.start('level1');

setTimeout(() => {
    game.scene.remove('level1');
    game.scene.start('level2');
}, 5000);
