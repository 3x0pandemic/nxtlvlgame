
import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';
import TankState from './states/Tank';
import LuigiState from './states/Luigi';
import FlappyState from './states/Flappy';
import BreakOutState from './states/Breakout';

import config from './config';

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement;
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.state.add('Tank', TankState, false);
    this.state.add('Luigi', LuigiState, false);
    this.state.add('Flappy', FlappyState, false);
    this.state.add('BreakOut', BreakOutState, false);

    this.state.start('Boot');
  }
}

window.game = new Game();
