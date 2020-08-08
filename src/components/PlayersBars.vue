<template>
  <div class="bars">
    <div>
      <bar :value="player.health" :side="side"></bar>
      <bar :value="player.specialAttack" :character="player.character.name" :side="side"></bar>
    </div>
  </div>
</template>

<script>
import Bar from './Bar';

export default {
  name: 'PlayersBars',
  components: { Bar },
  props: {
    player: {
      type: Object,
      required: true
    },
    side: {
      type: String,
      required: false,
      default: 'left'
    }
  }
}
</script>

<style lang="scss" scoped>
.bars {
  height: 60px;
  width: 25%;
  &:last-child {
    text-align: end;
  }
}
</style>
