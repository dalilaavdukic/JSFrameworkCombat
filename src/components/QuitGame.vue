<template>
  <div class="quit-game-container">
    <div>Quit Game?</div>
    <div class="quit-game-answers">
      <div @click="quitGame()" class="quit-game-item">- Yes -</div>
      <div @click="exitQuitting()" class="quit-game-item">- No -</div>
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
  methods: {
    ...mapMutations(['exitGame', 'setPaused', 'setQuitInitiated']),
    exitQuitting() {
      this.setPaused(false);
      this.setQuitInitiated(false);
    },
    quitGame() {
      this.exitGame();
      this.$router.push('home');
    }
  }
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
      &:hover {
        color: $js-yellow;
      }
      &:active {
        color: white;
      }
    }
  }
}
</style>
