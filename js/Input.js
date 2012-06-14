// A simple helper to make accessing current mouse and keyboard info a little easier.
// Usage:
// var input = new Input(canvasElement);
// input.mouse.pressed()        // Returns true or false.
// input.mouse.position()       // Returns { x: ..., y: ... }.
// input.key.pressed(Input.keys.SOME_KEY)   // Returns true or false.
var Input = function(element)
{
   // Private variables
   this._mousePosition = { x: 0, y: 0 };
   this._mousePressed = false;
   this._keys = [];
   this._listeners = [];

   // Add event listeners so that we can keep track of the current mouse and keyboard states.
   var self = this;
   element.addEventListener('mousemove', function(e) { self._mousePosition = { x: e.clientX, y: e.clientY }; });
   element.addEventListener('mousedown', function(e) { self._setMousePressed(e, true); });
   element.addEventListener('mouseup',   function(e) { self._setMousePressed(e, false); });
   element.addEventListener('keydown', function(e) { self._setKeyPressed(e, true); });
   element.addEventListener('keyup',   function(e) { self._setKeyPressed(e, false); });

   element.addEventListener('mousemove', function(e) { self._callListeners('mousemove', e); });
   element.addEventListener('mousedown', function(e) { self._callListeners('mousedown', e); });
   element.addEventListener('mouseup',   function(e) { self._callListeners('mouseup', e); });
   element.addEventListener('keydown', function(e) { self._callListeners('keydown', e); });
   element.addEventListener('keyup',   function(e) { self._callListeners('keyup', e); });

   this.mouse = {
      position: function() { return self._mousePosition; },
      pressed: function() { return self._mousePressed; }
   };

   this.key = {
      pressed: function(key)
      {
         if (self._keys[key] === undefined)
            return false;
         else
            return self._keys[key];
      }
   };
};

// Adding a listener to the Input class is just a shortcut to adding listeners
// for keydown, keyup, mousedown, mouseup, and mousemove all at the same time.
// On all of those events, the Input object will call the corresponding method
// (e.g. object.keydown, object.mousemove) on the given object if it exists.
// Example usage:
// var object =
// {
//    keydown: function(e) { alert('You pressed ' + e.keyCode); },
//    mousedown: function(e) { alert('You pressed ' + e.button); }
// };
// input.addListener(object);
Input.prototype.addListener = function(object)
{
   this._listeners.push(object);
};

Input.prototype.removeListener = function(object)
{
   this._listeners = this._listeners.filter(function(listener) { return listener !== object; });
};

Input.prototype._callListeners = function(eventName, e)
{
   this._listeners.forEach(function(listener)
   {
      if (listener[eventName] !== undefined)
         listener[eventName].call(listener, e);
   });
};

Input.prototype._setMousePressed = function(e, pressed)
{
   this._mousePressed = pressed;
};

Input.prototype._setKeyPressed = function(e, pressed)
{
   this._keys[e.keyCode] = pressed;
};

// Source: https://developer.mozilla.org/en/DOM/KeyboardEvent
Input.keys =
{
   CANCEL: 3,
   HELP: 6,
   BACK_SPACE: 8,
   TAB: 9,
   CLEAR: 12,
   RETURN: 13,
   ENTER: 14,
   SHIFT: 16,
   CONTROL: 17,
   ALT: 18,
   PAUSE: 19,
   CAPS_LOCK: 20,
   ESCAPE: 27,
   SPACE: 32,
   PAGE_UP: 33,
   PAGE_DOWN: 34,
   END: 35,
   HOME: 36,
   LEFT: 37,
   UP: 38,
   RIGHT: 39,
   DOWN: 40,
   SELECT: 41,
   PRINT: 42,
   EXECUTE: 43,
   PRINTSCREEN: 44,
   INSERT: 45,
   DELETE: 46,
   0: 48,
   1: 49,
   2: 50,
   3: 51,
   4: 52,
   5: 53,
   6: 54,
   7: 55,
   8: 56,
   9: 57,
   COLON: 58,
   SEMICOLON: 59,
   LESS_THAN: 60,
   EQUALS: 61,
   GREATER_THAN: 62,
   QUESTION_MARK: 63,
   AT: 64,
   A: 65,
   B: 66,
   C: 67,
   D: 68,
   E: 69,
   F: 70,
   G: 71,
   H: 72,
   I: 73,
   J: 74,
   K: 75,
   L: 76,
   M: 77,
   N: 78,
   O: 79,
   P: 80,
   Q: 81,
   R: 82,
   S: 83,
   T: 84,
   U: 85,
   V: 86,
   W: 87,
   X: 88,
   Y: 89,
   Z: 90,
   CONTEXT_MENU: 93,
   NUMPAD0: 96,
   NUMPAD1: 97,
   NUMPAD2: 98,
   NUMPAD3: 99,
   NUMPAD4: 100,
   NUMPAD5: 101,
   NUMPAD6: 102,
   NUMPAD7: 103,
   NUMPAD8: 104,
   NUMPAD9: 105,
   MULTIPLY: 106,
   ADD: 107,
   SEPARATOR: 108,
   SUBTRACT: 109,
   DECIMAL: 110,
   DIVIDE: 111,
   F1: 112,
   F2: 113,
   F3: 114,
   F4: 115,
   F5: 116,
   F6: 117,
   F7: 118,
   F8: 119,
   F9: 120,
   F10: 121,
   F11: 122,
   F12: 123,
   F13: 124,
   F14: 125,
   F15: 126,
   F16: 127,
   F17: 128,
   F18: 129,
   F19: 130,
   F20: 131,
   F21: 132,
   F22: 133,
   F23: 134,
   F24: 135,
   NUM_LOCK: 144,
   SCROLL_LOCK: 145,
   CIRCUMFLEX: 160,
   KANA: 21,
   HANGUL: 21,
   EISU: 22,
   JUNJA: 23,
   FINAL: 24,
   HANJA: 25,
   KANJI: 25,
   CONVERT: 28,
   NONCONVERT: 29,
   ACCEPT: 30,
   MODECHANGE: 31,
   SELECT: 41,
   PRINT: 42,
   EXECUTE: 43,
   SLEEP: 95
};
