<template>
  <div class="quit-game-container">
    <div>Quit Game?</div>
    <div class="quit-game-answers">
      <div
        ref="yesBtn"
        tabindex="0"
        @keydown="handleYesKeyPress($event)"
        @click="quitGame()"
        class="quit-game-item"
      >
        - Yes -
      </div>
      <div
        ref="noBtn"
        tabindex="0"
        @keydown="handleNoKeyPress($event)"
        @click="exitQuitting()"
        class="quit-game-item"
      >
        - No -
      </div>
    </div>
  </div>
</template>

<script>
import gameOverItems from '@/assets/constants/gameOverItems';
import { mapMutations } from 'vuex';

export default {
  name: 'QuitGame',
  data() {
    return {
      items: gameOverItems,
    };
  },
  mounted() {
    this.$refs.noBtn.focus();
  },
  methods: {
    ...mapMutations(['exitGame', 'setPaused', 'setQuitInitiated']),
    exitQuitting() {
      this.setPaused(false);
      this.setQuitInitiated(false);
    },
    quitGame() {
      this.exitGame();
      this.$router.push('home');
    },
    handleYesKeyPress(e) {
      // down arrow
      if (e.keyCode === 40) {
        this.$refs.noBtn.focus();
      }
      // enter
      if (e.keyCode === 13) {
        this.quitGame();
      }
    },
    handleNoKeyPress(e) {
      // up arrow
      if (e.keyCode === 38) {
        this.$refs.yesBtn.focus();
      }
      // enter
      if (e.keyCode === 13) {
        this.exitQuitting();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.quit-game-container {
  text-align: center;
  .quit-game-answers {
    .quit-game-item {
      color: $font-color;
      font-size: 2rem;
      padding: 1rem;
      cursor: pointer;
      &:hover,
      &:focus {
        color: $js-yellow;
      }
      &:active {
        color: white;
      }
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
