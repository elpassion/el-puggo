class BonoKeyboard {
  constructor(player, scene) {
    this.player = player;
    this.scene = scene;
    this.direction = "down";
    this.cursors = scene.input.keyboard.createCursorKeys();
    // creates object with keys codes as follows:
    // 16: true | shift
    // 32: true | spacebar
    // 37: true | left arrow
    // 38: true | up arrow
    // 39: true | right arrow
    // 40: true | down arrow
    this.SKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.lastSend = Date.now();
    this.inputDelay = 250;
  }

  update() {
    const { cursors, SKey, DKey, player, scene } = this;

    this.newCoords = { x: player.x, y: player.y };

    if (scene.input.keyboard.checkDown(cursors.left, this.inputDelay)) {
      this.move('left');
    } else if (scene.input.keyboard.checkDown(cursors.right, this.inputDelay)) {
      this.move('right');
    } else if (scene.input.keyboard.checkDown(cursors.up, this.inputDelay)) {
      this.move('up');
    } else if (scene.input.keyboard.checkDown(cursors.down, this.inputDelay)) {
      this.move('down');
    }

    // handle sitting animation
    if (SKey.isDown) {
      this.sit('sit');
    } else if (Phaser.Input.Keyboard.JustUp(SKey)) {
      this.sit('stay');
    }

    if (Phaser.Input.Keyboard.JustDown(DKey)) {
      this.player.ball && this.player.removeBall();
    }
  }

  sit(type) {
    switch (this.player.direction) {
      case 'right':
        this.player.animation = `${type}_right`;
        if (this.player.ball) this.player.ball.animation = `ball_${type}_right`;
        break;
      case 'left':
        this.player.animation = `${type}_left`;
        if (this.player.ball) this.player.ball.animation = `ball_${type}_left`;
        break;
      case 'up':
        this.player.animation = `${type}_up`;
        if (this.player.ball) this.player.ball.animation = `ball_${type}_up`;
        break;
      case 'down':
        this.player.animation = `${type}_down`;
        if (this.player.ball) this.player.ball.animation = `ball_${type}_down`;
        break;
    }
  }

  move(direction) {

    if (this.player.direction !== direction) {
      this.player.animation = `stay_${direction}`;
      if (this.player.ball) this.player.ball.animation = `ball_stay_${direction}`
    } else {
      switch (direction) {
        case 'up': this.newCoords.y -= 32; break;
        case 'down': this.newCoords.y += 32; break;
        case 'left': this.newCoords.x -= 32; break;
        case 'right': this.newCoords.x += 32; break;
      }

      this.scene.physics.moveTo(this.player, this.newCoords.x, this.newCoords.y, null, this.inputDelay);
      this.player.newCoords = this.newCoords;

      this.player.animation = `move_${direction}`;
      if (this.player.ball) this.player.ball.animation = `ball_move_${direction}`
    }
    this.player.direction = direction;
  }
}

export default BonoKeyboard;
