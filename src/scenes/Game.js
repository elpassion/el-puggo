import Phaser from 'phaser';
import makeAnimations from '../utils/animations';
import Bono from '../sprites/Bono';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });

    this.bono = null;
  }

  create() {
    var map = this.make.tilemap({ key: "map" });
    var tiles = map.addTilesetImage("spritesheet", "tiles");
    var grass = map.createStaticLayer("Grass", tiles, 0, 0);
    var obstacles = map.createStaticLayer("Obstacles", tiles, 0, 0);
    this.bono = this.addBono({});

    makeAnimations(this);
    obstacles.setCollisionByExclusion([-1]);
  }

  update() {
    this.bono.update();
  }

  addBono({ x = 0, y = 0 }) {
    return new Bono({
      scene: this,
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY,
    });
  }
}
