import { WORLD_CONSTANTS } from '../constants/world-constants';

export class PlatformCreator {
    public static createPlatform(
        scene,
        physics: Phaser.Physics.Arcade.ArcadePhysics,
    ): Phaser.Physics.Arcade.StaticGroup {
        scene.add.image(324, 324, 'sky');

        const platforms = physics.add.staticGroup();

        platforms
            .create(
                WORLD_CONSTANTS.WIDTH / 2,
                WORLD_CONSTANTS.HEIGHT - WORLD_CONSTANTS.TILE_HEIGHT / 2,
                'ground',
            )
            .setScale(WORLD_CONSTANTS.WIDTH / WORLD_CONSTANTS.TILE_WIDTH + 1, 1)
            .refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        return platforms;
    }
}
