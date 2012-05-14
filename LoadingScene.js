var LoadingScene = function()
{
   container = document.getElementById('container');

   canvas = createCanvas(container, WIDTH, HEIGHT);
   context = canvas.getContext('2d');

   this.updateProgress = bind(this.updateProgress, this);
   titleScene = new TitleScene(this.updateProgress);
   levelScene = new LevelScene(this.updateProgress);
   this.currentProgress = 0;
   this.totalProgress = titleScene.numResources + levelScene.numResources;
};

LoadingScene.prototype.start = function()
{
};

LoadingScene.prototype.update = function(delta)
{
};

LoadingScene.prototype.draw = function()
{
   // Clear canvas
   context.fillStyle = 'black';
   context.fillRect(0, 0, canvas.width, canvas.height);

   // Display current progress
   context.fillStyle = 'white';
   context.fillText('Loaded ' + this.currentProgress + '/' + this.totalProgress + ' resources.', 10, 10);
}

LoadingScene.prototype.updateProgress = function()
{
   this.currentProgress += 1;

   if (this.currentProgress == this.totalProgress)
   {
      // Switch to the title screen
      game.startScene(titleScene);
   }
}
