import BonoKeyboard from "../utils/keyboard";
import Ball from "../sprites/Ball";

class Bono extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, (config.key = "bono"));

    this.scene = config.scene;
    // this.setOrigin(0.0);
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.direction = "down";
    this.controls = new BonoKeyboard(this, this.scene);
    this.create();
    this.score = 0;
  }

  create() {}

  update() {
    this.controls.update();
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
    });
  }

  removeBall() {
    this.ball.destroy();
    this.ball = null;
  }
}

export default Bono;
