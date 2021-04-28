<template>
  <moveable-character
    ref="moveableCharacter"
    :character="character"
    :modifications="modifications"
    @animationStarted="setPlayersAnimation($event)"
  ></moveable-character>
</template>
<script>
import MoveableCharacter from '@/components/MoveableCharacter';
import controlKeys from '@/assets/constants/controlKeys';
import { mapMutations, mapGetters } from 'vuex';
import EventBus from '@/utils/eventBus';
import characterActions from '@/assets/constants/characterActions';
import constants from '@/assets/constants/common';

export default {
  name: 'Player',
  components: { MoveableCharacter },
  props: {
    character: {
      type: String,
      required: true
    },
    modifications: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['player', 'game'])
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
  },
  data() {
    return {
      characterRef: undefined,
      paused: false
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
      'setQuitInitiated'
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
    doCommand(e) {
      let cmd = e.keyCode;
      if (this.game.paused) {
        if (cmd === controlKeys.pause || cmd === controlKeys.esc)
          this.togglePause();
      } else if (
        !this.game.over &&
        this.player.currentAnimation !== characterActions.dizzy
      ) {
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
        } else {
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
          }
        }
      }
    },
    terminateCommand(e) {
      let cmd = e.keyCode;
      // if key up came from a key that controls running
      if (cmd === controlKeys.left || cmd === controlKeys.right) {
        // and no other animation has been pressed simultanously
        if (this.player.currentAnimation === characterActions.run) {
          this.characterRef.stopAction();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>