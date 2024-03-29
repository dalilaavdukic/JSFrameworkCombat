<template>
  <character-animation
    ref="characterAnimation"
    class="movable-character"
    :class="{ 'jump-animation': isJumping }"
    :style="[position, transition]"
    :character="character"
    :animation="currentAnimation"
    :modification="currentModification"
    :characterType="characterType"
    @animationComplete="animationComplete($event)"
    @continueAction="doContinuedAction($event)"
  >
  </character-animation>
</template>
<script>
import CharacterAnimation from '@/components/CharacterAnimation';
import characters from '@/assets/constants/characters';
import constants from '@/assets/constants/common';
import transitions from '@/assets/constants/transitions';
import characterActions from '@/assets/constants/characterActions';
import { mapMutations } from 'vuex';
import controlKeys from '@/assets/constants/controlKeys';

export default {
  name: 'MoveableCharacter',
  components: { CharacterAnimation },
  props: {
    character: {
      type: String,
      default: characters.vue.name,
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
      lastTriggeredAnimation: {},
      currentModification: '',
      currentAnimation: undefined,
      position: {},
      transition: undefined,
      isJumping: false,
      positionBeforeAnimation: {},
      characterAnimation: undefined,
      attackSide: undefined,
    };
  },
  computed: {
    isFacingToTheRight: function () {
      return this.currentModification === constants.characterModes.player;
    },
    isFacingToTheLeft: function () {
      return this.currentModification === constants.characterModes.enemy;
    },
    slideSpeed: function () {
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
    rollSpeed: function () {
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
    runSpeed: function () {
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
    },
    damageSpeed: function () {
      let damageSpeed = 0;
      if (this.attackSide === constants.side.left) {
        damageSpeed =
          // don't let character move out of screen to the right
          this.positionBeforeAnimation.right - constants.damageSpeed >= 0
            ? constants.damageSpeed
            : this.positionBeforeAnimation.right +
              constants.playAreaBorderLimitOffset;
      } else {
        damageSpeed =
          // don't let character move out of screen to the left
          -(this.positionBeforeAnimation.left - constants.damageSpeed >= 0
            ? constants.damageSpeed
            : this.positionBeforeAnimation.left +
              constants.playAreaBorderLimitOffset);
      }
      return damageSpeed;
    },
  },
  created() {
    this.currentModification = this.modification;
    this.calculateInitialPosition();
  },
  mounted() {
    this.characterAnimation = this.$refs.characterAnimation;
    this.positionBeforeAnimation = this.getCurrentPosition();
  },
  methods: {
    ...mapMutations(['setPlayersFacingDirection']),
    takeDamage(attackSide) {
      if (
        this.lastTriggeredAnimation !== characterActions.dizzy &&
        this.lastTriggeredAnimation !== characterActions.die
      ) {
        setTimeout(() => {
          this.attackSide = attackSide;
          const action = characterActions.takeDamage;
          this.initiateAction(action);
          // apply appropriate transition to make character move at desired speed
          this.transition = transitions.takeDamage;
          // set appropriate spritesheet
          this.currentAnimation = { ...action };
          // move character to appropriate position
          this.moveToNewPosition(action.name);
        }, 350);
      }
    },
    jump() {
      const action = characterActions.jump;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.currentAnimation = { ...action };
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
      this.currentAnimation = { ...action };
      // move character to appropriate position
      this.moveToNewPosition(action.name);
    },
    attack() {
      const action = characterActions.attack;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.currentAnimation = { ...action };
    },
    shoot() {
      const action = characterActions.shoot;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.currentAnimation = { ...action };
    },
    roll() {
      const action = characterActions.roll;
      this.initiateAction(action);
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.roll;
      // set appropriate spritesheet
      this.currentAnimation = { ...action };
      // move character to appropriate position
      this.moveToNewPosition(action.name);
    },
    die() {
      const action = characterActions.die;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.currentAnimation = action;
    },
    dizzy() {
      const action = characterActions.dizzy;
      this.initiateAction(action);
      // set appropriate spritesheet
      this.currentAnimation = { ...action };
      setTimeout(() => {
        // if character isn't already dead, return to idle animation
        if (this.lastTriggeredAnimation !== characterActions.die) {
          const action = characterActions.idle;
          this.initiateAction(action);
          this.currentAnimation = { ...action };
        }
      }, constants.dizzinessDuration);
    },
    moveEnemyRight() {
      if (this.isFacingToTheLeft) {
        // if the character is facing the opposite direction
        this.turnToRight();
        return;
      }
      // if the character is already facing the correct direction move it
      this.moveRight();
    },
    moveEnemyLeft() {
      if (this.isFacingToTheRight) {
        // if the character is facing the opposite direction
        this.turnToLeft();
        return;
      }
      // if the character is already facing the correct direction move it
      this.moveLeft();
    },
    moveRight() {
      const action = characterActions.run;
      this.initiateAction(action);
      // make sure character is facing to the right
      this.turnToRight();
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.run;
      // set appropriate spritesheet
      this.currentAnimation = { ...action };
      // move character to appropriate position
      this.moveToNewPosition(action.name);
    },
    moveLeft() {
      const action = characterActions.run;
      this.initiateAction(action);
      // make sure character is facing to the left
      this.turnToLeft();
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.run;
      // set appropriate spritesheet
      this.currentAnimation = { ...action };
      // move character to appropriate position
      this.moveToNewPosition(action.name);
    },

    doContinuedAction(action) {
      switch (action) {
        case controlKeys.right:
          this.moveRight();
          this.setPlayersFacingDirection(this.facingDirection());
          break;
        case controlKeys.left:
          this.moveLeft();
          this.setPlayersFacingDirection(this.facingDirection());
          break;
        case controlKeys.roll:
          this.roll();
          break;
        case controlKeys.slide:
          this.slide();
          break;
      }
    },
    initiateAction(action) {
      this.lastTriggeredAnimation = action;
      this.$emit('animationStarted', action);
    },
    stopAction() {
      // use idle spritesheet
      this.currentAnimation = characterActions.idle;
      this.lastTriggeredAnimation = characterActions.idle;
      // stop any remaining movement
      this.positionBeforeAnimation = this.getCurrentPosition();
      this.position = {
        left: this.positionBeforeAnimation.left + 'px',
      };
    },
    turnToLeft() {
      this.currentModification = constants.characterModes.enemy;
    },
    turnToRight() {
      this.currentModification = constants.characterModes.player;
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
        case characterActions.takeDamage.name:
          speed = this.damageSpeed;
          break;
      }

      this.position = {
        left: this.positionBeforeAnimation.left + speed + 'px',
      };
    },
    getCurrentPosition() {
      return {
        top: this.characterAnimation.$el.offsetTop,
        left: this.characterAnimation.$el.offsetLeft,
        right:
          window.innerWidth -
          (this.characterAnimation.$el.offsetLeft +
            this.characterAnimation.$el.offsetWidth),
      };
    },
    calculateInitialPosition() {
      this.position = {
        left: this.isFacingToTheLeft ? 'calc(100% - 300px)' : '0px',
      };
    },
    animationComplete(runningAnimation) {
      // emit newly started animation so it can be saved in the store
      this.$emit('animationStarted', runningAnimation);
    },
    facingDirection() {
      return this.currentModification === constants.characterModes.player
        ? constants.side.right
        : constants.side.left;
    },
  },
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
