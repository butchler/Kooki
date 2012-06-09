Kooki.LevelScene =
{
   numResources: 0,
   load: function()
   {
      // Load milk, cookie, and monster images.
   },
   start: function()
   {
      // Create canvas to hold maze so that we don't have to redraw maze every frame.
      
      // Generate first level

      // Set up font
      Kooki.context.font = '24px Joystix';
      Kooki.context.textAlign = 'center';
      Kooki.context.textBaseline = 'middle';

      // Clear screen
      Kooki.context.fillStyle = 'black';
      Kooki.context.fillRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);

      // Display message
      Kooki.context.fillStyle = 'white';
      Kooki.context.fillText('Coming Soon', Kooki.SCREEN_WIDTH/2, Kooki.SCREEN_HEIGHT/2);

      this.maze = new Kooki.Maze(Kooki.MAZE_COLS, Kooki.MAZE_ROWS);
      
      Kooki.gameLoop.setScene(this);
   },
   update: function()
   {
      // Update player position
      // Check for death
      // Update monster positions
      // Check for death
      // Check for win
   },
   draw: function()
   {
      // Draw milk
      // Draw player
      // Draw monsters

      Kooki.context.fillStyle = 'black';
      Kooki.context.fillRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
      this.maze.draw(Kooki.context);
   }
   // On death:
   //    If no more lives, go to game over scene.
   //    Otherwise, respawn with one less life (and update cookie image).
   // On win:
   //    Update score or whatever
   //    Switch to win scene
   //    When it switches back, generate new level
};
