<template>
  <div class="container">
    <div class="game-menu">
      <router-link to='/characters'>Start New Game</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameMenu',
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  .game-menu {
    a {
      text-decoration: none;
      color: $font-color;
      background: $js-grey;
      box-shadow: $box-shadow;
      font-size: 30px;
      border-radius: $border-radius;
      padding: 20px;
      &:hover {
        box-shadow: 0 0 100px 0px $js-yellow;
        color: $js-grey;
        background: $js-dark-yellow;
      }
      &:active {
        box-shadow: inset 0 0 30px 0px $js-grey;
      }
    }
  }
}
</style>
