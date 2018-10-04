export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {}
  create() {
    this.scene.start('Game');
  }
}
