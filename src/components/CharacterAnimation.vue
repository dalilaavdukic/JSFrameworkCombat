<template>
  <div class="canvas-container">
    <canvas ref="characterAnimation"></canvas>
  </div>
</template>

<script>
import sprite from '../utils/sprite';
import constants from '@/assets/constants/common';

export default {
  name: 'CharacterAnimation',
  props: ['animation'],
  data() {
    return {
      canvas: {},
      characterImage: new Image(),
      characterSprite: {},
      width: 600,
      height: 600,
      characterMode: constants.characterModes.players
    }
  },
  methods: {
    getCanvas: function() {
      this.canvas = this.$refs.characterAnimation;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.characterSprite.update();
      this.characterSprite.render();
    }
  },
  mounted() {
    this.getCanvas();
    if (this.animation.modifications?.mode) this.characterMode = this.animation.modifications.mode
    this.characterImage.src = require(`../assets/characters/${this.characterMode}/${this.animation.character.name}/${this.animation.action.name}.png`);
    this.characterSprite = sprite({
      context: this.canvas.getContext("2d"),
      width: this.width*this.animation.action.numberOfFrames,
      height: this.height,
      image: this.characterImage,
      numberOfFrames: this.animation.action.numberOfFrames,
      ticksPerFrame: this.animation.action.ticksPerFrame,
      loop: this.animation.modifications?.loop || this.animation.action.loop
    });
    this.characterSprite.render();
    this.animate();
  }
}
</script>

<style lang="scss" scoped>
.canvas-container {
  canvas {
    height: 300px;
  }
}
</style>
