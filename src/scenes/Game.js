import Phaser from "phaser";
import makeAnimations from "../utils/animations";
import Bono from "../sprites/Bono";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });

    this.bono = null;
  }

  create() {
    var map = this.make.tilemap({ key: "map" });
    var tiles = map.addTilesetImage("spritesheet", "tiles");
    var grass = map.createStaticLayer("Grass", tiles, 0, 0);
    var obstacles = map.createStaticLayer("Obstacles", tiles, 0, 0);
    this.bono = this.createBono({});

    makeAnimations(this);
    obstacles.setCollisionByExclusion([-1]);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.bono);
    this.cameras.main.roundPixels = true;
  }

  update() {
    this.bono.update();
  }

  createBono({ x = 0, y = 0 }) {
    return new Bono({
      scene: this,
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY
    });
  }
}
