<template>
  <div class="game-over-container">
    <div class="game-over-note">
      <div class="game-over-note" v-if="player.health > 0">
        {{ player.character.name }} won!
      </div>
      <div v-else>
        <div>Game Over!</div>
        <div class="game-over-note">{{ enemy.character.name }} won!</div>
      </div>
    </div>
    <div
      ref="playAgainBtn"
      tabindex="0"
      @keydown="handlePlayKeyPress($event)"
      @click="playAgain()"
      class="game-over-item"
    >
      - Play again -
    </div>
    <div
      ref="exitBtn"
      tabindex="0"
      @click="exit()"
      @keydown="handleExitKeyPress($event)"
      class="game-over-item"
    >
      - Exit -
    </div>
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
  mounted() {
    this.$refs.playAgainBtn.focus();
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
    },
    handlePlayKeyPress(e) {
      // down arrow
      if (e.keyCode === 40) {
        this.$refs.exitBtn.focus();
      }
      // enter
      if (e.keyCode === 13) {
        this.playAgain();
      }
    },
    handleExitKeyPress(e) {
      // up arrow
      if (e.keyCode === 38) {
        this.$refs.playAgainBtn.focus();
      }
      // enter
      if (e.keyCode === 13) {
        this.exit();
      }
    },
  },
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
    &:hover, &:focus {
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
</style>
