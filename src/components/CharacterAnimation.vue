<template>
  <canvas ref="characterAnimation"></canvas>
</template>

<script>
import { mapGetters } from 'vuex';
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
    modification: {
      type: String,
    },
    characterType: {
      type: String,
      default: constants.characterModes.player,
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
      currentAnimation: {},
      currentModification: '',
    };
  },
  computed: {
    ...mapGetters(['pressedKeys']),
  },
  methods: {
    getCanvas() {
      this.canvas = this.$refs.characterAnimation;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
    animate(requestiId) {
      // update sprite, move to next image
      const animationCompleted = this.characterSprite.update();

      // if animation is not completed, continue rendering frames
      if (!animationCompleted) return;

      // if character is dead, don't play any new animations
      if (this.currentAnimation === characterActions.dead) {
        cancelAnimationFrame(requestiId);
        return;
      }

      if (this.currentAnimation === characterActions.die) {
        // if die animation has been played, play dead animation
        this.currentAnimation = characterActions.dead;
        return;
      }

      if (
        // if the character is a player, and there are pressed down keys
        this.characterType === constants.characterModes.player &&
        this.pressedKeys.length > 0
      ) {
        // trigger action for last key that is being helled down
        this.$emit('animationComplete', this.currentAnimation);
        this.$emit(
          'continueAction',
          this.pressedKeys[this.pressedKeys.length - 1]
        );
        return;
      }

      // default: play default animation (idle)
      this.currentAnimation = characterActions.idle;
      // let parent component know that past animation has completed, and let it know what the new animation is
      this.$emit('animationComplete', this.currentAnimation);
      // get new sprite
      this.getSprite();
    },
    handleAnimationFrame() {
      const requestiId = requestAnimationFrame(this.handleAnimationFrame);
      this.animate(requestiId);
      this.characterSprite.render();
    },
    getSprite() {
      // if a modification (enemy) has been provided use it
      if (this.currentModification)
        this.characterMode = this.currentModification;
      // get correct sprite image from image resources
      this.characterImage =
        gameAssetsService.assets.characters[this.characterMode][this.character][
          this.currentAnimation.name
        ];
      // create sprite object, responsible for rendering one frame of the sprite at a time
      this.characterSprite = sprite({
        context: this.canvas.getContext('2d'),
        width: this.width,
        height: this.height,
        image: this.characterImage,
        numberOfFrames: this.currentAnimation.numberOfFrames,
        ticksPerFrame: this.currentAnimation.ticksPerFrame,
        loop: this.currentAnimation.loop,
      });
      // render first image
      this.characterSprite.render();
    },
  },
  mounted() {
    this.currentAnimation = this.animation;
    this.currentModification = this.modification;
    this.getCanvas();
    this.getSprite();
    this.handleAnimationFrame();
  },
  watch: {
    modification: function () {
      this.currentModification = this.modification;
      this.getSprite();
    },
    animation: function () {
      this.currentAnimation = this.animation;
      this.getSprite();
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  height: 300px;
}
</style>
