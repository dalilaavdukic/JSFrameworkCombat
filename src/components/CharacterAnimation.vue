<template>
  <div class="canvas-container">
    <canvas ref="characterAnimation"></canvas>
  </div>
</template>

<script>
import sprite from "../utils/sprite";

export default {
  name: "CharacterAnimation",
  props: ["animation"],
  data() {
    return {
      canvas: {},
      characterImage: new Image(),
      characterSprite: {},
      width: 600,
      height: 600,
    };
  },
  watch: {
    // whenever animation changes, this function will run
    animation() {
      this.renderSprite();
    },
  },
  methods: {
    getCanvas: function () {
      this.canvas = this.$refs.characterAnimation;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.characterSprite.update();
      this.characterSprite.render();
    },
    renderSprite: function () {
      this.getCanvas();
      this.characterImage.src = require(`../assets/characters/${this.animation.character.name}/${this.animation.action.name}.png`);
      this.characterSprite = sprite({
        context: this.canvas.getContext("2d"),
        width: this.width * this.animation.action.numberOfFrames,
        height: this.height,
        image: this.characterImage,
        numberOfFrames: this.animation.action.numberOfFrames,
        ticksPerFrame: this.animation.action.ticksPerFrame,
        loop: this.animation.action.loop,
      });
      this.characterSprite.render();
    },
  },
  mounted() {
    this.renderSprite();
    this.animate();
  },
};
</script>

<style lang="scss" scoped>
.canvas-container {
  canvas {
    height: 300px;
  }
}
</style>
