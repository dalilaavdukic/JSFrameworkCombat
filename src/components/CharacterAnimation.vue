<template>
  <canvas ref="characterAnimation"></canvas>
</template>

<script>
import sprite from '../utils/sprite';
import constants from '@/assets/constants/common';
import gameAssetsService from '@/services/gameAssets.service';

export default {
  name: 'CharacterAnimation',
  props: ['animation'],
  data() {
    return {
      canvas: {},
      characterImage: {},
      characterSprite: {},
      width: 600,
      height: 600,
      characterMode: constants.characterModes.player
    }
  },
  methods: {
    getCanvas() {
      this.canvas = this.$refs.characterAnimation;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.characterSprite.update();
      this.characterSprite.render();
    },
    getSprite() {
      if (this.animation.modifications?.mode) this.characterMode = this.animation.modifications.mode
      this.characterImage = gameAssetsService.assets.characters[this.characterMode][this.animation.character.name][this.animation.action.name];
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
    }
  },
  mounted() {
    this.getCanvas();
    this.getSprite();
    this.animate();
  },
  watch: {
    animation: function(newAnimation) {
      this.animation = newAnimation;
      this.getSprite();
    }
  }
}
</script>

<style lang="scss" scoped>
canvas {
  height: 300px;
}
</style>
