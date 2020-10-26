<template>
  <div class="game-over-container">
    <div>Game Over</div>
    <router-link
      v-for="(item, index) in items"
      :key="index"
      :to="item.link"
    >
      <div @click="resetGame()" class="game-over-item">- {{ item.label }} -</div>
    </router-link>
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
    ...mapMutations(['resetGame'])
  }
};
</script>

<style lang="scss" scoped>
.game-over-container {
  text-align: center;
  a {
    text-decoration: none;
    .game-over-item {
      color: $font-color;
      font-size: 2rem;
      padding: 1rem;
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
