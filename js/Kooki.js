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

   MAX_MONSTERS: 100,

   // The starting point of the game
   main: function()
   {
      // Set up the canvas.
      Kooki.container = document.getElementById('container');

      Kooki.SCREEN_WIDTH = Kooki.MAZE_COLS * Kooki.CELL_SIZE;
      Kooki.SCREEN_HEIGHT = Kooki.MAZE_ROWS * Kooki.CELL_SIZE;

      Kooki.canvas = Kooki.createCanvas(Kooki.container, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
      Kooki.canvas.focus();
      Kooki.canvas.onblur = function() { Kooki.gameLoop.stop(); }
      Kooki.canvas.onfocus = function() { Kooki.gameLoop.start(); }
      Kooki.context = Kooki.canvas.getContext('2d');

      Kooki.input = new Input(Kooki.canvas);

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
      // Make the canvas keyboard focusable. (Is this a dirty haxx?)
      canvas.tabIndex = 1;
      // Remove outline that browser puts around canvas when it's focused.
      canvas.style.outline = 'none';

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
   }
};
