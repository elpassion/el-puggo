import Phaser from 'phaser';
import { Boot, Game } from './scenes';

const config = {
  type: Phaser.AUTO,
  parent: 'el-puggo',
  // width: 272,
  // height: 272,
  width: 9*32,
  height: 7*32,
  zoom: 2,
  pixelArt: true,
  // antialias: false,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scene: [
    Boot,
    Game,
  ],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
