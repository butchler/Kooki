// A very, very simple game engine (really just a game loop)

// Get requestAnimationFrame and cancelAnimationFrame working in all browsers.
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

// The GameLoop class
var GameLoop = function()
{
   // Private variables
   this._currentScene = null;   // See setScene()
   this._requestId = null;      // See start() and stop()
   this._timeElapsed = 0;

   // Bind _frame() so that we can pass it to requestAnimationFrame() without losing the reference to this.
   this._frame = this._frame.bind(this);
};

// Sets the current scene of the game loop.
// A scene is just an object which contains a draw() and an update() function,
// which are called by the _frame() method.
GameLoop.prototype.setScene = function(newScene)
{
   this._currentScene = newScene;
};

// Starts the game loop.
GameLoop.prototype.start = function()
{
   // Used in _frame() for calculating the delta to pass along to the
   // update function of the current scene.
   this._previousFrameStarted = Date.now();

   this._requestId = requestAnimationFrame(this._frame);
};

// Stops the game loop if it was started.
GameLoop.prototype.stop = function()
{
   if (this._requestId !== null)
   {
      cancelAnimationFrame(this._requestId);
      this._requestId = null;
   }
};

// The function to be called each animation frame.
// Simply calls the current scenes update() and draw() functions.
GameLoop.prototype._frame = function()
{
   // Keep the infinite loop going.
   var self = this;
   this._requestId = requestAnimationFrame(this._frame);

   // Calculate the delta, the number of milliseconds that has passed
   // since the previous frame.
   var delta = this.realMillisecondsSince(this._previousFrameStarted);
   this._previousFrameStarted = Date.now();
   this._timeElapsed += delta;

   if (this._currentScene !== null)
   {
      this._currentScene.update(delta);
      this._currentScene.draw();
   }
};

// Returns the game milliseconds since the given time.
// By game milliseconds, I mean the number of milliseconds while the game was
// running, i.e. GameLoop.stop() was not called. Therefore, then should be
// something returned by GameLoop.now(), not Date.now(), since they will be
// different if stop() was called on the GameLoop object.
GameLoop.prototype.millisecondsSince = function(then)
{
   return this.now() - then;
};

GameLoop.prototype.realMillisecondsSince = function(then)
{
   return Date.now() - then;
}

// Returns the number of game milliseconds since GameLoop.start() was called.
GameLoop.prototype.now = function()
{
   return this._timeElapsed;
};
