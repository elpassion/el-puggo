import Phaser from 'phaser';
import { Boot, Game } from './scenes';

const tileSize = 32;

const config = {
  type: Phaser.AUTO,
  parent: 'el-puggo',
  width: 9 * tileSize,
  height: 7 * tileSize,
  pixelArt: true,
  antialias: false,
  physics: {
    default: 'arcade',
  },
  scene: [
    Boot,
    Game,
  ],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
