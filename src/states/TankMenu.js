
import Phaser from 'phaser';

export default class extends Phaser.State {
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

  init () {
    this.titleText = this.make.text(this.world.centerX, 100, 'Tank Destruction\nPress <esc> to exit', {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText2 = this.make.text(this.world.centerX, 500, 'Testing...', {
      font: 'bold 60pt TheMinion',
      fill: 'red',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }

  preload () {
    this.load.image('startButton', 'assets/tankMenu/power.png');
    this.load.image('stopButton', 'assets/tankMenu/cancel.png');
    this.load.image('background', 'assets/tankMenu/paperBG.jpg');
    this.load.audio('mainTitle', 'assets/audio/QuantumLeap.mp3');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    // this.background = this.add.sprite(0, 0, 'background');
    this.add.sprite(0, 0, 'background');

    // this.stage.disableVisibilityChange = true;
    this.add.existing(this.titleText);
    this.add.existing(this.titleText2);

    this.music = this.add.audio('mainTitle');

    this.music.play();

    // You can listen for each of these events from Phaser.Loader
    this.load.onLoadStart.add(this.loadStart, this);
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);

    // Just to kick things off
    // this.button = this.add.button(this.world.centerY - 100, 300, 'button', this.goToGame, this, 2, 1, 0);
    this.startButton = this.add.button(100, 400, 'startButton', this.goToTank, this, 2, 1, 0);
    this.stopButton = this.add.button(300, 400, 'stopButton', this.goHome, this, 2, 1, 0);
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
    this.escape = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
  }

  update () {
    if (this.escape.isDown) {
      this.goHome();
    }

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
  }

  goToTank () {
    this.state.start('Tank');
    this.music.stop();
  }

  goHome () {
    this.state.start('Splash');
    // this.resetGame();
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
