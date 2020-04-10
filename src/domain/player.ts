export class GerasPlayer {
    private readonly _player: Phaser.Physics.Arcade.Sprite;

    get player(): Phaser.Physics.Arcade.Sprite {
        return this._player;
    }

    constructor(
        physics: Phaser.Physics.Arcade.ArcadePhysics,
        anims: Phaser.Animations.AnimationManager,
        playerKey: string
    ) {
        this._player = physics.add.sprite(100, 450, playerKey);
        this._player.setBounce(0.2);
        this._player.setCollideWorldBounds(true);

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

    animateLeft() {
        this._player.setVelocityX(-160);
        this._player.anims.play('left', true);
    }

    animateRight() {
        this._player.setVelocityX(160);
        this._player.anims.play('right', true);
    }

    stayStill() {
        this._player.setVelocityX(0);
        this._player.anims.play('turn');
    }

    isOnGround() {
        return this._player.body.touching.down;
    }

    animateJump() {
        this._player.setVelocityY(-330);
    }
}
