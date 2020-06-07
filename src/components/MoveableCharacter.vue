<template>
  <character-animation
    ref="characterAnimation"
    class="movable-character"
    :class="{ 'jump-animation': isJumping }"
    :style="[position, transition]"
    :character="character"
    :animation="animation"
    :modifications="currentModifications"
  >
  </character-animation>
</template>
<script>
import CharacterAnimation from "@/components/CharacterAnimation";
import characters from "@/assets/constants/characters";
import constants from "@/assets/constants/common";
import transitions from "@/assets/constants/transitions";
import characterActions from "@/assets/constants/characterActions";

// will listen to changes to actions and update position, animation etc and pass to characterAnimation
// changes can be intiated by user's keyboard (playableCharacter component) or programatically

export default {
  name: "MoveableCharacter",
  components: { CharacterAnimation },
  props: {
    character: {
      type: String,
      default: characters.vue.name,
    },
    action: {
      type: String,
    },
    modifications: {
      type: Object,
    },
  },
  data() {
    return {
      animation: characterActions.idle,
      currentModifications: {},
      position: {},
      transition: undefined,
      isJumping: false,
      positionBeforeAnimation: {},
    };
  },
  computed: {
    slideSpeed: function() {
      let slideSpeed = 0;
      if (this.currentModifications?.mode === constants.characterModes.enemy) {
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
      if (this.currentModifications?.mode === constants.characterModes.enemy) {
        // if character is moving to the left
        rollSpeed = 
          // don't let character move out of screen to the left
          -(this.positionBeforeAnimation.left - constants.rollSpeed >= 0
            ? constants.rollSpeed
            : this.positionBeforeAnimation.left + constants.playAreaBorderLimitOffset);
      } else {
        // if character is moving to the right
        rollSpeed =
          // don't let character move out of screen to the right
          this.positionBeforeAnimation.right - constants.rollSpeed >= 0
            ? constants.rollSpeed
            : this.positionBeforeAnimation.right + constants.playAreaBorderLimitOffset;
      }
      return rollSpeed;
    },
    runSpeed: function() {
      let runSpeed = 0;
      if (this.currentModifications?.mode === constants.characterModes.enemy) {
        // if character is moving to the left
        runSpeed = 
          // don't let character move out of screen to the left
          -(this.positionBeforeAnimation.left - constants.runSpeed >= 0
            ? constants.runSpeed
            : this.positionBeforeAnimation.left + constants.playAreaBorderLimitOffset);
      } else {
        // if character is moving to the right
        runSpeed =
          // don't let character move out of screen to the right
          this.positionBeforeAnimation.right - constants.runSpeed >= 0
            ? constants.runSpeed
            : this.positionBeforeAnimation.right + constants.playAreaBorderLimitOffset;
      }
      return runSpeed;
    }
  },
  created() {
    this.currentModifications = this.modifications;
    this.calculateInitialPosition();
  },
  mounted() {
    this.positionBeforeAnimation = this.getCurrentPosition();
  },
  methods: {
    jump() {
      // set appropriate spritesheet
      this.$refs.characterAnimation.updateAnimation(characterActions.jump);
      // apply jumping class to play animation
      this.isJumping = true;
      // remove class after animation finishes
      setTimeout(() => {
        this.isJumping = false;
      }, constants.jumpDuration);
    },
    sliding() {
      const action = characterActions.sliding;
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.slide;
      // set appropriate spritesheet
      this.$refs.characterAnimation.updateAnimation(action);
      // move character to appropriate position
      this.moveCharacterToNewPosition(action.name);
    },
    attack() {
      // set appropriate spritesheet
      this.$refs.characterAnimation.updateAnimation(characterActions.attack);
    },
    shoot() {
      // set appropriate spritesheet
      this.$refs.characterAnimation.updateAnimation(characterActions.shoot);
    },
    roll() {
      const action = characterActions.roll;
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.roll;
      // set appropriate spritesheet
      this.$refs.characterAnimation.updateAnimation(action);
      // move character to appropriate position
      this.moveCharacterToNewPosition(action.name);
    },
    moveRight() {
      const action = characterActions.run;
      // make sure character is facing to the right
      this.turnToRight();
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.run;
      // set appropriate spritesheet
      this.$refs.characterAnimation.updateAnimation(action);
      // move character to appropriate position
      this.moveCharacterToNewPosition(action.name);
    },
    moveLeft() {
      const action = characterActions.run;
      // make sure character is facing to the left
      this.turnToLeft();
      // apply appropriate transition to make character move at desired speed
      this.transition = transitions.run;
      // set appropriate spritesheet
      this.$refs.characterAnimation.updateAnimation(action);
      // move character to appropriate position
      this.moveCharacterToNewPosition(action.name);
    },
    turnToLeft() {
      this.currentModifications = {
        mode: constants.characterModes.enemy,
      };
      this.$refs.characterAnimation.updateModification(
        this.currentModifications
      );
    },
    turnToRight() {
      this.currentModifications = {
        mode: constants.characterModes.player,
      };
      this.$refs.characterAnimation.updateModification(
        this.currentModifications
      );
    },
    getCurrentPosition() {
      return {
        top: this.$refs.characterAnimation.$el.offsetTop,
        left: this.$refs.characterAnimation.$el.offsetLeft,
        right:
          window.innerWidth -
          (this.$refs.characterAnimation.$el.offsetLeft +
            this.$refs.characterAnimation.$el.offsetWidth),
      };
    },
    calculateInitialPosition() {
      this.position = {
        left:
          this.currentModifications?.mode === constants.characterModes.enemy
            ? "calc(100% - 300px)"
            : "0px",
      };
    },
    moveCharacterToNewPosition(action) {
      this.positionBeforeAnimation = this.getCurrentPosition();
      // use appropriate speed according to which action has been triggered
      let speed = 0;
      switch (action) {
        case characterActions.sliding.name:
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
        top: this.positionBeforeAnimation.top,
        left: this.positionBeforeAnimation.left + speed + "px",
      };
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
