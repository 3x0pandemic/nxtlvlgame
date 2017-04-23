import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class extends Phaser.State {
  constructor () {
    super();
    this.cursors = null;
    this.player = null;
    this.platforms = null;
    this.star = null;
    this.stars = null;
    this.score = 0;
    this.scoreText = null;
  }

  preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  }

  create () {
  // this.add.sprite(0, 0, 'star');
  //  We're going to be using physics, so enable the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    this.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    this.ground = this.platforms.create(0, this.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    this.ground.body.immovable = true;

    //  Now let's create two ledges
    this.ledge = this.platforms.create(400, 400, 'ground');

    this.ledge.body.immovable = true;

    this.ledge = this.platforms.create(-150, 250, 'ground');

    this.ledge.body.immovable = true;

    // The player and its settings
    this.player = this.add.sprite(32, this.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 200;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Our controls.
    this.cursors = this.input.keyboard.createCursorKeys();
    this.stars = this.add.group();

    this.stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++) {
       //  Create a star inside of the 'stars' group
      this.star = this.stars.create(i * 70, 0, 'star');

       //  Let gravity do its thing
      this.star.body.gravity.y = 20;

      //  This just gives each star a slightly random bounce value
      this.star.body.bounce.y = 0.3 + Math.random() * 0.2;
    }
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  }

  update () {
    if (this.score < 120) {
      //  Collide the player and the stars with the platforms
      this.hitPlatform = this.physics.arcade.collide(this.player, this.platforms);
      //  Reset the players velocity (movement)
      this.player.body.velocity.x = 0;

      if (this.cursors.left.isDown) {
           //  Move to the left
        this.player.body.velocity.x = -150;
        this.player.animations.play('left');
      } else if (this.cursors.right.isDown) {
           //  Move to the right
        this.player.body.velocity.x = 150;
        this.player.animations.play('right');
      } else {
           //  Stand still
        this.player.animations.stop();
        this.player.frame = 4;
      }

         //  Allow the player to jump if they are touching the ground.
      if (this.cursors.up.isDown && this.player.body.touching.down && this.hitPlatform) {
        this.player.body.velocity.y = -300;
      }
      this.physics.arcade.collide(this.stars, this.platforms);
      this.physics.arcade.overlap(this.player, this.stars, collectStar, null, this);
    } else {
      this.goHome();
    }
    function collectStar (player, star) {
      star.kill();
      this.score += 10;
      this.scoreText.text = 'Score: ' + this.score;
    }
  }

  goHome () {
    this.state.start('Splash');
  }
}
