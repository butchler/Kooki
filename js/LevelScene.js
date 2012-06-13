Kooki.LevelScene =
{
   numResources: 5,
   load: function(updateProgress)
   {
      // Load milk, cookie, and monster images.
      this.cookieImages = [];
      for (var i = 0; i < 3; i++)
      {
         this.cookieImages.push(Kooki.loadImage('images/cookie' + i + '.png', updateProgress));
      }

      this.milkImage = Kooki.loadImage('images/milk.png', updateProgress);

      this.monsterImage = Kooki.loadImage('images/monster.png', updateProgress);
   },
   start: function()
   {
      // Create canvas to hold maze so that we don't have to redraw maze every frame.
      this.mazeCanvas = Kooki.createCanvas(Kooki.container, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
      this.mazeContext = this.mazeCanvas.getContext('2d');
      this.mazeCanvas.style.zIndex = 1;

      // Generate first level
      this.maze = new Kooki.Maze(Kooki.MAZE_COLS, Kooki.MAZE_ROWS);
      this.maze.draw(this.mazeContext);

      // Initialize variables
      this.playerPosition = { col: 0, row: 0 };
      this.playerDirection = 'west';

      this.lastPlayerMove = Kooki.gameLoop.now();

      Kooki.input.addListener(this);

      Kooki.gameLoop.setScene(this);
   },
   update: function()
   {
      if (Kooki.gameLoop.millisecondsSince(this.lastPlayerMove) >= Kooki.PLAYER_MOVE_DELAY)
      {
         this.lastPlayerMove = Kooki.gameLoop.now();

         // Move player if there is no wall in the way.
         if (this.maze.cells[this.playerPosition.row][this.playerPosition.col][this.playerDirection] === false)
         {
            this.playerPosition = Kooki.Maze._getPosition(this.playerPosition, this.playerDirection);
         }

         // Check for death

         // Move monsters

         // Check for death

         // Check for win
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
         this.playerDirection = keyDirections[e.keyCode];
   },
   draw: function()
   {
      Kooki.context.fillStyle = 'black';
      Kooki.context.fillRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);

      var sign = function(num)
      {
         if (num > 0)
            return 1;
         else if (num < 0)
            return -1;

         return 0;
      }

      // Draw milk
      // Draw player
      var playerX = this.playerPosition.col * Kooki.CELL_SIZE + 4;
      var playerY = this.playerPosition.row * Kooki.CELL_SIZE + 4;
      Kooki.context.drawImage(this.cookieImages[0], playerX, playerY);

      // Draw monsters
   }
   // On death:
   //    If no more lives, go to game over scene.
   //    Otherwise, respawn with one less life (and update cookie image).
   // On win:
   //    Update score or whatever
   //    Switch to win scene
   //    When it switches back, generate new level
};
