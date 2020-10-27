<template>
  <div class="game-over-container">
    <div class="game-over-note">
      <div class="game-over-note" v-if="player.health > 0">{{player.character.name}} won!</div>
      <div v-else>
        <div>Game Over!</div>
        <div class="game-over-note">{{enemy.character.name}} won!</div>
      </div>
    </div>
    <div @click="playAgain()" class="game-over-item">- Play again -</div>
    <div @click="exit()" class="game-over-item">- Exit -</div>
  </div>
</template>

<script>
import gameOverItems from '@/assets/constants/gameOverItems';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'GameOver',
  data() {
    return {
      items: gameOverItems,
    };
  },
  computed: {
    ...mapGetters(['player', 'enemy']),
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
  .game-over-note {
    text-transform: capitalize;
  }
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
