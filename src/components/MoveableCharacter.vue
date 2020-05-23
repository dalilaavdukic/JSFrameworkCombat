<template>
  <character-animation
    ref="characterAnimation"
    class="character"
    :class = "{'jump-animation': isJumping}"
    :style="[position, transition]" 
    :character="character" 
    :animation="animation"
    :modifications="currentModifications">
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
      this.transition = {
        transition: `left ${constants.slideDuration} linear`
      }
      this.$refs.characterAnimation.updateAnimation(characterActions.sliding);
      this.positionBeforeAnimation = this.getCurrentPosition();
      const slideSpeed = this.getSlideSpeed(this.positionBeforeAnimation);
      this.position = {
        top: this.positionBeforeAnimation.top,
        left: this.positionBeforeAnimation.left + slideSpeed + 'px'
      };
    },
    attack() {
      this.$refs.characterAnimation.updateAnimation(characterActions.attack);
    },
    shoot() {
      this.$refs.characterAnimation.updateAnimation(characterActions.shoot);
    },
    roll() {
      this.transition = {
        transition: `left ${constants.rollDuration} linear`
      }
      this.$refs.characterAnimation.updateAnimation(characterActions.roll);
      this.positionBeforeAnimation = this.getCurrentPosition();
      const rollSpeed = this.getRollSpeed(this.positionBeforeAnimation);
      this.position = {
        top: this.positionBeforeAnimation.top,
        left: this.positionBeforeAnimation.left + rollSpeed + 'px'
      };
    },
    moveRight() {
      this.currentModifications = {
        mode: constants.characterModes.player
      };
      this.transition = {
        transition: `left ${constants.runDuration} linear`
      }
      this.$refs.characterAnimation.updateModification(this.currentModifications);
      this.$refs.characterAnimation.updateAnimation(characterActions.run);
      this.positionBeforeAnimation = this.getCurrentPosition();
      const runSpeed = (this.positionBeforeAnimation.right - constants.runSpeed) >= 0? constants.runSpeed : this.positionBeforeAnimation.right + constants.playAreaBorderLimitOffset;
      this.position = {
        top: this.positionBeforeAnimation.top,
        left: this.positionBeforeAnimation.left + runSpeed + 'px'
      };
    },
    moveLeft() {
      this.currentModifications = {
        mode: constants.characterModes.enemy
      };
      this.transition = {
        transition: `left ${constants.runDuration} linear`
      };
      this.$refs.characterAnimation.updateModification(this.currentModifications);
      this.$refs.characterAnimation.updateAnimation(characterActions.run);
      this.positionBeforeAnimation = this.getCurrentPosition();
      const runSpeed = (this.positionBeforeAnimation.left - constants.runSpeed) >= 0? constants.runSpeed : this.positionBeforeAnimation.left + constants.playAreaBorderLimitOffset;
      this.position = {
        top: this.positionBeforeAnimation.top,
        left: this.positionBeforeAnimation.left - runSpeed + 'px'
      };
    },
    getCurrentPosition() {
      return {
        top: this.$refs.characterAnimation.$el.offsetTop,
        left: this.$refs.characterAnimation.$el.offsetLeft,
        right: window.innerWidth - (this.$refs.characterAnimation.$el.offsetLeft + this.$refs.characterAnimation.$el.offsetWidth)
      }
    },
    getSlideSpeed(position) {
      let slideSpeed = 0;
      if (this.currentModifications?.mode === constants.characterModes.enemy) {
        // if character is moving to the left
        slideSpeed = - ((position.left - constants.slideSpeed) >= 0? constants.slideSpeed : position.left + constants.playAreaBorderLimitOffset);
      } else { 
        // if character is moving to the right
        slideSpeed = (position.right - constants.slideSpeed) >= 0? constants.slideSpeed : position.right + constants.playAreaBorderLimitOffset;
      }
      return slideSpeed;
    },
    getRollSpeed(position) {
      let rollSpeed = 0;
      if (this.currentModifications?.mode === constants.characterModes.enemy) {
        // if character is moving to the left
        rollSpeed = - ((position.left - constants.rollSpeed) >= 0? constants.rollSpeed : position.left + constants.playAreaBorderLimitOffset);
      } else { 
        // if character is moving to the right
        rollSpeed = (position.right - constants.rollSpeed) >= 0? constants.rollSpeed : position.right + constants.playAreaBorderLimitOffset;
      }
      return rollSpeed;
    }
  },
  created() {
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