
import Phaser from 'phaser';

export default class Splash extends Phaser.State {
  constructor () {
    super();
    this.text = '';
    this.button = null;
    this.tank = null;
    this.tankButton = null;
    this.luigiButton = null;
    this.flappyButton = null;
    this.x = 32;
    this.y = 80;
  }

  preload () {
    this.load.image('button', 'assets/star.png');
    this.load.image('tankButton', 'assets/star.png');
    this.load.image('tank', 'assets/tank.png');
    this.load.image('luigiButton', 'assets/star.png');
    this.load.image('flappyButton', 'assets/star.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('map', 'assets/map.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = this.add.sprite(0, 0, 'map');
    this.tank = this.add.sprite(100, 100, 'tank');
    this.physics.arcade.enable(this.tank);
    this.tank.body.immovable = true;
    this.tank.body.collideWorldBounds = true;

    // You can listen for each of these events from Phaser.Loader
    this.load.onLoadStart.add(this.loadStart, this);
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);

    // Just to kick things off
    this.button = this.add.button(this.world.centerY - 100, 300, 'button', this.goToGame, this, 2, 1, 0);
    this.tankButton = this.add.button(this.world.centerY - 100, 500, 'tankButton', this.goToTank, this, 2, 1, 0);
    this.luigiButton = this.add.button(this.world.centerY - 100, 400, 'luigiButton', this.goToLuigi, this, 2, 1, 0);
    this.flappyButton = this.add.button(this.world.centerY - 100, 200, 'flappyButton', this.goToFlappy, this, 2, 1, 0);
    this.text = this.add.text(32, 32, 'hello kitty', { fill: '#ffffff' });
    this.player = this.add.sprite(32, this.world.height - 150, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.player.animations.add('up', [0, 1, 2, 3], 10, true);
    this.player.animations.add('down', [5, 6, 7, 8], 10, true);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.physics.arcade.collide(this.button, this.dude);

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
  }

  goToGame () {
    this.state.start('Game');
  }

  goToTank () {
    this.state.start('Tank');
  }

  goToLuigi () {
    this.state.start('Luigi');
  }

  goToFlappy () {
    this.state.start('Flappy');
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
