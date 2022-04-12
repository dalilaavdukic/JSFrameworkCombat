<template>
  <canvas ref="characterAnimation"></canvas>
</template>

<script>
import sprite from "../utils/sprite";

const width = 600;
const height = 600;

export default {
  name: "CharacterAnimation",
  props: ["animation"],
  data() {
    return {
      characterSprite: {},
    };
  },
  watch: {
    // whenever animation changes, this function will run
    animation() {
      this.renderSprite();
    },
  },
  methods: {
    animate: function () {
      requestAnimationFrame(this.animate);
      this.characterSprite.update();
      this.characterSprite.render();
    },
    renderSprite: function () {
      const canvas = this.$refs.characterAnimation;
      canvas.width = width;
      canvas.height = height;
      const characterImage = new Image();
      characterImage.src = require(`../assets/characters/${this.animation.character.name}/${this.animation.action.name}.png`);
      this.characterSprite = sprite({
        context: canvas.getContext("2d"),
        width,
        height,
        image: characterImage,
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
canvas {
  height: 300px;
}
</style>
