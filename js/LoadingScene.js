Kooki.LoadingScene =
{
   start: function()
   {
      this.numResources = 0;
      this.resourcesLoaded = 0;
      this.updateProgress = this.updateProgress.bind(this);

      // Call all of the load() functions in Kooki namespace.
      // These functions can call the callback passed to them which will update
      // the loading progress so that LoadingScene knows when it is finished loading.
      for (name in Kooki)
      {
         var object = Kooki[name];

         if (object.load !== undefined)
         {
            object.load(this.updateProgress);
            this.numResources += object.numResources;
         }
      }

      // Set up font
      Kooki.context.font = '24px Joystix';
      Kooki.context.textAlign = 'center';
      Kooki.context.textBaseline = 'middle';

      Kooki.gameLoop.addListener(this);
   },
   update: function(delta) {},
   draw: function()
   {
      // Clear canvas
      Kooki.context.clearRect(0, 0, Kooki.SCREEN_WIDTH, Kooki.SCREEN_HEIGHT);

      // Display loading message
      Kooki.context.fillStyle = 'white';
      Kooki.context.fillText('Loading...', Kooki.SCREEN_WIDTH/2, Kooki.SCREEN_HEIGHT/2);
   },
   updateProgress: function()
   {
      this.resourcesLoaded += 1;

      // Start the title scene when all resources have been loaded
      if (this.resourcesLoaded == this.numResources)
      {
         Kooki.gameLoop.removeListener(this);
         Kooki.TitleScene.start();
      }
   }
};
