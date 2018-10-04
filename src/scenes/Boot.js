export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.spritesheet('bono',
      './assets/sprites/bono.png',
      { frameWidth: 32, frameHeight: 32 }
    );
  }

  create() {
    this.scene.start('Game');
  }
}
