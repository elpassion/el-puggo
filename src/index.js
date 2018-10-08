import Phaser from "phaser";
import { Boot, Game } from "./scenes";

const tileSize = 32;

const config = {
  type: Phaser.AUTO,
  parent: "el-puggo",
  width: 9 * tileSize * 2,
  height: 7 * tileSize * 2,
  pixelArt: true,
  antialias: false,
  title: 'EL Puggo',
  url: 'https://el-puggo.netlify.com',
  physics: {
    default: "arcade",
    arcade: {
      // debug: true // set to true to view zones
    }
  },
  scene: [Boot, Game]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
