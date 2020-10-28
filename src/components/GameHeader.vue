<template>
  <div class="game-header">
    <game-title size="small"></game-title>
    <h1><slot></slot></h1>
  </div>
</template>

<script>
import GameTitle from '@/components/GameTitle';

export default {
  name: 'GameHeader',
  components: { GameTitle }
};
</script>

<style lang="scss" scoped>
.game-header {
  align-self: flex-start;
  display: flex;
  align-items: center;
  padding-top: 25px;
}
</style>
