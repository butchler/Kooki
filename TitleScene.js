var TitleScene = function(updateProgress)
{
   // Load a bunch of random kitties from placekitten.
   this.kitties = [];
   this.numResources = 10;
   for (var i = 0; i < this.numResources; i++)
   {
      this.kitties.push(loadImage('http://placekitten.com/' + randint(100, 600) + '/' + randint(100, 600), updateProgress));
   }
};

TitleScene.prototype.start = function()
{
   context.fillStyle = 'black';
   context.fillRect(0, 0, canvas.width, canvas.height);

   this.imageIndex = 0;
   this.imageX = 0;
   this.imageY = 0;

   setInterval(bind(this.moarKitties, this), 300);
};

TitleScene.prototype.update = function(delta)
{
};

TitleScene.prototype.draw = function()
{
};

TitleScene.prototype.moarKitties = function()
{
   this.imageIndex = (this.imageIndex + 1) % this.numResources;
   this.imageX = randint(0, canvas.width - this.kitties[this.imageIndex].width);
   this.imageY = randint(0, canvas.height - this.kitties[this.imageIndex].height);
   context.drawImage(this.kitties[this.imageIndex], this.imageX, this.imageY);
};
