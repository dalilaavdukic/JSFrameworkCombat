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
  props: {
    animation: {
      type: Object,
      default: () => (characterActions.idle)
    },
    character: {
      type: String,
      required: true
    },
    modifications: {
      type: Object
    }
  },
  data() {
    return {
      canvas: {},
      characterImage: {},
      characterSprite: {},
      width: 600,
      height: 600,
      characterMode: constants.characterModes.player,
      defaultAnimation: {},
      currentAnimation: {},
      currentModifications: {}
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
        if (this.currentAnimation === characterActions.die) {
          this.currentAnimation = characterActions.dead;
        } else {
          this.$emit('animationComplete');
          this.currentAnimation = this.defaultAnimation;
        }
        this.getSprite();
      }
      this.characterSprite.render();
    },
    getSprite() {
      if (this.currentModifications?.mode) this.characterMode = this.currentModifications.mode
      this.characterImage = gameAssetsService.assets.characters[this.characterMode][this.character][this.currentAnimation.name];
      this.characterSprite = sprite({
        context: this.canvas.getContext("2d"),
        width: this.width*this.currentAnimation.numberOfFrames,
        height: this.height,
        image: this.characterImage,
        numberOfFrames: this.currentAnimation.numberOfFrames,
        ticksPerFrame: this.currentAnimation.ticksPerFrame,
        loop: this.currentModifications?.loop !== undefined ? this.currentModifications.loop : this.currentAnimation.loop
      });
      this.characterSprite.render();
    },
    updateAnimation(animation) {
      this.currentAnimation = animation;
      this.getSprite();
    },
    updateModification(modifications) {
      this.currentModifications = modifications;
      this.getSprite();
    }
  },
  mounted() {
    this.defaultAnimation = characterActions.idle;
    this.currentAnimation = this.animation;
    this.currentModifications = this.modifications;
    this.getCanvas();
    this.getSprite();
    this.animate();
  }
}
</script>

<style lang="scss" scoped>
canvas {
  height: 300px;
}
</style>
