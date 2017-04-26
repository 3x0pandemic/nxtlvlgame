
import 'pixi';
import 'p2';
import Phaser from 'phaser';

import Boot from './states/Boot';
import Splash from './states/Splash';
// import Game from './states/Game';
import Tank from './states/Tank';
import Luigi from './states/Luigi';
import Flappy from './states/Flappy';
import Breakout from './states/Breakout';
import TankMenu from './states/TankMenu';

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

    this.state.add('Boot', Boot, false);
    this.state.add('Splash', Splash, false);
    // this.state.add('Game', Game, false);
    this.state.add('Tank', Tank, false);
    this.state.add('Luigi', Luigi, false);
    this.state.add('Flappy', Flappy, false);
    this.state.add('BreakOut', Breakout, false);
    this.state.add('TankMenu', TankMenu, false);
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
