export default (options) => {
    let frameIndex = 0; // The current frame to be displayed
    let tickCount = 0; // The number updates since the current frame was first displayed
    let ticksPerFrame = options.ticksPerFrame || 0; // The number of updates until the next frame should be displayed
    let numberOfFrames = options.numberOfFrames || 1;
  
    return {
      context: options.context,
      width: options.width,
      height: options.height,
      image: options.image,
      loop: options.loop,
      render: function() {
        // clear the canvas
        this.context.clearRect(0, 0, this.width, this.height);
        //draw the image
        this.context.drawImage(
          this.image,
          frameIndex * this.width / numberOfFrames,
          0,
          this.width / numberOfFrames,
          this.height,
          0,
          0,
          this.width / numberOfFrames,
          this.height);
      },
      update: function() {
        tickCount += 1;
              
        if (tickCount > ticksPerFrame) {    
            tickCount = 0;
          
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {	
                // Go to the next frame
                frameIndex += 1;
            }	else if (this.loop) {
              frameIndex = 0;
          }
        }
      }
    }    
  }