<template>
  <router-link :to="item.link">
    <div class="menu-item">{{ item.label }}</div>
  </router-link>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['item'],
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  .menu-item {
    text-align: center;
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
</style>
