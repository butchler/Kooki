// A namespace to hold all of the variables and functions used in the game.
var Kooki =
{
   gameLoop: null,    // The game loop.
   input: null,
   container: null,   // The element that contains the canvas.
   canvas: null,      // The main canvas.
   context: null,     // The main canvas's context.

   // Constants
   MAZE_COLS: 30,
   MAZE_ROWS: 20,

   CELL_SIZE: 30,
   WALL_WIDTH: 3,

   MAZE_REMOVE_WALL_PERCENTAGE: 10,

   PLAYER_MOVE_DELAY: (1000 / 6),
   MONSTER_MOVE_DELAY: (1000 / 4),

   // The starting point of the game
   main: function()
   {
      // Set up the canvas.
      Kooki.container = document.getElementById('container');

      Kooki.SCREEN_WIDTH = Kooki.MAZE_COLS * Kooki.CELL_SIZE;
      Kooki.SCREEN_HEIGHT = Kooki.MAZE_ROWS * Kooki.CELL_SIZE;

      Kooki.canvas = Kooki.createCanvas(Kooki.container, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
      Kooki.context = Kooki.canvas.getContext('2d');

      // Let the canvas container element handle events because there may be
      // multiple canvases (one for the maze, one for the player and monsters, etc.).
      Kooki.input = new Input(Kooki.container);

      // Make the canvas container focusable.
      Kooki.container.tabIndex = 1;
      // Remove outline that the browser puts around the element when it's focused.
      Kooki.container.style.outline = 'none';
      // Make the game focused by default.
      Kooki.container.focus();
      // Make the game loop stop and start when the canvas container loses and gains focus.
      Kooki.container.onblur = function() { Kooki.gameLoop.stop(); }
      Kooki.container.onfocus = function() { Kooki.gameLoop.start(); }

      /*Kooki.mazeCanvas = Kooki.createCanvas(Kooki.container, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
      Kooki.mazeContext = Kooki.mazeCanvas.getContext('2d');*/

      // Start the loading scene.
      Kooki.gameLoop = new GameLoop();
      Kooki.LoadingScene.start();
      Kooki.gameLoop.start();
   },

   // Creates a canvas fixed at the top left corner of the given container
   // element and with the given width and height.
   createCanvas: function(container, width, height)
   {
      container.style.position = 'relative';
      container.style.width = width + 'px';
      container.style.height = height + 'px';

      var canvas = document.createElement('canvas');

      canvas.style.position = 'absolute';
      canvas.style.left = '0';
      canvas.style.top = '0';
      canvas.width = width;
      canvas.height = height;

      container.appendChild(canvas);

      return canvas;
   },

   // Creates an Image object.
   loadImage: function(path, onloadCallback)
   {
      var image = new Image();
      image.onload = onloadCallback;
      image.src = path;

      return image;
   },

   // Returns a random integer between low and (high - 1), inclusive.
   randInt: function(low, high)
   {
      return Math.floor(low + Math.random() * (high - low));
   },

   // Returns a randomly shuffled copy of the given array.
   shuffleArray: function(array)
   {
      // Make a copy of the original.
      var shuffledArray = array.slice();

      for (var i = 0; i < shuffledArray.length; i++)
      {
         // Swap the current element with another one randomly.
         var temp = shuffledArray[i];
         var randomIndex = Kooki.randInt(0, shuffledArray.length);
         shuffledArray[i] = shuffledArray[randomIndex];
         shuffledArray[randomIndex] = temp;
      }

      return shuffledArray;
   },

   directions: [ 'north', 'east', 'south', 'west' ],

   offsets: {
      north: { row: -1, col: 0 },
      east: { row: 0, col: 1 },
      south: { row: 1, col: 0 },
      west: { row: 0, col: -1 }
   },

   // Get the column and row of the adjacent cell in the given direction from the
   // cell at the given position.
   getPosition: function(position, direction)
   {
      return {
         col: (position.col + Kooki.offsets[direction].col),
         row: (position.row + Kooki.offsets[direction].row)
      };
   },

   oppositeDirection: function(direction)
   {
      var index = Kooki.directions.indexOf(direction);

      if (index < 0)
         return null;

      return Kooki.directions[(index + 2) % 4];
   }
};
