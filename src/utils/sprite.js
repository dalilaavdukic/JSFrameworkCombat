export default options => {
  let frameIndex = 0; // The current frame to be displayed
  let tickCount = 0; // The number updates since the current frame was first displayed
  let ticksPerFrame = options.ticksPerFrame || 0; // The number of updates until the next frame should be displayed
  let numberOfFrames = options.numberOfFrames || 1;

  const { context, width, height, image, loop } = options;

  return {
    render: function() {
      // clear the canvas
      context.clearRect(0, 0, width, height);
      //draw the image
      context.drawImage(
        image,
        frameIndex * width,
        0,
        width,
        height,
        0,
        0,
        width,
        height
      );
    },
    update: function() {
      let animationCompleted = false;
      tickCount += 1;

      if (tickCount <= ticksPerFrame) return;

      tickCount = 0;

      // If the current frame index is in range
      if (frameIndex < numberOfFrames - 1) {
        // Go to the next frame
        frameIndex += 1;
      } else if (loop) {
        frameIndex = 0;
      } else {
        animationCompleted = true;
      }
      return animationCompleted;
    }
  };
};
