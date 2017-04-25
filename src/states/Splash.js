
import Phaser from 'phaser';

export default class Splash extends Phaser.State {
  constructor () {
    super();
    this.text = '';
    this.rock = null;
    this.button = null;
    this.tank = null;
    this.bird = null;
    this.luigi = null;
    this.mushroom = null;
    this.tankButton = null;
    this.luigiButton = null;
    this.flappyButton = null;
    this.x = 32;
    this.y = 80;
    this.music = null;
  }

  preload () {
    this.load.image('button', 'assets/star.png');
    this.load.image('tankButton', 'assets/star.png');
    this.load.image('tank', 'assets/tank.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('brick', 'assets/brick.png');
    this.load.image('luigi', 'assets/luigi.png');
    this.load.image('mushroom', 'assets/mushroom.png');
    this.load.image('luigiButton', 'assets/star.png');
    this.load.image('flappyButton', 'assets/bird.png');
    this.load.image('rock', 'assets/rock.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('map', 'assets/grass.png');
    this.load.image('dude', 'assets/sprite.png');
    this.load.image('breakoutButton', 'assets/images/mushroom2.png');
    this.load.audio('mainTitle', 'assets/QuantumLeap.mp3');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = this.add.sprite(0, 0, 'map');

    this.rock1 = this.add.sprite(20, 200, 'rock');
    this.physics.arcade.enable(this.rock1);
    this.rock1.body.immovable = true;
    this.rock1.body.collideWorldBounds = true;

    this.rock2 = this.add.sprite(100, 240, 'rock');
    this.physics.arcade.enable(this.rock2);
    this.rock2.body.immovable = true;
    this.rock2.body.collideWorldBounds = true;

    this.rock3 = this.add.sprite(600, 280, 'rock');
    this.physics.arcade.enable(this.rock3);
    this.rock3.body.immovable = true;
    this.rock3.body.collideWorldBounds = true;

    this.rock4 = this.add.sprite(250, 320, 'rock');
    this.physics.arcade.enable(this.rock4);
    this.rock4.body.immovable = true;
    this.rock4.body.collideWorldBounds = true;

    this.tank = this.add.sprite(100, 100, 'tank');
    this.physics.arcade.enable(this.tank);
    this.tank.body.immovable = true;
    this.tank.body.collideWorldBounds = true;

    this.music = this.add.audio('mainTitle');

    this.music.play();

    this.bird = this.add.sprite(600, 100, 'bird');
    this.physics.arcade.enable(this.bird);
    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;

    this.luigi = this.add.sprite(100, 400, 'luigi');
    this.physics.arcade.enable(this.luigi);
    this.luigi.body.immovable = true;
    this.luigi.body.collideWorldBounds = true;

    // this.mushroom = this.add.sprite(600, 400, 'mushroom');
    // this.physics.arcade.enable(this.mushroom);
    // this.mushroom.body.immovable = true;
    // this.mushroom.body.collideWorldBounds = true;

    this.brick = this.add.sprite(600, 400, 'brick');
    this.physics.arcade.enable(this.brick);
    this.brick.body.immovable = true;
    this.brick.body.collideWorldBounds = true;

    // You can listen for each of these events from Phaser.Loader
    this.load.onLoadStart.add(this.loadStart, this);
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);

    // Just to kick things off
    // this.button = this.add.button(this.world.centerY - 100, 300, 'button', this.goToGame, this, 2, 1, 0);
    // this.tankButton = this.add.button(this.world.centerY - 100, 500, 'tankButton', this.goToTank, this, 2, 1, 0);
    // this.luigiButton = this.add.button(this.world.centerY - 100, 400, 'luigiButton', this.goToLuigi, this, 2, 1, 0);
    // this.flappyButton = this.add.button(this.world.centerY - 100, 200, 'flappyButton', this.goToFlappy, this, 2, 1, 0);
    // this.breakoutButton = this.add.button(this.world.centerY - 100, 50, 'breakoutButton', this.goToBreakOut, this, 2, 1, 0);

    this.text = this.add.text({ fill: '#ffffff' });
    this.player = this.add.sprite(350, 250, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    // this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    // this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    // this.player.animations.add('up', [0, 1, 2, 3], 10, true);
    // this.player.animations.add('down', [5, 6, 7, 8], 10, true);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    // this.physics.arcade.collide(this.button, this.dude);

    if (this.cursors.left.isDown) {
      //  Move to the left
      this.player.body.velocity.x = -150;

      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      //  Move to the right
      this.player.body.velocity.x = 150;

      this.player.animations.play('right');
    } else if (this.cursors.up.isDown) {
      //  Move to the right
      this.player.body.velocity.y = -150;

      this.player.animations.play('up');
    } else if (this.cursors.down.isDown) {
      //  Move to the right
      this.player.body.velocity.y = 150;

      this.player.animations.play('down');
    } else {
      //  Stand still
      this.player.animations.stop();

      this.player.frame = 4;
    }
    if (this.physics.arcade.collide(this.player, this.tank)) {
      this.goToTank();
    }
    if (this.physics.arcade.collide(this.player, this.bird)) {
      this.goToFlappy();
    }
    // if (this.physics.arcade.collide(this.player, this.mushroom)) {
    //   this.goToGame();
    // }
    if (this.physics.arcade.collide(this.player, this.luigi)) {
      this.goToLuigi();
    }
    if (this.physics.arcade.collide(this.player, this.brick)) {
      this.goToBreakOut();
    }
    this.physics.arcade.collide(this.player, this.rock1);
    this.physics.arcade.collide(this.player, this.rock2);
    this.physics.arcade.collide(this.player, this.rock3);
    this.physics.arcade.collide(this.player, this.rock4);
  }

  goToGame () {
    this.state.start('Game');
    this.music.stop();
  }

  goToTank () {
    this.state.start('Tank');
    this.music.stop();
  }

  goToLuigi () {
    this.state.start('Luigi');
    this.music.stop();
  }

  goToFlappy () {
    this.state.start('Flappy');
    this.music.stop();
  }

  goToBreakOut () {
    this.state.start('BreakOut');
    this.music.stop();
  }

  loadStart () {
    this.text.setText('Loading ...');
  }

  // This callback is sent the following parameters:
  fileComplete (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.text.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);

    var newImage = this.add.image(this.x, this.y, cacheKey);

    newImage.scale.set(0.3);

    this.x += newImage.width + 20;

    if (this.x > 700) {
      this.x = 32;
      this.y += 332;
    }
  }

  loadComplete () {
    this.text.setText('Load Complete');
  }
}
