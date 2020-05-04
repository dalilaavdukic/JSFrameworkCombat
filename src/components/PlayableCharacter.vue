<template>
  <moveable-character
    :character="character"
    :modifications="combinedModifications"
    :action="action">
  </moveable-character>
</template>
<script>
import MoveableCharacter from '@/components/MoveableCharacter';

export default {
  name: 'PlayableCharacter',
  components: {MoveableCharacter},
  props: {
    character: {
      type: String,
      required: true
    },
    modifications:{
      type: Object
    }
  },
  data() {
    return {
      action: '',
      combinedModifications: undefined
    }
  }
  // will listen to keyboard input and update action anc modifications accordingly
}
</script>
<style lang="scss" scoped>
</style>