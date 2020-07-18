<template>
  <moveable-character
    ref="moveableCharacter"
    :character="character"
    :modifications="modifications">
  </moveable-character>
</template>
<script>
import MoveableCharacter from '@/components/MoveableCharacter';
import constants from '@/assets/constants/common';

// will listen to events raised by player in store and react based on them

export default {
  name: 'Oponent',
  components: {MoveableCharacter},
  props: {
    character: {
      type: String,
      required: true
    },
    modifications:{
      type: Object,
      default: () => ({mode: constants.characterModes.enemy})
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>