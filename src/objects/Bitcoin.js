export default class extends Phaser.GameObjects.Zone {
  onInteract(player) {
    player.incrementBitcoins();
  }
}
