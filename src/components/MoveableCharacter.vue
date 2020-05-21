<template>
  <character-animation
    ref="characterAnimation"
    class="character"
    :class = "{'jump-animation': isJumping}"
    :style="[position, transition]" 
    :character="character" 
    :animation="animation"
    :modifications="modifications">
  </character-animation>
</template>
<script>
import CharacterAnimation from '@/components/CharacterAnimation';
import characters from '@/assets/constants/characters';
import constants from '@/assets/constants/common';
import characterActions from '@/assets/constants/characterActions';

// will listen to changes to actions and update position, animation etc and pass to characterAnimation
// changes can be intiated by user's keyboard (playableCharacter component) or programatically

export default {
  name: 'MoveableCharacter',
  components: {CharacterAnimation},
  props: {
    character: {
      type: String,
      default: characters.vue.name
    },
    action: {
      type: String
    },
    modifications: {
      type: Object
    }
  },
  data() {
    return {
      animation: characterActions.idle,
      currentModifications: {},
      position: {},
      transition: undefined,
      isJumping: false,
      positionBeforeAnimation: {},
    }
  },
  methods: {
    calculateInitialPosition() {
      this.position = {
        left: this.currentModifications?.mode === constants.characterModes.enemy? 'calc(100% - 300px)' : '0px'
      }
    },
    jump() {
      this.$refs.characterAnimation.updateAnimation(characterActions.jump);
      this.isJumping = true;
      setTimeout(() => {
        this.isJumping = false;
      }, 400)
    },
    sliding() {
      if (!this.transition) {
        this.transition = {
          transition: `left ${constants.slideDuration} linear`
        }
      }
      this.$refs.characterAnimation.updateAnimation(characterActions.sliding);
      this.positionBeforeAnimation = this.getCurrentPosition();
      this.position = {
        top: this.positionBeforeAnimation.top,
        left: this.positionBeforeAnimation.left + constants.slideSpeed + 'px'
      };
    },
    attack() {
      this.$refs.characterAnimation.updateAnimation(characterActions.attack);
    },
    shoot() {
      this.$refs.characterAnimation.updateAnimation(characterActions.shoot);
    },
    roll() {
      this.$refs.characterAnimation.updateAnimation(characterActions.roll);
    },
    moveForward() {
      if (!this.transition) {
        this.transition = {
          transition: `left ${constants.runDuration} linear`
        }
      }
      this.$refs.characterAnimation.updateAnimation(characterActions.run);
      this.positionBeforeAnimation = this.getCurrentPosition();
      this.position = {
        top: this.positionBeforeAnimation.top,
        left: this.positionBeforeAnimation.left + constants.runSpeed + 'px'
      };
    },
    moveBackward() {
      this.$refs.characterAnimation.updateAnimation(characterActions.run);
    },
    getCurrentPosition() {
      return {
        top: this.$refs.characterAnimation.$el.offsetTop,
        left: this.$refs.characterAnimation.$el.offsetLeft
      }
    }
  },
  mounted() {
    this.currentModifications = this.modifications;
    this.calculateInitialPosition();
  }
}
</script>
<style lang="scss">
  @keyframes jump {
    0% {bottom: $floor-position;}
    50% {bottom: $jump-height}
    100% {bottom: $floor-position;}
  }

  .jump-animation {
    animation: jump $jump-duration linear
  }

  .character {
    position: absolute;
    left: 0; 
    right: 0; 
    bottom: $floor-position;
  }
</style>