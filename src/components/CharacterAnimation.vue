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
      default: () => characterActions.idle,
    },
    character: {
      type: String,
      required: true,
    },
    modifications: {
      type: Object,
    },
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
      currentModifications: {},
    };
  },
  methods: {
    getCanvas() {
      this.canvas = this.$refs.characterAnimation;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
    animate() {
      requestAnimationFrame(this.animate);
      // update sprite, move to next image
      const animationCompleted = this.characterSprite.update();
      if (animationCompleted) {
        // if animation is completed and die animation has been played, play dead animation
        if (this.currentAnimation === characterActions.die) {
          this.currentAnimation = characterActions.dead;
        } else {
        // else if some other animation has been completed play default (idle) animation
          this.currentAnimation = this.defaultAnimation;
        }
        // let parent component know that past animation has completed, and let it know what the new animation is
        this.$emit('animationComplete', this.currentAnimation);
        // get new sprite
        this.getSprite();
      }
      this.characterSprite.render();
    },
    getSprite() {
      // if a modification (enemy, loop) has been provided use it
      if (this.currentModifications?.mode)
        this.characterMode = this.currentModifications.mode;
      // get correct sprite image from image resources
      this.characterImage =
        gameAssetsService.assets.characters[this.characterMode][this.character][
          this.currentAnimation.name
        ];
      // create sprite object, responsible for rendering one frame of the sprite at a time
      this.characterSprite = sprite({
        context: this.canvas.getContext('2d'),
        width: this.width * this.currentAnimation.numberOfFrames,
        height: this.height,
        image: this.characterImage,
        numberOfFrames: this.currentAnimation.numberOfFrames,
        ticksPerFrame: this.currentAnimation.ticksPerFrame,
        loop:
          this.currentModifications?.loop !== undefined
            ? this.currentModifications.loop
            : this.currentAnimation.loop,
      });
      // render first image
      this.characterSprite.render();
    },
    updateAnimation(animation) {
      this.currentAnimation = animation;
      this.getSprite();
    },
    updateModification(modifications) {
      this.currentModifications = modifications;
      this.getSprite();
    },
  },
  mounted() {
    this.defaultAnimation = characterActions.idle;
    this.currentAnimation = this.animation;
    this.currentModifications = this.modifications;
    this.getCanvas();
    this.getSprite();
    this.animate();
  },
};
</script>

<style lang="scss" scoped>
canvas {
  height: 300px;
}
</style>
