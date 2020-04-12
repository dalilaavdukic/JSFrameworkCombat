<template>
  <div :class="['game-title', size]">
    <div class="js-logo">
      <img src="/images/JSLogo.png" alt="JS Logo" height="145" width="145">
    </div>
    <div class="title">
      <div>Framework</div>
      <div>Combat</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameTitle',
  props: ['size']
}
</script>

<style lang="scss" scoped>
.game-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 95px;
  color: $font-color;
  background: $js-grey;
  box-shadow: $box-shadow;
  font-size: 30px;
  border-radius: $border-radius;
  &.small {
    transform: scale(0.8);
  }
  .title {
    text-align: center;
    padding-left: 10px;
  }
}
</style>
