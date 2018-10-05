class Person extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    this.parent = config.parent;
    this.scene = config.scene;
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.create();
  }

  create() {}
  update() {}
}

export default Person;
