export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    this.load.spritesheet("bono", "./assets/sprites/bono.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    // map tiles
    this.load.image("tiles", "assets/map/spritesheet.png");

    // map in json format
    this.load.tilemapTiledJSON("map", "assets/map/map.json");
  }

  create() {
    this.scene.start("Game");
  }
}
