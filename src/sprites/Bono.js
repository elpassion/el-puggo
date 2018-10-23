import BonoKeyboard from "../utils/keyboard";
import Ball from "../sprites/Ball";

class Bono extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, (config.key = "bono"));

    this.scene = config.scene;
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);

    this.direction = "down";
    this.controls = new BonoKeyboard(this, this.scene);
    this.score = 0;
    this.animation = 'stay_down';
    this.ball = null;
  }

  update() {
    this.controls.update();
    this.playAnimation();
    this.ball && this.ball.update();
  }

  incrementBitcoins() {
    this.score++;
  }

  getBall() {
    this.ball = new Ball({
      scene: this.scene,
      x: this.x,
      y: this.y,
      parent: this,
      direction: this.direction,
    });
  }

  removeBall() {
    this.ball.destroy();
    this.ball = null;
  }

  playAnimation() {
    this.anims.play(this.animation, true);
  }
}

export default Bono;
