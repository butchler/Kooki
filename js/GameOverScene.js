Kooki.GameOverScene =
{
   start: function()
   {
      // Set up font
      Kooki.context.font = '36px Joystix';
      Kooki.context.textAlign = 'center';
      Kooki.context.textBaseline = 'middle';

      Kooki.context.clearRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);

      var messages = [
         'Congratulations!',
         'Huzzah!',
         'Fuck Yeah!',
         'Rep that shit!',
         'Hell Yeah!',
         'Woooot!',
         'You Rock!',
         'You Rule!',
         'Sweet!',
         'Oh man!',
         'Oh my goodness...',
         'OMGZ!',
         'LOL!',
         '=DDDD',
         'Weeeeeeeee',
         "I don't believe it!",
         'Amazing!',
         'Unbelievable!',
         'H4X0R!',
         'L33T!',
         "That's Legit!",
         '¡felicidades!'
      ];
      var message = messages[Kooki.randInt(0, messages.length)];

      Kooki.context.fillStyle = 'white';
      Kooki.context.fillText(message, Kooki.SCREEN_WIDTH / 2, Kooki.SCREEN_HEIGHT * 1/4);

      Kooki.context.fillText('You got to level ' + Kooki.LevelScene.level + '!', Kooki.SCREEN_WIDTH / 2, Kooki.SCREEN_HEIGHT * 1/2);

      Kooki.context.fillStyle = 'yellow';
      Kooki.context.fillText('Press enter to play again', Kooki.SCREEN_WIDTH / 2, Kooki.SCREEN_HEIGHT * 3/4);

      Kooki.input.addListener(this);
   },
   keydown: function(e)
   {
      if (e.keyCode === Input.keys.RETURN)
      {
         Kooki.input.removeListener(this);

         Kooki.TitleScene.start();
      }
   }
};
