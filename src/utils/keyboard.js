class BonoKeyboard {
  constructor(player, scene) {
    this.player = player;
    this.scene = scene;

    this.cursors = scene.input.keyboard.createCursorKeys();
    // creates object with keys codes as follows:
    // 16: true | shift
    // 32: true | spacebar
    // 37: true | left arrow
    // 38: true | up arrow
    // 39: true | right arrow
    // 40: true | down arrow
    this.SKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.lastSend = Date.now();
  }

  update() {
    const { cursors, SKey } = this;
    this.player.body.setVelocity(0);
    if (cursors.left.isDown) {
      this.direction = "left";
      this.player.anims.play("move_left", true);
      this.player.body.setVelocityX(-80);
    } else if (cursors.right.isDown) {
      this.direction = "right";
      this.player.anims.play("move_right", true);
      this.player.body.setVelocityX(80);
    } else if (cursors.up.isDown) {
      this.direction = "up";
      this.player.anims.play("move_up", true);
      this.player.body.setVelocityY(-80);
    } else if (cursors.down.isDown) {
      this.direction = "down";
      this.player.anims.play("move_down", true);
      this.player.body.setVelocityY(80);
    } else if (SKey.isDown) {
      this.direction === "up" && this.player.anims.play("sit_up", true);
      this.direction === "down" && this.player.anims.play("sit_down", true);
      this.direction === "right" && this.player.anims.play("sit_right", true);
      this.direction === "left" && this.player.anims.play("sit_left", true);
    } else {
      if (this.direction === "up") this.player.anims.play("stay_up", true);
      if (this.direction === "down") this.player.anims.play("stay_down", true);
      if (this.direction === "right")
        this.player.anims.play("stay_right", true);
      if (this.direction === "left") this.player.anims.play("stay_left", true);
    }
  }
}

export default BonoKeyboard;
