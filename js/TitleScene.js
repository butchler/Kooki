Kooki.TitleScene =
{
   load: function(updateProgress)
   {
      this.titleImage = Kooki.loadImage('images/start.png', updateProgress);
      this.numResources = 1;
   },
   start: function()
   {
      Kooki.input.addListener(this);

      Kooki.context.drawImage(this.titleImage, 0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
   },
   keydown: function(e)
   {
      if (e.keyCode === Input.keys.RETURN)
      {
         Kooki.input.removeListener(this);
         Kooki.LevelScene.start();
      }
   }
};
