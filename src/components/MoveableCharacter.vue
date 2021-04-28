<template>
  <character-animation
    ref="characterAnimation"
    class="movable-character"
    :class="{ 'jump-animation': isJumping }"
    :style="[position, transition]"
    :character="character"
    :modifications="currentModifications"
    @animationComplete="animationComplete($event)"
  >
  </character-animation>
</template>
<script>
import CharacterAnimation from '@/components/CharacterAnimation';
import characters from '@/assets/constants/characters';
import constants from '@/assets/constants/common';
import transitions from '@/assets/constants/transitions';
import characterActions from '@/assets/constants/characterActions';

export default {
  name: 'MoveableCharacter',
  components: { CharacterAnimation },
  props: {
    character: {
      type: String,
      default: characters.vue.name
    },
    modifications: {
      type: Object
    }
  },
  data() {
    return {
      lastTriggeredAnimation: {},
      animationCompleted: true,
      currentModifications: {},
      position: {},
      transition: undefined,
      isJumping: false,
      positionBeforeAnimation: {},
      characterAnimation: undefined
    };
  },
  computed: {
    isFacingToTheRight: function() {
      return (
        this.currentModifications?.mode === constants.characterModes.player
      );
    },
    isFacingToTheLeft: function() {
      return this.currentModifications?.mode === constants.characterModes.enemy;
    },
    slideSpeed: function() {
      let slideSpeed = 0;
      if (this.isFacingToTheLeft) {
        // if character is moving to the left
        slideSpeed =
          // don't let character move out of screen to the left
          -(this.positionBeforeAnimation.left - constants.slideSpeed >= 0
            ? constants.slideSpeed
            : this.positionBeforeAnimation.left +
              constants.playAreaBorderLimitOffset);
      } else {
        // if character is moving to the right
        slideSpeed =
          // don't let character move out of screen to the right
          this.positionBeforeAnimation.right - constants.slideSpeed >= 0
            ? constants.slideSpeed
            : this.positionBeforeAnimation.right +
              constants.playAreaBorderLimitOffset;
      }
      return slideSpeed;
    },
    rollSpeed: function() {
      let rollSpeed = 0;
      if (this.isFacingToTheLeft) {
        // if character is moving to the left
        rollSpeed =
          // don't let character move out of screen to the left
          -(this.positionBeforeAnimation.left - constants.rollSpeed >= 0
            ? constants.rollSpeed
            : this.positionBeforeAnimation.left +
              constants.playAreaBorderLimitOffset);
      } else {
        // if character is moving to the right
        rollSpeed =
          // don't let character move out of screen to the right
          this.positionBeforeAnimation.right - constants.rollSpeed >= 0
            ? constants.rollSpeed
            : this.positionBeforeAnimation.right +
              constants.playAreaBorderLimitOffset;
      }
      return rollSpeed;
    },
    runSpeed: function() {
      let runSpeed = 0;
      if (this.isFacingToTheLeft) {
        // if character is moving to the left
        runSpeed =
          // don't let character move out of screen to the left
          -(this.positionBeforeAnimation.left - constants.runSpeed >= 0
            ? constants.runSpeed
            : this.positionBeforeAnimation.left +
              constants.playAreaBorderLimitOffset);
      } else {
        // if character is moving to the right
        runSpeed =
          // don't let character move out of screen to the right
          this.positionBeforeAnimation.right - constants.runSpeed >= 0
            ? constants.runSpeed
            : this.positionBeforeAnimation.right +
              constants.playAreaBorderLimitOffset;
      }
      return runSpeed;
    }
  },
  created() {
    this.currentModifications = this.modifications;
    this.calculateInitialPosition();
  },
  mounted() {
    this.characterAnimation = this.$refs.characterAnimation;
    this.positionBeforeAnimation = this.getCurrentPosition();
  },
  methods: {
    jump() {
      const action = characterActions.jump;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
      // apply jumping class to play animation
      this.isJumping = true;
      // remove class after animation finishes
      setTimeout(() => {
        this.isJumping = false;
      }, constants.jumpDuration);
    },
    slide() {
      const action = characterActions.slide;
      this.initiateAction(action);
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.slide;
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
      // move character to appropriate position
      this.moveToNewPosition(action.name);
    },
    attack() {
      const action = characterActions.attack;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
    },
    shoot() {
      const action = characterActions.shoot;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
    },
    roll() {
      const action = characterActions.roll;
      this.initiateAction(action);
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.roll;
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
      // move character to appropriate position
      this.moveToNewPosition(action.name);
    },
    die() {
      const action = characterActions.die;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
    },
    dizzy() {
      const action = characterActions.dizzy;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
      setTimeout(() => {
        // if character isn't already dead, return to idle animation
        if (this.lastTriggeredAnimation !== characterActions.die) {
          const action = characterActions.idle;
          this.initiateAction(action);
          this.characterAnimation.updateAnimation(action);
        }
      }, constants.dizzinessDuration);
    },
    moveRight() {
      if (this.isFacingToTheLeft) {
        // if the character is facing the opposite direction
        if (
          !this.animationCompleted &&
          this.lastTriggeredAnimation !== characterActions.idle
        ) {
          // and the animation has not finished yet, stop the action but leave the character facing the same direction
          this.stopAction();
        } else {
          // if the animation has finished, only turn the character around without moving it
          this.turnToRight();
        }
        return;
      }
      // if the character is already facing the correct direction move it
      const action = characterActions.run;
      this.initiateAction(action);
      // make sure character is facing to the right
      this.turnToRight();
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.run;
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
      // move character to appropriate position
      this.moveToNewPosition(action.name);
    },
    moveLeft() {
      if (this.isFacingToTheRight) {
        // if the character is facing the opposite direction
        if (
          !this.animationCompleted &&
          this.lastTriggeredAnimation !== characterActions.idle
        ) {
          // and the animation has not finished yet, stop the action but leave the character facing the same direction
          this.stopAction();
        } else {
          // if the animation has finished, only turn the character around without moving it
          this.turnToLeft();
        }
        return;
      }
      // if the character is already facing the correct direction move it
      const action = characterActions.run;
      this.initiateAction(action);
      // make sure character is facing to the left
      this.turnToLeft();
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.run;
      // set appropriate spritesheet
      this.characterAnimation.updateAnimation(action);
      // move character to appropriate position
      this.moveToNewPosition(action.name);
    },
    // player movement requires a different logic for movement than the oponent
    // because the player moves as long as the key is pressed down
    movePlayerRight() {
      if (this.animationCompleted) {
        // if the character is already facing the correct direction move it
        const action = characterActions.run;
        this.initiateAction(action);
        // make sure character is facing to the right
        this.turnToRight();
        // apply appropriate transition to make character move at desired speed
        this.transition = transitions.run;
        // set appropriate spritesheet
        this.characterAnimation.updateAnimation(action);
        // move character to appropriate position
        this.moveToNewPosition(action.name);
      }
    },
    // player movement requires a different logic for movement than the oponent
    // because the player moves as long as the key is pressed down
    movePlayerLeft() {
      if (this.animationCompleted) {
        // if the character is already facing the correct direction move it
        const action = characterActions.run;
        this.initiateAction(action);
        // make sure character is facing to the left
        this.turnToLeft();
        // apply appropriate transition to make character move at desired speed
        this.transition = transitions.run;
        // set appropriate spritesheet
        this.characterAnimation.updateAnimation(action);
        // move character to appropriate position
        this.moveToNewPosition(action.name);
      }
    },

    initiateAction(action) {
      this.lastTriggeredAnimation = action;
      this.animationCompleted = false;
      this.$emit('animationStarted', action);
    },
    stopAction() {
      // use idle spritesheet
      this.characterAnimation.updateAnimation(characterActions.idle);
      this.animationCompleted = true;
      this.lastTriggeredAnimation = characterActions.idle;
      // stop any remaining movement
      this.positionBeforeAnimation = this.getCurrentPosition();
      this.position = {
        left: this.positionBeforeAnimation.left + 'px'
      };
    },
    turnToLeft() {
      this.currentModifications = {
        mode: constants.characterModes.enemy
      };
      this.characterAnimation.updateModification(this.currentModifications);
    },
    turnToRight() {
      this.currentModifications = {
        mode: constants.characterModes.player
      };
      this.characterAnimation.updateModification(this.currentModifications);
    },
    moveToNewPosition(action) {
      this.positionBeforeAnimation = this.getCurrentPosition();
      // use appropriate speed according to which action has been triggered
      let speed = 0;
      switch (action) {
        case characterActions.slide.name:
          speed = this.slideSpeed;
          break;
        case characterActions.roll.name:
          speed = this.rollSpeed;
          break;
        case characterActions.run.name:
          speed = this.runSpeed;
          break;
      }

      this.position = {
        left: this.positionBeforeAnimation.left + speed + 'px'
      };
    },
    getCurrentPosition() {
      return {
        top: this.characterAnimation.$el.offsetTop,
        left: this.characterAnimation.$el.offsetLeft,
        right:
          window.innerWidth -
          (this.characterAnimation.$el.offsetLeft +
            this.characterAnimation.$el.offsetWidth)
      };
    },
    calculateInitialPosition() {
      this.position = {
        left: this.isFacingToTheLeft ? 'calc(100% - 300px)' : '0px'
      };
    },
    animationComplete(runningAnimation) {
      // last animation has been completed
      this.animationCompleted = true;
      // emit newly started animation so it can be saved in the store
      this.$emit('animationStarted', runningAnimation);
    },
    facingDirection() {
      return this.currentModifications?.mode === constants.characterModes.player
        ? constants.side.right
        : constants.side.left;
    }
  }
};
</script>
<style lang="scss">
@keyframes jump {
  0% {
    bottom: $floor-position;
  }
  50% {
    bottom: $jump-height;
  }
  100% {
    bottom: $floor-position;
  }
}

.jump-animation {
  animation: jump $jump-duration linear;
}

.movable-character {
  position: absolute;
  left: 0;
  right: 0;
  bottom: $floor-position;
}
</style>
