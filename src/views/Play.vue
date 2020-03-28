<template>
  <div>
    {{player}}
    <button @click="damageHealth(10)">Damage Health</button>
    <button @click="increaseSpecialAttack(10)">Increase Special Attack</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  name: 'Play',
  computed: {
    ...mapGetters([
      'player'
    ])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([
      'damageHealth',
      'increaseSpecialAttack'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
