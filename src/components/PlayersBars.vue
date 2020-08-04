<template>
  <div class="bars">
    <div>Name: {{player.name}}</div>
    <div>Health: {{player.health}}</div>
    <div>Special Attack: {{player.specialAttack}}</div>
  </div>
</template>

<script>
export default {
  name: 'PlayersBars',
  props: {
    player: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bars {
  height: 60px;
  &:last-child {
    text-align: end;
  }
}
</style>
