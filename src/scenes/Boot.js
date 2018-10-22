import BonoSprite from '../../assets/sprites/bono.png';
import TileSetBackground from '../../assets/map/tileset_background.png';
import TileSetFurnitures from '../../assets/map/tileset_furnitures.png';
import BonoMap from '../../assets/map/Bono_map.json';
import BallImage from '../../assets/sprites/ball.png';
import BallSprite from '../../assets/sprites/ball_sprite.png';
import CoinSprite from '../../assets/sprites/coin_sprite.png';
import Klaudia from '../../assets/sprites/klaudia.png';
import collect from '../../assets/sounds/collect.mp3';
import pugWoof from '../../assets/sounds/pugWoof.mp3';
import pugBreathing from '../../assets/sounds/pugBreathing.mp3';


export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    // fix for not working zoom key in main config
    const { canvas: { style: canvasStyle }, config: { width, height, zoom } } = this.game;
    canvasStyle.width = `${width * zoom}px`;
    canvasStyle.height = `${height * zoom}px`;

    this.load.spritesheet('bono', BonoSprite, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // map tiles
    this.load.image('tileset_background', TileSetBackground);
    this.load.image('tileset_furnitures', TileSetFurnitures);

    // map in json format
    this.load.tilemapTiledJSON('map', BonoMap);

    // ball
    this.load.image('ball', BallImage);

    // ball sprites
    this.load.spritesheet('ball_sprite', BallSprite, {
      frameWidth: 32,
      frameHeight: 32,
    });
    // coin sprites
    this.load.spritesheet('coin_sprite', CoinSprite, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image('klaudia', Klaudia);

    this.load.audio('collectSound', collect);
    this.load.audio('woofSound', pugWoof);
    this.load.audio('breathingSound', pugBreathing);
  }

  create() {
    this.scene.start('Game');
  }
}
