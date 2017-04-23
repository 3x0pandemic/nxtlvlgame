import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class extends Phaser.State {
  constructor () {
    super();
    this.music = null;
    this.score = 0;
    this.scoreText = null;
  }
  preload () {
    this.load.image('paddle', 'assets/paddle.png');
    this.load.image('brick', 'assets/frenz.jpg');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.audio('hit', 'assets/nes-05-03.wav');
    this.load.audio('music', 'assets/StElmo.mp3');
  }

  create () {
    this.stage.backgroundColor = '#3598db';
    this.add.sprite(0, 0, 'sky');
    this.hitSound = this.add.audio('hit');

    this.music = this.add.audio('music');
    this.music.play();

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

// Start the Arcade physics system (for movements and collisions)
    this.physics.startSystem(Phaser.Physics.ARCADE);

// Add the physics engine to all the game objetcs
    this.world.enableBody = true;

    this.left = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.right = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.paddle = this.add.sprite(200, 550, 'paddle');
    this.paddle.body.immovable = true;
    this.paddle.body.collideWorldBounds = true;

    this.bricks = this.add.group();

    for (var i = 0; i < 12; i++) {
      for (var j = 0; j < 8; j++) {
          // Create the brick at the correct position
        var brick = this.add.sprite(55 + i * 60, 55 + j * 35, 'brick');

          // Make sure the brick won't move when the ball hits it
        brick.body.immovable = true;

          // Add the brick to the group
        this.bricks.add(brick);
      }
    }
    this.ball = this.add.sprite(200, 300, 'ball');

    // Give the ball some initial speed
    this.ball.body.velocity.x = 200;
    this.ball.body.velocity.y = 200;

    // Make sure the ball will bounce when hitting something
    this.ball.body.bounce.setTo(1);
    this.ball.body.collideWorldBounds = true;
  }
  update () {
    if (this.left.isDown) {
      this.paddle.body.velocity.x = -300;
    } else if (this.right.isDown) {
      this.paddle.body.velocity.x = 300;
    } else this.paddle.body.velocity.x = 0;
    // Add collisions between the paddle and the ball
    this.physics.arcade.collide(this.paddle, this.ball);

    // Call the 'hit' function when the ball hits a brick
    this.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

    // Restart the game if the ball is below the paddle
    if (this.ball.y > this.paddle.y) {
      this.state.start('BreakOut');
      this.music.stop();
    }
  }

// New function that removes a brick from the game
  hit (ball, brick) {
    brick.kill();
    this.hitSound.play();
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  }
};