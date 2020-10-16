<template>
  <div id="app">
    <div v-if="!assetsLoaded">Loading Game</div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gameAssetsService from '@/services/gameAssets.service';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['assetsLoaded']),
  },
  mounted() {
    gameAssetsService.loadGameAssets();
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Nova Flat';
}
</style>
