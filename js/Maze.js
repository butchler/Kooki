Kooki.Maze = function(width, height)
{
   this.width = width;
   this.height = height;

   // Initialize cell matrix.
   this.cells = [];
   for (var row = 0; row < this.height; row++)
   {
      this.cells[row] = [];

      for (var col = 0; col < this.width; col++)
      {
         // Each cell starts with all of its walls up.
         this.cells[row][col] = { north: true, east: true, south: true, west: true, visited: false };
      }
   }

   // Randomly generate maze (start drilling from the top-leftmost cell).
   this._recursivelyDrill({ col: 0, row: 0 });

   this._randomlyRemoveWalls(Kooki.MAZE_REMOVE_WALL_PERCENTAGE / 100 * width * height);
};

// Randomly generate maze by "drilling" through the walls in random directions
// recursively.
Kooki.Maze.prototype._recursivelyDrill = function(startPosition)
{
   this.cells[startPosition.row][startPosition.col].visited = true;

   var randomDirections = Kooki.shuffleArray(Kooki.directions);

   for (var i = 0; i < 4; i++)
   {
      var randomDirection = randomDirections[i];
      var nextPosition = Kooki.getPosition(startPosition, randomDirection);

      if (this._knockDownWall(startPosition, randomDirection))
      {
         this._recursivelyDrill(nextPosition);
      }
   }
};

// Randomly knock down walls from a given number of cells in the maze in
// order to make it more navigable/easier to get to the end.
Kooki.Maze.prototype._randomlyRemoveWalls = function(numCells)
{
   // Make a list of all of the cell positions.
   var allPositions = [];
   for (var row = 0; row < this.height; row++)
   {
      for (var col = 0; col < this.width; col++)
      {
         allPositions.push({ col: col, row: row });

         // At the same time, make all of the cells unvisited again so that
         // _isValidCell doesn't always return false.
         this.cells[row][col].visited = false;
      }
   }

   // Choose numCells random positions from the list.
   var randomPositions = Kooki.shuffleArray(allPositions).slice(0, numCells);

   var self = this;
   randomPositions.forEach(function(position)
   {
      var randomDirections = Kooki.shuffleArray(Kooki.directions);

      for (var i = 0; i < 4; i++)
      {
         var randomDirection = randomDirections[i];

         if (self._knockDownWall(position, randomDirection))
         {
            // Stop after we've knocked down one wall from this cell.
            break;
         }
      }
   });
};

// Knock down both the given cell's wall and the wall of the adjacent cell in
// the given direction. Returns true if it successfully knocked down the walls
// and false otherwise.
Kooki.Maze.prototype._knockDownWall = function(position, direction)
{
   var otherPosition = Kooki.getPosition(position, direction);

   if (!this._isValidCell(otherPosition))
      return false;

   this.cells[position.row][position.col][direction] = false;
   this.cells[otherPosition.row][otherPosition.col][Kooki.oppositeDirection(direction)] = false;

   return true;
};

// Checks if the given position is within the boundaries of the maze and
// if the cell at that position has been visited already.
Kooki.Maze.prototype._isValidCell = function(position)
{
   return ((position.col >= 0 && position.col < this.width &&
           position.row >= 0 && position.row < this.height)
           && !this.cells[position.row][position.col].visited);
};

// Returns true if the cell at the given position has a wall in the given direction.
Kooki.Maze.prototype.hasWall = function(position, direction)
{
   return (this.cells[position.row][position.col][direction] === true);
};

Kooki.Maze.prototype.draw = function(context)
{
   context.fillStyle = '#0000ff';

   for (var row = 0; row < this.height; row++)
   {
      for (var col = 0; col < this.width; col++)
      {
         var cell = this.cells[row][col];
         var x = col * Kooki.CELL_SIZE;
         var y = row * Kooki.CELL_SIZE;

         var topLeft =
         {
            x: x,
            y: y
         };
         var topRight =
         {
            x: x + Kooki.CELL_SIZE - Kooki.WALL_WIDTH,
            y: y
         };
         var bottomLeft =
         {
            x: x,
            y: y + Kooki.CELL_SIZE - Kooki.WALL_WIDTH
         };

         // Draw each of the cell's walls.
         if (cell.north)
         {
            context.fillRect(topLeft.x, topLeft.y, Kooki.CELL_SIZE, Kooki.WALL_WIDTH);
         }
         if (cell.east)
         {
            context.fillRect(topRight.x, topRight.y, Kooki.WALL_WIDTH, Kooki.CELL_SIZE);
         }
         if (cell.south)
         {
            context.fillRect(bottomLeft.x, bottomLeft.y, Kooki.CELL_SIZE, Kooki.WALL_WIDTH);
         }
         if (cell.west)
         {
            context.fillRect(topLeft.x, topLeft.y, Kooki.WALL_WIDTH, Kooki.CELL_SIZE);
         }
      }
   }
};
