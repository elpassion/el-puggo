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

    // ball
    this.load.image("ball", "./assets/sprites/ball.png")

    // ball sprites
    this.load.spritesheet("ball_sprite", "./assets/sprites/ball_sprite.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    // coin sprites
    this.load.spritesheet("coin_sprite", "./assets/sprites/coin_sprite.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.scene.start("Game");
  }
}
