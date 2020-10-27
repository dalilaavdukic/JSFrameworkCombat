<template>
  <div class="game-over-container">
    <div>Game Over</div>
    <div @click="playAgain()" class="game-over-item">- Play again -</div>
    <div @click="exit()" class="game-over-item">- Exit -</div>
  </div>
</template>

<script>
import gameOverItems from '@/assets/constants/gameOverItems';
import { mapMutations } from 'vuex';

export default {
  name: 'GameOver',
  data() {
    return {
      items: gameOverItems,
    };
  },
  methods: {
    ...mapMutations(['exitGame']),
    playAgain() {
      this.$router.push('characters');
    },
    exit() {
      this.exitGame();
      this.$router.push('home');
    }
  }
};
</script>

<style lang="scss" scoped>
.game-over-container {
  text-align: center;
  .game-over-item {
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
</style>
