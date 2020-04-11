import { WORLD_CONSTANTS } from '../constants/world-constants';

export class PlatformCreator {
    public static createPlatform(
        scene,
        physics: Phaser.Physics.Arcade.ArcadePhysics,
        levelKey: string = '',
    ): Phaser.Physics.Arcade.StaticGroup {
        scene.add.image(324, 324, 'sky');

        const platforms = physics.add.staticGroup();

        this.createGround(platforms);

        this.createTopRightPlatform(platforms);
        this.createMiddleLeftPlatform(platforms);
        this.createBottomRightPlatform(platforms);

        scene.add.text(0, 0, levelKey, {
            fontFamily: '"Roboto Condensed"',
        });

        return platforms;
    }

    private static createBottomRightPlatform(
        platforms: Phaser.Physics.Arcade.StaticGroup,
    ) {
        platforms
            .create(
                WORLD_CONSTANTS.WIDTH - WORLD_CONSTANTS.TILE_WIDTH / 2,
                (6 * WORLD_CONSTANTS.HEIGHT) / 8 -
                    WORLD_CONSTANTS.TILE_HEIGHT / 2,
                'ground',
            )
            .setScale(5, 0.5)
            .refreshBody();
    }

    private static createMiddleLeftPlatform(
        platforms: Phaser.Physics.Arcade.StaticGroup,
    ) {
        platforms
            .create(
                WORLD_CONSTANTS.TILE_WIDTH / 2,
                (4 * WORLD_CONSTANTS.HEIGHT) / 8 -
                    WORLD_CONSTANTS.TILE_HEIGHT / 2,
                'ground',
            )
            .setScale(5, 0.5)
            .refreshBody();
    }

    private static createTopRightPlatform(
        platforms: Phaser.Physics.Arcade.StaticGroup,
    ) {
        platforms
            .create(
                WORLD_CONSTANTS.WIDTH - WORLD_CONSTANTS.TILE_WIDTH / 2,
                (2 * WORLD_CONSTANTS.HEIGHT) / 8 -
                    WORLD_CONSTANTS.TILE_HEIGHT / 2,
                'ground',
            )
            .setScale(5, 0.5)
            .refreshBody();
    }

    private static createGround(platforms: Phaser.Physics.Arcade.StaticGroup) {
        platforms
            .create(
                WORLD_CONSTANTS.WIDTH / 2,
                WORLD_CONSTANTS.HEIGHT - WORLD_CONSTANTS.TILE_HEIGHT / 2,
                'ground',
            )
            .setScale(WORLD_CONSTANTS.WIDTH / WORLD_CONSTANTS.TILE_WIDTH + 1, 1)
            .refreshBody();
    }
}
