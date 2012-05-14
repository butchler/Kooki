var game, container, canvas, context;
var titleScene, levelScene;

var WIDTH = 800;
var HEIGHT = 600;

// Creates a canvas fixed at the top left corner of the given container and with the given width and height.
var createCanvas = function(container, width, height)
{
   var canvas = document.createElement('canvas');
   canvas.style.position = 'absolute';
   canvas.style.left = container.offsetLeft;
   canvas.style.top = container.offsetTop;
   canvas.width = width;
   canvas.height = height;
   container.appendChild(canvas);

   return canvas;
};

// Returns a function that is bound to the given object, meaning that the function's
// 'this' variable will be equal to the given object no matter where it's called from.
var bind = function(func, object)
{
   return function() { func.apply(object, arguments); };
};

// Creates an Image object.
var loadImage = function(path, onloadCallback)
{
   var image = new Image();
   image.onload = onloadCallback;
   image.src = path;

   return image;
};

// Returns a random integer between low and (high - 1), inclusive.
var randint = function(low, high)
{
   return Math.floor(low + Math.random() * (high - low));
};
