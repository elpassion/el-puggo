export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    this.load.spritesheet("bono", "./assets/sprites/bono.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // map tiles
    this.load.image("tileset_background", "assets/map/tileset_background.png");
    this.load.image("tileset_furnitures", "assets/map/tileset_furnitures.png");

    // map in json format
    this.load.tilemapTiledJSON("map", "assets/map/Bono_map.json");

    // ball
    this.load.image("ball", "./assets/sprites/ball.png");

    // ball sprites
    this.load.spritesheet("ball_sprite", "./assets/sprites/ball_sprite.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    // coin sprites
    this.load.spritesheet("coin_sprite", "./assets/sprites/coin_sprite.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image("klaudia", "./assets/sprites/klaudia.png");
  }

  create() {
    this.scene.start("Game");
  }
}
