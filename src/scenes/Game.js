import Phaser from "phaser";
import makeAnimations from "../utils/animations";
import Bono from "../sprites/Bono";
import Coin from "../sprites/Coin";
import Person from "../sprites/Person";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });

    this.bono = null;
    this.text = null;
    this.spacebar = null;

    this.conversation = {
      Klaudia: [
        "Hi little dogie",
        "woof",
        "where is Claudia?",
        "woof...",
        "go find her, Bono! I count on you <3",
        "WOOF",
      ],
    };
    this.conversationStarted = false;
    this.conversationIndex = 0;
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });
    var tiles2 = this.map.addTilesetImage("tileset_background");
    var tiles1 = this.map.addTilesetImage("tileset_furnitures");
    this.map.createStaticLayer("Background", tiles2, 0, 0);
    this.map.createStaticLayer("Furniture", tiles1, 0, 0);
    this.map.createStaticLayer("Items", tiles1, 0, 0);

    var obstacles = this.map.createStaticLayer("walls", tiles2, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    this.collectSound = this.sound.add('collectSound');
    this.woofSound = this.sound.add('woofSound');
    this.breathingSound = this.sound.add('breathingSound', { loop: true });
    this.woofSound.play();
    this.breathingSound.play();

    this.bono = this.createBono({});
    makeAnimations(this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.physics.world.bounds.width = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels;

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.bono);
    this.cameras.main.roundPixels = true;
    this.physics.add.collider(this.bono, obstacles);

    this.spawnCoins();
    this.spawnBall();

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "16px",
      fill: "#000",
    });
    this.scoreText.setScrollFactor(0);

    this.klaudia = new Person({ scene: this, x: 300, y: 700, key: "klaudia" });
    this.klaudia.body.immovable = true;
    this.physics.add.collider(
      this.bono,
      this.klaudia,
      this.collideWithKlaudia,
      false,
      this
    );
    this.klaudia.name = "Klaudia";
    this.persons = [];
    this.persons.push(this.klaudia);
  }

  _setText(text) {
    if (this.text) this.text.destroy();

    const padding = 10;

    this.text = this.make.text({
      x: this.cameras.main.midPoint.x - this.game.canvas.width / 2,
      y: this.cameras.main.midPoint.y + this.game.canvas.height / 3 / 2,
      text,
      padding,
      style: {
        wordWrap: { width: this.game.canvas.width - 2 * padding },
        fontSize: 9,
      },
    });
  }

  update() {
    if (this.msgBoxContainer && this.msgBoxContainer.visible) {
      this.msgBoxContainer.clear();
      this.msgBoxContainer.fillRectShape(this.msgBox);
      this.msgBox.setPosition(
        this.cameras.main.midPoint.x - this.game.canvas.width / 2,
        this.cameras.main.midPoint.y + this.game.canvas.height / 3 / 2
      );
      this.text.setPosition(
        this.cameras.main.midPoint.x - this.game.canvas.width / 2,
        this.cameras.main.midPoint.y + this.game.canvas.height / 3 / 2
      );
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      const activeTalker =
        this.persons.filter(
          p =>
            Math.abs(p.x - this.bono.x) < 10 &&
            Math.abs(p.y - this.bono.y) < p.height
        )[0] || null;
      if (
        !this.conversationStarted &&
        activeTalker &&
        this.conversation[activeTalker.name]
      ) {
        console.log("asd");
        this.startConversation(this.conversation[activeTalker.name]);
      }
    }

    this.bono.update();
    this.coins.forEach(coin => {
      coin.update();
    });
    this.scoreText.text = "Score " + this.bono.score;
  }

  addMsgBox(text) {
    this.msgBox = new Phaser.Geom.Rectangle(
      this.cameras.main.midPoint.x - this.game.canvas.width / 2,
      this.cameras.main.midPoint.y + this.game.canvas.height / 3,
      this.game.canvas.width,
      this.game.canvas.height / 3
    );
    this.msgBoxContainer = this.add.graphics({
      fillStyle: { color: 0x000000 },
    });
    this.msgBoxContainer.fillRectShape(this.msgBox);
    this._setText(text);
  }

  startConversation(dialog) {
    if (this.msgBoxContainer && this.msgBoxContainer.visible) {
      this.msgBox = null;
      this.msgBoxContainer.destroy();
      this.text.destroy();
      if (dialog[this.conversationIndex]) {
        this.addMsgBox(dialog[this.conversationIndex]);
        this.conversationIndex += 1;
      } else {
        this.conversationIndex = 0;
      }
    } else {
      if (dialog[this.conversationIndex]) {
        this.addMsgBox(dialog[this.conversationIndex]);
        this.conversationIndex += 1;
      } else {
        this.conversationIndex = 0;
      }
    }
  }

  interactWithBitcoin(player, zone) {
    zone.onInteract(player);
    zone.destroy();
  }

  interactWithBall(player, zone) {
    player.getBall();
    zone.destroy();
  }

  interactWithCoin(player, zone) {
    this.collectSound.play();
    player.incrementBitcoins();
    this.coins = this.coins.filter(
      coin => !(coin.x === zone.x && coin.y === zone.y)
    );
    zone.destroy();
  }

  collideWithKlaudia(player, zone) {}

  createBono({ x = 0, y = 0 }) {
    return new Bono({
      scene: this,
      x: this.cameras.main.centerX +100,
      y: this.cameras.main.centerY +80,
    });
  }

  spawnCoins() {
    this.coins = [];
    this.map.getObjectLayer('coins').objects.map((coin) => {
      const coinObject = new Coin({
        scene: this,
        x: coin.x,
        y: coin.y,
      });

      this.coins.push(coinObject);
    });

    this.physics.add.overlap(
      this.bono,
      this.coins,
      this.interactWithCoin,
      false,
      this
    );
  }

  spawnBall() {
    this.map.getObjectLayer('ball').objects.map((ball) => {
      const ballObject = this.physics.add.image(
        ball.x,
        ball.y,
        "ball"
      );

      this.physics.add.overlap(
        this.bono,
        ballObject,
        this.interactWithBall,
        false,
        this
      );
    });
  }
}
