import Phaser from "phaser";
import { Boot, Game } from "./scenes";
import '../assets/styles/index.scss';

const tileSize = 32;

const config = {
  type: Phaser.AUTO,
  parent: "el-puggo",
  width: 9 * tileSize,
  height: 7 * tileSize,
  pixelArt: true,
  antialias: false,
  zoom: 3,
  backgroundColor: '#0d212e',
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
