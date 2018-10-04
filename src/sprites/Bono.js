import BonoKeyboard from '../utils/keyboard';

class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key = 'bono');

    this.scene = config.scene;
    // this.setOrigin(0.0);
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);


    this.direction = 'down';
    this.controls = new BonoKeyboard(this, this.scene);
    this.create();
  }

  create() {}

  update() {
    this.controls.update();
  }
}

export default Player;
