import Phaser from "phaser";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
    this.direction = "";
    this.SKey;
  }

  create() {
    var map = this.make.tilemap({ key: "map" });
    var tiles = map.addTilesetImage("spritesheet", "tiles");
    var grass = map.createStaticLayer("Grass", tiles, 0, 0);
    var obstacles = map.createStaticLayer("Obstacles", tiles, 0, 0);
    this.bono = this.physics.add.sprite(16 + 4 * 32, 16 + 3 * 32, "bono");

    this.direction = "down";

    const bonanimation = [
      { key: "stay_up", start: 6, end: 7 },
      { key: "stay_down", start: 0, end: 5 },
      { key: "stay_left", start: 18, end: 23 },
      { key: "stay_right", start: 12, end: 17 },
      { key: "move_up", start: 30, end: 35 },
      { key: "move_down", start: 24, end: 29 },
      { key: "move_left", start: 42, end: 47 },
      { key: "move_right", start: 36, end: 41 },
      { key: "sit_up", start: 54, end: 55 },
      { key: "sit_down", start: 48, end: 53 },
      { key: "sit_left", start: 66, end: 70 },
      { key: "sit_right", start: 60, end: 65 }
    ];

    bonanimation.forEach(({ key, start, end, frameRate = 10, repeat = -1 }) => {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers("bono", { start, end }),
        frameRate,
        repeat
      });
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    obstacles.setCollisionByExclusion([-1]);
  }

  update() {
    const { cursors, SKey, bono } = this;
    if (cursors.left.isDown) {
      // bono.setVelocityX(-64);
      this.direction = "left";

      bono.anims.play("move_left", true);
    } else if (cursors.right.isDown) {
      // bono.setVelocityX(64);
      this.direction = "right";

      bono.anims.play("move_right", true);
    } else if (cursors.up.isDown) {
      // bono.setVelocityY(-64);
      this.direction = "up";

      bono.anims.play("move_up", true);
    } else if (cursors.down.isDown) {
      // bono.setVelocityY(64);
      this.direction = "down";

      bono.anims.play("move_down", true);
    } else if (SKey.isDown) {
      // bono.setVelocityX(-64);
      this.direction === "up" && bono.anims.play("sit_up", true);
      this.direction === "down" && bono.anims.play("sit_down", true);
      this.direction === "right" && bono.anims.play("sit_right", true);
      this.direction === "left" && bono.anims.play("sit_left", true);
    } else {
      // bono.setVelocityX(0);
      // bono.setVelocityY(0);
      if (this.direction === "up") bono.anims.play("stay_up", true);
      if (this.direction === "down") bono.anims.play("stay_down", true);
      if (this.direction === "right") bono.anims.play("stay_right", true);
      if (this.direction === "left") bono.anims.play("stay_left", true);
    }
  }
}
