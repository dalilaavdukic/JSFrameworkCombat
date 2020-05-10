<template>
  <character-animation
    ref="characterAnimation"
    class="character"
    @animationComplete="resetPosition()"
    :style="[position]" 
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
      positionBeforeAnimation: {},
      characterJumped: false,
      lastJumpTime: new Date()
    }
  },
  methods: {
    calculateInitialPosition() {
      this.position = {
        left: this.currentModifications?.mode === constants.characterModes.enemy? 'calc(100% - 300px)' : '0px'
      }
    },
    jump() {
      // recalculate position to return to only of more than 250 miliseconds have passed since last jump
      // and if the position of the character has not been reset already
      if (new Date() - this.lastJumpTime > 250 && !this.characterJumped) {
        this.positionBeforeAnimation = this.getCurrentPosition();
      }
      this.characterJumped = true;
      this.$refs.characterAnimation.updateAnimation(characterActions.jump);
      this.position = {
        top: this.positionBeforeAnimation.top - constants.jumpHeight + 'px',
        left: this.positionBeforeAnimation.left + 'px'
      };
      this.lastJumpTime = new Date();
    },
    sliding() {
      this.$refs.characterAnimation.updateAnimation(characterActions.sliding);
    },
    attack() {
      this.$refs.characterAnimation.updateAnimation(characterActions.attack);
    },
    shoot() {
      this.resetPosition();
      this.$refs.characterAnimation.updateAnimation(characterActions.shoot);
    },
    roll() {
      this.$refs.characterAnimation.updateAnimation(characterActions.roll);
    },
    moveForward() {
      this.$refs.characterAnimation.updateAnimation(characterActions.run);
      this.positionBeforeAnimation = this.getCurrentPosition();
      this.position = {
        top: this.positionBeforeAnimation.top,
        left: this.positionBeforeAnimation.left + 200 + 'px'
      };
    },
    moveBackward() {
      this.$refs.characterAnimation.updateAnimation(characterActions.run);
    },
    resetPosition() {
      if (this.characterJumped) {
        this.position = {
          top: this.positionBeforeAnimation.top + 'px',
          left: this.positionBeforeAnimation.left + 'px'
        }
      }
      this.characterJumped = false;
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
<style lang="scss" scoped>
  .character {
    position: absolute;
    left: 0; 
    right: 0; 
    bottom: -23px;
  }
</style>