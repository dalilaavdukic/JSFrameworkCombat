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
      required: true,
    },
    modifications: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(['player', 'game']),
  },
  mounted() {
    this.characterRef = this.$refs.moveableCharacter;
    // wait for game countdown to finish before listening for player actions
    setTimeout(() => {
      window.addEventListener('keydown', this.doCommand);
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
      paused: false,
    };
  },
  destroyed() {
    window.removeEventListener('keydown', this.doCommand);
  },
  methods: {
    ...mapMutations([
      'setPlayersFacingDirection',
      'setPlayersAnimation',
      'setPaused',
    ]),
    pauseGame() {
      this.paused = !this.paused;
      this.setPaused(this.paused);
    },
    doCommand(e) {
      let cmd = e.keyCode;
      if (this.paused) {
        if (cmd === controlKeys.pause) this.pauseGame();
      } else if (
        !e.repeat &&
        !this.game.over &&
        this.player.currentAnimation !== characterActions.dizzy
      ) {
        switch (cmd) {
          case controlKeys.right:
            this.characterRef.moveRight();
            this.setPlayersFacingDirection(this.characterRef.facingDirection());
            break;
          case controlKeys.left:
            this.characterRef.moveLeft();
            this.setPlayersFacingDirection(this.characterRef.facingDirection());
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
            this.pauseGame();
            break;
          case controlKeys.esc:
            console.log('Quit game?');
            break;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>