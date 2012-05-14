// A very, very simple game engine (really just a game loop)

// Get requestAnimationFrame and cancelAnimationFrame working in all browsers
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               function (callback)
                               {
                                  return setTimeout(callback, 1000 / 60);
                               };
window.cancelAnimationFrame = window.cancelAnimationFrame ||
                              window.webkitCancelAnimationFrame ||
                              window.mozCancelAnimationFrame ||
                              window.oCancelAnimationFrame ||
                              window.msCancelAnimationFrame ||
                              function (requestId)
                              {
                                 clearTimeout(requestId);
                              };

var Game = function()
{
   this.currentScene = null;   // See setScene()
   this.requestId = null;      // See start() and stop()

   // Bind frame() so that we can pass it to requestAnimationFrame() without losing the reference to this
   this.frame = bind(this.frame, this);
}

// Set's the current scene of the game loop.
// A scene is just an object which contains start(), draw(), and update() functions,
// which are called by game.start() and game.frame().
Game.prototype.startScene = function(newScene)
{
   this.currentScene = newScene;
   this.currentScene.start();
};

// Start's the game loop.
Game.prototype.start = function()
{
   // Used for calculating the delta to pass along to the update function of the current scene
   this.previousFrameStartTime = Date.now();

   this.requestId = requestAnimationFrame(this.frame);
};

// Stop's the game loop if it was started.
Game.prototype.stop = function()
{
   if (this.requestId !== null)
   {
      clearAnimationFrame(this.requestId);
      this.requestId = null;
   }
};

// The function to be called each animation frame.
// Simply calls the current scenes update() and draw() functions.
Game.prototype.frame = function()
{
   // Keep the infinite loop going
   var self = this;
   this.requestId = requestAnimationFrame(this.frame);

   // Calculate the delta, the number of milliseconds that has passed since the previous frame.
   var currentFrameStartTime = Date.now();
   var delta = currentFrameStartTime - this.previousFrameStartTime;
   this.previousFrameStartTime = currentFrameStartTime;

   if (this.currentScene !== null)
   {
      this.currentScene.update(delta);
      this.currentScene.draw();
   }
};

// Helpers to make getting the current mouse and keyboard state a little bit easier.
// Example return values:
// game = new Game();
// game.mouse.position() -> { x: 180, y: 124 }
// game.mouse.pressed() -> false
// game.key.pressed('A') -> true
Game.prototype.mouse = function()
{
   this._position = { x: 0, y: 0 };
   this._pressed = false;

   document.addEventListener('mousemove', function(e) { this.position.x = e.clientX; this.position.y = e.clientY; });
   document.addEventListener('mousedown', function(e) { this.isPressed = true });
   document.addEventListener('mouseup', function(e) { this.isPressed = false; });
};

Game.prototype.mouse.position = function() { return this._position; };
Game.prototype.mouse.pressed = function() { return this._pressed; };

Game.prototype.key = function()
{
   this.keys = [];

   document.addEventListener('mousedown', function(e) { this.keys[e.key] = true; });
   document.addEventListener('mouseup', function(e) { this.keys[e.key] = false; });
};

Game.prototype.key.pressed = function(key)
{
   if (this.keys[key] !== undefined)
      return this.keys[key];
   else
      return false;
};
