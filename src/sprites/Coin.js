class Coin extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, (config.key = "coin_sprite"));

    this.parent = config.parent;
    this.scene = config.scene;
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.direction = "down";
    this.create();
    this.score = 0;
  }

  create() {}
  update() {
    this.anims.play('coin_rotate', true);
    //this.setPosition(this.parent.x, this.parent.y)
  }

}

export default Coin;
