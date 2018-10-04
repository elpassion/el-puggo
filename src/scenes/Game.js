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
    this.physics.add.collider(this.bono, obstacles);

    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    for (var i = 0; i < 30; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(
      this.bono,
      this.spawns,
      this.interactWithBitcoin,
      false,
      this
    );
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000"
    });
    this.scoreText.setScrollFactor(0);
  }

  update() {
    this.bono.update();
  }

  interactWithBitcoin(player, zone) {
    this.scoreText.text = "Score " + ++this.score;
    zone.destroy();
    this.cameras.main.shake(300);
  }

  createBono({ x = 0, y = 0 }) {
    return new Bono({
      scene: this,
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY
    });
  }
}
