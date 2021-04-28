<template>
  <div @click="goToHome()" class="game-header">
    <game-title size="small"></game-title>
    <h1><slot></slot></h1>
  </div>
</template>

<script>
import GameTitle from '@/components/GameTitle';

export default {
  name: 'GameHeader',
  components: { GameTitle },
  methods: {
    goToHome() {
      this.$router.push('home');
    }
  }
};
</script>

<style lang="scss" scoped>
.game-header {
  align-self: flex-start;
  display: flex;
  align-items: center;
  padding-top: 25px;
  cursor: pointer;
  user-select: none;
}
</style>
