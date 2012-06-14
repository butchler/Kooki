// A very, very simple game engine (really just a game loop).
// Example usage:
// var canvas, context;   // Initialized somewhere else.
// var object =
// {
//    update: function(delta) { console.log(delta + ' milliseconds since last frame.'); },
//    draw: function() { context.fillRect(0, 0, canvas.width, canvas.height); };
// };
// var gameLoop = new GameLoop();
// gameLoop.addListener(object);
// gameLoop.start();

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
   this._listeners = [];     // See addListener() and removeListener()
   this._requestId = null;   // See start() and stop()
   this._timeElapsed = 0;

   // Bind _frame() so that we can pass it to requestAnimationFrame() without
   // losing the reference to this.
   this._frame = this._frame.bind(this);
};

// Adds an object as a listener, meaning that the GameLoop object will call
// object.draw() and object.update() (if they exist) every frame.
GameLoop.prototype.addListener = function(object)
{
   this._listeners.push(object);
};

GameLoop.prototype.removeListener = function(object)
{
   this._listeners = this._listeners.filter(function(listener) { return listener !== object; });
};

GameLoop.prototype._callListeners = function(eventName, arguments)
{
   this._listeners.forEach(function(listener)
   {
      if (listener[eventName] !== undefined)
         listener[eventName].apply(listener, arguments);
   });
};

// Starts the game loop.
GameLoop.prototype.start = function()
{
   // Call stop first because if start were called two times in a row then
   // requestAnimationFrame would be called twice but one of the requets could
   // never be canceled by stop because the _requestId would be lost.
   this.stop();

   // Used in _frame() for calculating the delta to pass along to the
   // update function of the listeners.
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

// The function to be called each animation frame and calls the update() and 
// draw() functions of all of the registered listeners.
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

   this._callListeners('update', [delta]);
   this._callListeners('draw', null);
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
