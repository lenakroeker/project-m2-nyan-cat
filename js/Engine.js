
// // scorekeeping
const scoreSpot = document.getElementById("score");
let score = 0;
scoreSpot.innerHTML = score;
let maxscore = 0;

// level
const levelSpot = document.getElementById("level");
let level = 1;
levelSpot.innerHTML = level;






// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // add treats
    this.treats = [];
    // We add the background image to the game
    addBackground(this.root);
  }


  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
      console.log(enemy.parentElement);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // treat section
    this.treats.forEach((treat) => {
      treat.update(timeDiff);
      console.log(treat.parentElement);
    })

    this.treats = this.treats.filter((treat) => {
      return !treat.destroyed;
    })

    while (this.treats.length < MAX_TREATS) {
      const spot = nextTreatSpot(this.treats);
      this.treats.push(new Treat(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      let loseSound = document.createElement("audio");
      loseSound.src = "losesound.mp3";
      loseSound.play();
      score = 0;
      scoreSpot.innerText = score;
      MAX_ENEMIES = 1;
      window.alert(`Game over! Your high-score is ${maxscore}`);
      document.getElementById("start").innerText = "Play Again!";
      return;
    }


    if (this.eatTreat()) {
      score += 5;
      let eatSound = document.createElement("audio");
      eatSound.src = "gamesound.mp3";
      eatSound.play();
      scoreSpot.innerHTML = score;
    }

    if (score > maxscore) {
      maxscore = score;
    }

    if (score < 100) {
      level = 1;
      levelSpot.innerHTML = level;
      let MAX_ENEMIES = 1;
      document.body.style.background = "rgb(255, 194, 192)";
      while (this.enemies.length < MAX_ENEMIES) {
        const spot = nextEnemySpot(this.enemies);
        this.enemies.push(new Enemy(this.root, spot));
      }
    }

    if (score >= 100) {
      level = 2;
      levelSpot.innerHTML = level;
      let MAX_ENEMIES = 2;
      document.body.style.background = "rgb(255, 194, 192)";
      while (this.enemies.length < MAX_ENEMIES) {
        const spot = nextEnemySpot(this.enemies);
        this.enemies.push(new Enemy(this.root, spot));
      }
    }

    if (score >= 200) {
      level = 3;
      levelSpot.innerHTML = level;
      let MAX_ENEMIES = 3;
      document.body.style.background = "rgb(228, 255, 192)";
      while (this.enemies.length < MAX_ENEMIES) {
        const spot = nextEnemySpot(this.enemies);
        this.enemies.push(new Enemy(this.root, spot));
      }
    }

    if (score >= 300) {
      level = 4;
      levelSpot.innerHTML = level;
      let MAX_ENEMIES = 4;
      document.body.style.background = "rgb(188, 152, 255)";
      while (this.enemies.length < MAX_ENEMIES) {
        const spot = nextEnemySpot(this.enemies);
        this.enemies.push(new Enemy(this.root, spot));
      }
    }

    if (score >= 400) {
      level = 4;
      levelSpot.innerHTML = "<span id='final'>final level!</span>";
      let MAX_ENEMIES = 5;
      document.body.style.background = "black";
      while (this.enemies.length < MAX_ENEMIES) {
        const spot = nextEnemySpot(this.enemies);
        this.enemies.push(new Enemy(this.root, spot));
      }
    }

    if (score >= 500) {
      window.alert('You win!!!');
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);

  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let deadness = false;
    this.enemies.map((enemy) => {
      if (enemy.y > GAME_HEIGHT - PLAYER_HEIGHT - ENEMY_HEIGHT && (this.player.x === enemy.x)) {
        deadness = true;
        score = 0;
      }
    })
    return deadness;
  };

  eatTreat = () => {
    let eat = false;
    this.treats.map((treat) => {
      if (treat.y > GAME_HEIGHT - PLAYER_HEIGHT - TREAT_HEIGHT && (this.player.x === treat.x)) {
        eat = true;
      }
    })
    return eat;
  };


}




