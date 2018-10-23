class Ball extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, (config.key = "ball_sprite"));

    this.parent = config.parent;
    this.scene = config.scene;
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);

    this.direction = config.direction;
    console.log(config);
    this.score = 0;
    this.animation = `ball_stay_${config.direction}`;
  }

  update() {
    this.setPosition(this.parent.x, this.parent.y);
    this.playAnimation();
  }

  playAnimation() {
    this.anims.play(this.animation, true);
  }
}

export default Ball;
