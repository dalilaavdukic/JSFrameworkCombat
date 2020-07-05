<template>
  <moveable-character
    ref="moveableCharacter"
    :character="character"
    :modifications="modifications">
  </moveable-character>
</template>
<script>
import MoveableCharacter from '@/components/MoveableCharacter';
import controlKeys from '@/assets/constants/controlKeys';
import { mapMutations } from 'vuex';

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
      characterRef: undefined
    }
  },
  created() {
    window.addEventListener('keydown', this.doCommand);
  },
  destroyed() {
    window.removeEventListener('keydown', this.doCommand);
  },
  methods: {
    ...mapMutations([
      'setPlayersFacingDirection'
    ]),
    doCommand(e) {
      if (!e.repeat) {
        let cmd = e.keyCode;
        this.characterRef = this.$refs.moveableCharacter;
        switch (cmd) {
          case controlKeys.right:
            this.characterRef.moveRight();
            this.setPlayersFacingDirection(this.characterRef.facingDirection());
            break;
          case controlKeys.left:
            this.characterRef.moveLeft();
            this.setPlayersFacingDirection(this.characterRef.facingDirection());
            break;
          case controlKeys.jump:
            this.characterRef.jump();
            break;
          case controlKeys.sliding:
            this.characterRef.sliding();
            break;
          case controlKeys.attack:
            this.characterRef.attack();
            this.$emit('attack');
            break;
          case controlKeys.shoot:
            this.characterRef.shoot();
            this.$emit('shoot');
            break;
          case controlKeys.roll:
            this.characterRef.roll();
            break;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>