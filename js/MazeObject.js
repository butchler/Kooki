Kooki.MazeObject = function(options)
{
   this.position = { col: options.col, row: options.row };
   this.image = options.image;
   this.direction = options.direction;
   this.movementDelay = options.movementDelay;

   this._lastMoved = Kooki.gameLoop.now();
};

Kooki.MazeObject.prototype.move = function(delta)
{
   if (Kooki.gameLoop.millisecondsSince(this._lastMoved) >= this.movementDelay)
   {
      this._lastMoved = Kooki.gameLoop.now();

      // Move if there aren't any walls in the way.
      if (this.direction !== null && Kooki.LevelScene.maze.hasWall(this.position, this.direction) === false)
      {
         this.position = Kooki.getPosition(this.position, this.direction);
      }
   }
};

Kooki.MazeObject.prototype.draw = function()
{
   var x = this.position.col * Kooki.CELL_SIZE;
   var y = this.position.row * Kooki.CELL_SIZE;
   Kooki.context.drawImage(this.image, x, y);
};
