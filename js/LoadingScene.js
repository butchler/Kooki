Kooki.LoadingScene =
{
   start: function()
   {
      this.numResources = 0;
      this.resourcesLoaded = 0;
      this.updateProgress = this.updateProgress.bind(this);

      // Call the load() function of each scene.
      // These functions can call the callback passed to them which will
      // update the loading progress.
      var scenes = [];
      for (name in Kooki)
      {
         if (name.slice(-5) === 'Scene' && Kooki[name].load !== undefined)
            scenes.push(Kooki[name]);
      }

      var self = this;
      scenes.forEach(function(scene) {
         scene.load(self.updateProgress);
         self.numResources += scene.numResources;
      });

      // Set up font
      Kooki.context.font = '24px Joystix';
      Kooki.context.textAlign = 'center';
      Kooki.context.textBaseline = 'middle';

      Kooki.gameLoop.setScene(this);
   },
   update: function(delta) {},
   draw: function()
   {
      // Clear canvas
      Kooki.context.fillStyle = 'black';
      Kooki.context.fillRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);

      // Display loading message
      Kooki.context.fillStyle = 'white';
      Kooki.context.fillText('Loading...', Kooki.SCREEN_WIDTH/2, Kooki.SCREEN_HEIGHT/2);
   },
   updateProgress: function()
   {
      this.resourcesLoaded += 1;

      // Start the title scene when all resources have been loaded
      if (this.resourcesLoaded == this.numResources)
         Kooki.TitleScene.start();
   }
};
