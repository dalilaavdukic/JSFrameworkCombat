<template>
  <moveable-character
    ref="moveableCharacter"
    :character="character"
    :modifications="combinedModifications"
    :action="action">
  </moveable-character>
</template>
<script>
import MoveableCharacter from '@/components/MoveableCharacter';
import controlKeys from '@/assets/constants/controlKeys';

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
  },
  created() {
    window.addEventListener('keydown', this.doCommand);
  },
  destroyed() {
    window.removeEventListener('keydown', this.doCommand);
  },
  methods: {
    doCommand(e) {
      if (!e.repeat) {
        let cmd = e.keyCode;
        const character = this.$refs.moveableCharacter;
        switch (cmd) {
          case controlKeys.right:
            character.moveRight();
            break;
          case controlKeys.left:
            character.moveLeft();
            break;
          case controlKeys.jump:
            character.jump();
            break;
          case controlKeys.sliding:
            character.sliding();
            break;
          case controlKeys.attack:
            character.attack();
            break;
          case controlKeys.shoot:
            character.shoot();
            break;
          case controlKeys.roll:
            character.roll();
            break;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>