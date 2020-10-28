<template>
  <div id="app">
    <loader v-if="!assetsLoaded"></loader>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gameAssetsService from '@/services/gameAssets.service';
import Loader from '@/components/Loader';
export default {
  name: 'App',
  components: { Loader },
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
