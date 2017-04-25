
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
import Menu from './states/Menu';
import config from './config';

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement;
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.luigiComplete = true;
    this.tankComplete = false;
    this.flappyComplete = false;
    this.breakoutComplete = false;

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.state.add('Tank', TankState, false);
    this.state.add('Luigi', LuigiState, false);
    this.state.add('Flappy', FlappyState, false);
    this.state.add('BreakOut', BreakOutState, false);
    this.state.add('Menu', Menu, false);

    this.state.start('Boot');
  }
  luigiCompleted () {
    this.luigiComplete = true;
    console.log('Luigi: ' + this.luigiComplete);
  }
  tankCompleted () {
    this.tankComplete = true;
    console.log('Tank: ' + this.tankComplete);
  }
  flappyCompleted () {
    this.flappyComplete = true;
    console.log('Flappy: ' + this.flappyComplete);
  }
  breakoutCompleted () {
    this.breakoutComplete = true;
    console.log('Breakout: ' + this.breakoutComplete);
  }
}

window.game = new Game();
