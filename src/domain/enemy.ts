import { WORLD_CONSTANTS } from '../constants/world-constants';

export class GerasEnemy {
    private readonly _enemy: Phaser.Physics.Arcade.Sprite;
    public get enemy() {
        return this._enemy;
    }

    constructor(
        private readonly enemyKey: string,
        private readonly scene: Phaser.Scene,
        private readonly platforms: Phaser.Physics.Arcade.StaticGroup,
        private readonly positionX: number,
        private readonly positionY: number,
        private readonly distanceXFromCenter: number = 200,
        private readonly gravity: number = 0,
    ) {
        this._enemy = scene.physics.add.sprite(positionX, positionY, enemyKey);
        this._enemy.setBounce(0.2);
        this._enemy.setCollideWorldBounds(true);
        scene.physics.add.collider(this._enemy, platforms);
        this._enemy.setGravityY(gravity);

        // Create animations
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(enemyKey, {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'turn',
            frames: [{ key: enemyKey, frame: 4 }],
            frameRate: 20,
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(enemyKey, {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.time.delayedCall(Math.random() * 1000, () => {
            this.animateLeft();
        });
    }

    animateLeft(velocity = 100) {
        this._enemy.setVelocityX(-velocity);
        this._enemy.anims.play('left', true);
    }

    animateRight(velocity = 100) {
        this._enemy.setVelocityX(velocity);
        this._enemy.anims.play('right', true);
    }

    update() {
        this._enemy.refreshBody();
        if (
            this._enemy.body.position.x <
                this.positionX - this.distanceXFromCenter ||
            this._enemy.body.position.x - 50 < 0
        ) {
            this.animateRight();
        } else if (
            this._enemy.body.position.x >
                this.positionX + this.distanceXFromCenter ||
            this._enemy.body.position.x + 50 > WORLD_CONSTANTS.WIDTH
        ) {
            this.animateLeft();
        }
    }
}
