<template>
  <canvas ref="characterAnimation"></canvas>
</template>

<script>
import sprite from '../utils/sprite';
import constants from '@/assets/constants/common';
import gameAssetsService from '@/services/gameAssets.service';
import characterActions from '@/assets/constants/characterActions';

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
      characterMode: constants.characterModes.player,
      defaultAnimation: {},
      currentAnimation: {}
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
      const animationCompleted = this.characterSprite.update();
      if (animationCompleted) {
        this.currentAnimation = this.defaultAnimation;
        this.getSprite();
      }
      this.characterSprite.render();
    },
    getSprite() {
      if (this.currentAnimation.modifications?.mode) this.characterMode = this.currentAnimation.modifications.mode
      this.characterImage = gameAssetsService.assets.characters[this.characterMode][this.currentAnimation.character.name][this.currentAnimation.action.name];
      this.characterSprite = sprite({
        context: this.canvas.getContext("2d"),
        width: this.width*this.currentAnimation.action.numberOfFrames,
        height: this.height,
        image: this.characterImage,
        numberOfFrames: this.currentAnimation.action.numberOfFrames,
        ticksPerFrame: this.currentAnimation.action.ticksPerFrame,
        loop: this.currentAnimation.modifications?.loop || this.currentAnimation.action.loop
      });
      this.characterSprite.render();
    }
  },
  mounted() {
    this.defaultAnimation = {
      character: this.animation.character,
      action: characterActions.idle
    };
    this.currentAnimation = this.animation;
    this.getCanvas();
    this.getSprite();
    this.animate();
  },
  watch: {
    animation: function(newAnimation) {
      this.currentAnimation = newAnimation;
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
