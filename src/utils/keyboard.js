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
  }

  update() {
    const { cursors, SKey, player, scene } = this;
    const inputDelay = 100;

    if (player.isMoving) return;

    const lastCoords = JSON.parse(JSON.stringify(player));
    const newCoords = JSON.parse(JSON.stringify(lastCoords));

    // ['up', 'right', 'down', 'left'].map(direction => {
    //   if (scene.input.keyboard.checkDown(cursors[direction], inputDelay)) {
    //     this.move(direction, newCoords);
    //   }
    // })

    if (scene.input.keyboard.checkDown(cursors.left, inputDelay)) {
      this.move('left', newCoords);
    } else if (scene.input.keyboard.checkDown(cursors.right, inputDelay)) {
      this.move('right', newCoords);
    } else if (scene.input.keyboard.checkDown(cursors.up, inputDelay)) {
      this.move('up', newCoords);
    } else if (scene.input.keyboard.checkDown(cursors.down, inputDelay)) {
      this.move('down', newCoords);
    }

    // handle sitting animation
    if (SKey.isDown) {
      this.sit('sit');
    } else if (Phaser.Input.Keyboard.JustUp(SKey)) {
      this.sit('stay');
    }

    // animate movement with a tween
    if (lastCoords.x !== newCoords.x || lastCoords.y !== newCoords.y) {
      scene.tweens.add({
        targets: player,
        x: newCoords.x,
        y: newCoords.y,
        duration: 300,
        ease: 'Linear',
        onStart: () => {
          player.lastMove = new Date();
          player.isMoving = true;
        },
        onComplete: () => {
          switch (player.direction) {
            case 'up':
              player.animation = 'stay_up';
              if (player.ball) player.ball.animation = 'ball_stay_up';
              break;
            case 'right':
              player.animation = 'stay_right';
              if (player.ball) player.ball.animation = 'ball_stay_right';
              break;
            case 'left':
              player.animation = 'stay_left';
              if (player.ball) player.ball.animation = 'ball_stay_left';
              break;
            case 'down':
              player.animation = 'stay_down';
              if (player.ball) player.ball.animation = 'ball_stay_down';
              break;
          }

          player.isMoving = false;
          player.x = newCoords.x;
          player.y = newCoords.y;
        }
      });
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

  move(direction, newCoords) {
    if (this.player.direction !== direction) {
      this.player.animation = `stay_${direction}`;
      if (this.player.ball) this.player.ball.animation = `ball_stay_${direction}`
    } else {
      switch (direction) {
        case 'up': newCoords.y -= 32; break;
        case 'down': newCoords.y += 32; break;
        case 'left': newCoords.x -= 32; break;
        case 'right': newCoords.x += 32; break;
      }
      this.player.animation = `move_${direction}`;
      if (this.player.ball) this.player.ball.animation = `ball_move_${direction}`
    }
    this.player.direction = direction;
  }
}

export default BonoKeyboard;
