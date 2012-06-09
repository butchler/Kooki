Kooki.TitleScene =
{
   numResources: 1,
   load: function(updateProgress)
   {
      this.titleImage = Kooki.loadImage('images/start.png', updateProgress);
   },
   start: function()
   {
      Kooki.gameLoop.setScene(this);
   },
   update: function()
   {
      if (Kooki.input.key.pressed(Input.key.RETURN))
         Kooki.LevelScene.start();
   },
   draw: function()
   {
      Kooki.context.drawImage(this.titleImage, 0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
   }
};
