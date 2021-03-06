export class GerasPlayer {
    private readonly _player: Phaser.Physics.Arcade.Sprite;
    public get player(): Phaser.Physics.Arcade.Sprite {
        return this._player;
    }

    constructor(
        private readonly playerKey: string,
        private readonly physics: Phaser.Physics.Arcade.ArcadePhysics,
        private readonly anims: Phaser.Animations.AnimationManager,
        private readonly platforms: Phaser.Physics.Arcade.StaticGroup,
        private readonly gravity: number = 0,
    ) {
        this._player = physics.add.sprite(100, 450, playerKey);
        this._player.setBounce(0.2);
        this._player.setCollideWorldBounds(true);
        physics.add.collider(this._player, platforms);
        this._player.setGravityY(gravity);

        // Create animations
        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers(playerKey, {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        anims.create({
            key: 'turn',
            frames: [{ key: playerKey, frame: 4 }],
            frameRate: 20,
        });

        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers(playerKey, {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    animateLeft(velocity = 160) {
        this._player.setVelocityX(-velocity);
        this._player.anims.play('left', true);
    }

    animateRight(velocity = 160) {
        this._player.setVelocityX(velocity);
        this._player.anims.play('right', true);
    }

    animateUp() {
        this._player.setVelocityY(-530);
    }

    stayStill() {
        this._player.setVelocityX(0);
        this._player.anims.play('turn');
    }

    isOnGround() {
        return this._player.body.touching.down;
    }
}
