import { WORLD_CONSTANTS } from '../constants/world-constants';

export class PlatformCreator {
    public static createPlatform(
        scene,
        physics: Phaser.Physics.Arcade.ArcadePhysics,
        levelKey: string = '',
    ): Phaser.Physics.Arcade.StaticGroup {
        scene.add.image(
            WORLD_CONSTANTS.WIDTH / 2,
            WORLD_CONSTANTS.HEIGHT / 2,
            'sky',
        );

        const platforms = physics.add.staticGroup();

        this.createGround(platforms);

        this.createBottomRightPlatform(platforms);
        this.createMiddleLeftPlatform(platforms);
        this.createTopRightPlatform(platforms);

        // uncomment for debugging
        // scene.add.text(0, 0, levelKey, {
        //     fontFamily: '"Roboto Condensed"',
        // });

        return platforms;
    }

    private static createBottomRightPlatform(
        platforms: Phaser.Physics.Arcade.StaticGroup,
    ) {
        platforms
            .create(
                PlatformCreator.getBottomRightPlatformCenterX(),
                PlatformCreator.getBottomRightPlatformCenterY(),
                'ground',
            )
            .setScale(4, 0.5)
            .refreshBody();
    }

    public static getBottomRightPlatformCenterX() {
        return 10 * WORLD_CONSTANTS.TILE_WIDTH;
    }

    public static getBottomRightPlatformCenterY() {
        return 8 * WORLD_CONSTANTS.TILE_HEIGHT;
    }

    private static createMiddleLeftPlatform(
        platforms: Phaser.Physics.Arcade.StaticGroup,
    ) {
        platforms
            .create(
                PlatformCreator.getMiddleLeftPlatformCenterX(),
                PlatformCreator.getMiddleLeftPlatformCenterY(),
                'ground',
            )
            .setScale(4, 0.5)
            .refreshBody();
    }

    public static getMiddleLeftPlatformCenterX() {
        return 2 * WORLD_CONSTANTS.TILE_WIDTH;
    }

    public static getMiddleLeftPlatformCenterY() {
        return 5 * WORLD_CONSTANTS.TILE_HEIGHT;
    }

    private static createTopRightPlatform(
        platforms: Phaser.Physics.Arcade.StaticGroup,
    ) {
        platforms
            .create(
                PlatformCreator.getTopRightPlatformCenterX(),
                PlatformCreator.getTopRightPlatformCenterY(),
                'ground',
            )
            .setScale(4, 0.5)
            .refreshBody();
    }

    public static getTopRightPlatformCenterX() {
        return 10 * WORLD_CONSTANTS.TILE_WIDTH;
    }

    public static getTopRightPlatformCenterY() {
        return 2 * WORLD_CONSTANTS.TILE_HEIGHT;
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
