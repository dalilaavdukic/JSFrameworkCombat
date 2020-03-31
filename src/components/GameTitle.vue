<template>
  <div class="container">
    <div class="game-title">
      <div class="js-logo">
        <img src="/images/JSLogo.png" alt="JS Logo" height="145" width="145">
      </div>
      <div class="title">
        <div>Framework</div>
        <div>Combat</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameTitle',
}
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  .game-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 95px;
    margin-top: 30%;
    color: $font-color;
    background: $js-grey;
    box-shadow: $box-shadow;
    font-size: 30px;
    border-radius: $border-radius;
    .title {
      padding-left: 10px;
    }
  }
}
</style>
