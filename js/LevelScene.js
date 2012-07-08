Kooki.LevelScene =
{
   load: function(updateProgress)
   {
      // Load milk image.
      this.cookieImages = [];
      for (var i = 0; i <= 2; i++)
      {
         this.cookieImages.push(Kooki.loadImage('images/cookie' + i + '.png', updateProgress));
      }

      this.milkImage = Kooki.loadImage('images/milk.png', updateProgress);

      this.monsterImage = Kooki.loadImage('images/monster.png', updateProgress);

      this.numResources = 5;
   },
   start: function()
   {
      // Create canvas to hold maze so that we don't have to redraw maze every frame.
      this.mazeCanvas = Kooki.createCanvas(Kooki.container, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
      this.mazeContext = this.mazeCanvas.getContext('2d');
      // Make sure maze is on top of the canvas so we can actually see it.
      this.mazeCanvas.style.zIndex = Kooki.canvas.style.zIndex + 1;

      // Listen for keydown, mousedown, etc.
      Kooki.input.addListener(this);

      // Listen for update and draw.
      Kooki.gameLoop.addListener(this);

      // Initialize variables.
      this.player = new Kooki.MazeObject(
      {
         col: 0,
         row: 0,
         image: this.cookieImages[0],
         direction: null,
         movementDelay: Kooki.PLAYER_MOVE_DELAY
      });
      // The number of times that the cookie has been munched by a monster.
      this.player.numBites = 0;
      this.player.desiredDirection = null;

      this.level = 0;
      this.startNextLevel();
   },
   startNextLevel: function()
   {
      this.level += 1;

      // Generate and draw a new maze.
      this.maze = new Kooki.Maze(Kooki.MAZE_COLS, Kooki.MAZE_ROWS);
      this.mazeContext.clearRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
      this.maze.draw(this.mazeContext);

      // Reset player position.
      this.player.position = { col: 0, row: 0 };

      // Place milk
      this.milk = new Kooki.MazeObject(
      {
         col: Kooki.MAZE_COLS - 1,
         row: Kooki.randInt(0, Kooki.MAZE_ROWS),
         image: this.milkImage,
         direction: null,
         movementDelay: 0
      });

      // Generate monsters
      var numMonsters = this.level * 3;
      this.monsters = [];
      for (var i = 0; i < numMonsters; i++)
      {
         this.monsters.push(new Kooki.MazeObject(
         {
            col: Kooki.randInt(Math.floor(Kooki.MAZE_COLS / 2), Kooki.MAZE_COLS),
            row: Kooki.randInt(0, Kooki.MAZE_ROWS),
            image: this.monsterImage,
            direction: Kooki.directions[Kooki.randInt(0, 4)],
            movementDelay: Kooki.MONSTER_MOVE_DELAY
         }));
      }
   },
   update: function(delta)
   {
      this.movePlayer();
      this.checkForDeath();
      this.moveMonsters();
      this.checkForDeath();
      this.checkForWin();
   },
   movePlayer: function()
   {
      // Change the player's direction if there aren't any walls in the way.
      if (this.maze.hasWall(this.player.position, this.player.desiredDirection) === false)
      {
         this.player.direction = this.player.desiredDirection;
      }

      this.player.move();
   },
   moveMonsters: function()
   {
      for (var i = 0; i < this.monsters.length; i++)
      {
         var monster = this.monsters[i];

         if (Kooki.gameLoop.millisecondsSince(monster._lastMoved) >= Kooki.MONSTER_MOVE_DELAY)
         {
            // Try moving in other directions randomly until we find one that is
            // not blocked by a wall.
            var randomDirections = Kooki.shuffleArray(Kooki.directions);

            for (var j = 0; j < 4; j++)
            {
               var randomDirection = randomDirections[j];

               // Exclude the opposite of the current direction so that monsters
               // can't make a u-turn.
               if (randomDirection !== Kooki.oppositeDirection(monster.direction) &&
                  !this.maze.hasWall(monster.position, randomDirection))
               {
                  monster.direction = randomDirection;
                  break;
               }
            }

            // If we got stuck in a dead end, choose a random direction.
            if (j === 4)
               monster.direction = randomDirections[0];
         }

         monster.move();
      }
   },
   keydown: function(e)
   {
      var keyDirections = {};
      keyDirections[Input.keys.UP] = 'north';
      keyDirections[Input.keys.RIGHT] = 'east';
      keyDirections[Input.keys.DOWN] = 'south';
      keyDirections[Input.keys.LEFT] = 'west';

      if (keyDirections[e.keyCode] !== undefined)
         this.player.desiredDirection = keyDirections[e.keyCode];
   },
   checkForDeath: function()
   {
      // Check if the player is in the same cell as a monster.
      for (var i = 0; i < this.monsters.length; i++)
      {
         var monster = this.monsters[i];
         if (monster.position.col === this.player.position.col &&
             monster.position.row === this.player.position.row)
         {
            // The player got munched.
            this.player.numBites += 1;
            this.player.image = this.cookieImages[this.player.numBites];

            // Reset their position.
            this.player.position = { col: 0, row: 0 };

            break;
         }
      }

      if (this.player.numBites > 2)
      {
         this.gameOver();
      }
   },
   checkForWin: function()
   {
      if (this.player.position.col === this.milk.position.col &&
          this.player.position.row === this.milk.position.row)
      {
         this.startNextLevel();
      }
   },
   draw: function()
   {
      Kooki.context.clearRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);

      this.milk.draw();
      this.player.draw();
      for (var i = 0; i < this.monsters.length; i++)
      {
         var monster = this.monsters[i];

         // Rotate context to match the monster's direction.
         Kooki.context.save();
         var centerX = (monster.position.col + 0.5) * Kooki.CELL_SIZE;
         var centerY = (monster.position.row + 0.5) * Kooki.CELL_SIZE;
         Kooki.context.translate(centerX, centerY);
         Kooki.context.rotate(Kooki.directions.indexOf(monster.direction) * Math.PI / 2);
         Kooki.context.translate(-centerX, -centerY);

         monster.draw();
         Kooki.context.restore();
      }
   },
   gameOver: function()
   {
      // Clean up.
      Kooki.container.removeChild(this.mazeCanvas);
      Kooki.input.removeListener(this);
      Kooki.gameLoop.removeListener(this);

      // Switch to game over screen.
      Kooki.GameOverScene.start();
   }
};
