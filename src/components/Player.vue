<template>
  <moveable-character
    ref="moveableCharacter"
    :character="character"
    @animationStarted="setPlayersAnimation($event)"
    :characterType="characterType"
  ></moveable-character>
</template>
<script>
import MoveableCharacter from '@/components/MoveableCharacter';
import controlKeys from '@/assets/constants/controlKeys';
import { mapMutations, mapGetters } from 'vuex';
import EventBus from '@/utils/eventBus';
import characterActions from '@/assets/constants/characterActions';
import constants from '@/assets/constants/common';

const holdableKeys = [
  controlKeys.right,
  controlKeys.left,
  controlKeys.slide,
  controlKeys.roll,
];

export default {
  name: 'Player',
  components: { MoveableCharacter },
  props: {
    character: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['player', 'game', 'distance']),
  },
  mounted() {
    this.characterRef = this.$refs.moveableCharacter;
    // wait for game countdown to finish before listening for player actions
    setTimeout(() => {
      window.addEventListener('keydown', this.doCommand);
      window.addEventListener('keyup', this.terminateCommand);
    }, constants.countdownToGameSeconds * 1000);
    EventBus.$on('player-died', () => {
      this.characterRef.die();
    });
    EventBus.$on('player-dizzy', () => {
      this.characterRef.dizzy();
    });
    EventBus.$on('player-damaged', () => {
      const attackSide =
        this.distance > 0 ? constants.side.right : constants.side.left;
      this.characterRef.takeDamage(attackSide);
    });
  },
  data() {
    return {
      characterRef: undefined,
      paused: false,
      characterType: constants.characterModes.player,
      pressedKeys: [],
    };
  },
  destroyed() {
    window.removeEventListener('keydown', this.doCommand);
    window.removeEventListener('keyup', this.terminateCommand);
  },
  methods: {
    ...mapMutations([
      'setPlayersFacingDirection',
      'setPlayersAnimation',
      'setPaused',
      'setQuitInitiated',
      'addPressedKey',
      'removeReleasedKey',
    ]),
    togglePause() {
      this.paused = !this.game.paused;
      this.setPaused(this.paused);
      if (!this.paused) {
        this.setQuitInitiated(false);
      }
    },
    quitGame() {
      this.togglePause();
      this.setQuitInitiated(true);
    },
    isHoldableKey(key) {
      return holdableKeys.indexOf(key) !== -1;
    },
    doCommand(e) {
      let cmd = e.keyCode;

      // check if user pressed a key they can hold down to continuesly perform an action (left, right, roll, slide)
      // and if pressed key is not added to list of pressed keys yet
      if (
        this.isHoldableKey(cmd) &&
        this.game.pressedKeys.indexOf(cmd) === -1
      ) {
        // add it to list of pressed down keys
        this.addPressedKey(cmd);
      }

      if (this.game.paused) {
        // if the game is paused, ignore all commands except for resuming game
        if (cmd === controlKeys.pause || cmd === controlKeys.esc)
          this.togglePause();
      } else if (
        // if the game is not over and the player is not dizzy or taking damage
        !this.game.over &&
        this.player.currentAnimation !== characterActions.dizzy &&
        this.player.currentAnimation !== characterActions.takeDamage
      ) {
        // process the user's key press
        if (!e.repeat) {
          switch (cmd) {
            case controlKeys.right:
              this.characterRef.movePlayerRight();
              this.setPlayersFacingDirection(
                this.characterRef.facingDirection()
              );
              break;
            case controlKeys.left:
              this.characterRef.movePlayerLeft();
              this.setPlayersFacingDirection(
                this.characterRef.facingDirection()
              );
              break;
            case controlKeys.jump:
              this.characterRef.jump();
              break;
            case controlKeys.slide:
              this.characterRef.slide();
              break;
            case controlKeys.attack:
              this.characterRef.attack();
              this.$emit('attack');
              break;
            case controlKeys.shoot:
              if (this.player.canUseSpecialAttack) {
                this.characterRef.shoot();
                this.$emit('shoot');
              }
              break;
            case controlKeys.roll:
              this.characterRef.roll();
              break;
            case controlKeys.pause:
              this.togglePause();
              break;
            case controlKeys.esc:
              this.quitGame();
              break;
          }
        }
      }
    },
    terminateCommand(e) {
      let cmd = e.keyCode;

      // if the user released the last pressed key, remove it from list of pressed keys
      if (this.game.pressedKeys.indexOf(cmd) !== -1) {
        this.removeReleasedKey(cmd);
      }

      // if the game is not over and the player is not dizzy or taking damage
      if (
        !this.game.over &&
        this.player.currentAnimation !== characterActions.dizzy &&
        this.player.currentAnimation !== characterActions.takeDamage
      ) {
        if (this.game.pressedKeys.length === 0) {
          // if all keys have been released stop action and play idle animation
          this.characterRef.stopAction();
        } else {
          // if there are still pressed down keys, play the action of the most recently pressed
          this.characterRef.doContinuedAction(
            this.game.pressedKeys[this.game.pressedKeys.length - 1]
          );
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>