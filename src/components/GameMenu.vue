<template>
  <div class="game-menu">
    <menu-item
      v-for="(item, index) in items"
      :key="index"
      :item="item"
    ></menu-item>
  </div>
</template>

<script>
import menuItems from '@/assets/constants/menuItems';
import MenuItem from './MenuItem';
export default {
  name: 'GameMenu',
  components: { MenuItem },
  data() {
    return {
      items: menuItems,
    };
  },
};
</script>

<style lang="scss" scoped>
.game-menu {
  width: 50%;
  margin-top: 15%;
}
</style>
