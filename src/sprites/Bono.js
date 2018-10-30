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
    this.setOrigin(0, 0);
    this.score = 0;
    this.animation = 'stay_down';
    this.drunk = 1; // if drunk it will reverse every move -> value: -1
    this.ball = null;
    this.newCoords = {
      x: null,
      y: null,
    };
  }

  update() {
    this.controls.update();
    this.playAnimation();
    this.ball && this.ball.update();
    if ((Math.round(this.x) === Math.round(this.newCoords.x))
      && (Math.round(this.y) === Math.round(this.newCoords.y))) {
      this.body.reset(Math.round(this.x / 32) * 32, Math.round(this.y / 32) * 32)
      this.animation = `stay_${this.direction}`;
    }
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
    const BonoPosition = { x: this.x, y: this.y };
    setTimeout(() => this.scene.spawnBall(BonoPosition.x + 16, BonoPosition.y + 16), 200);
  }

  playAnimation() {
    this.anims.play(this.animation, true);
  }
}

export default Bono;
