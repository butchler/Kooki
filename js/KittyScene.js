// A simple scene just to test things out. Loads random images from placekittens and places kittens on the screen.
Kooki.KittyScene =
{
   load: function(updateProgress)
   {
      // Load a bunch of random kitties from placekitten.
      this.kitties = [];
      this.numResources = 10;
      for (var i = 0; i < this.numResources; i++)
      {
         this.kitties.push(Kooki.loadImage('http://placekitten.com/' + Kooki.randInt(100, 600) + '/' + Kooki.randInt(100, 600), updateProgress));
      }
   },
   start: function()
   {
      Kooki.context.fillStyle = 'black';
      Kooki.context.fillRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);

      this.imageIndex = 0;
      this.imageX = 0;
      this.imageY = 0;
      this.lastKitty = 0;

      Kooki.gameLoop.addListener(this);
   },
   update: function(delta)
   {
      if (Kooki.gameLoop.millisecondsSince(this.lastKitty) > 3000)
      {
         this.lastKitty = Kooki.gameLoop.now();
         this.moarKitties();
      }
   },
   draw: function()
   {
      // Make old images fade away.
      Kooki.context.fillStyle = 'rgba(0, 0, 0, 0.01)';
      Kooki.context.fillRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);
   },
   moarKitties: function()
   {
      this.imageIndex = (this.imageIndex + 1) % this.numResources;
      this.imageX = Kooki.randInt(0, Kooki.SCREEN_WIDTH - this.kitties[this.imageIndex].width);
      this.imageY = Kooki.randInt(0, Kooki.SCREEN_HEIGHT - this.kitties[this.imageIndex].height);
      Kooki.context.drawImage(this.kitties[this.imageIndex], this.imageX, this.imageY);
   }
};
