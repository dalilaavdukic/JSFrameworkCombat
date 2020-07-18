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
import { mapMutations, mapGetters } from 'vuex';
import EventBus from '@/utils/eventBus';

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
  computed: {
    ...mapGetters([
      'player'
    ])
  },
  mounted() {
    this.characterRef = this.$refs.moveableCharacter;
    EventBus.$on('player-died', () => {
      this.characterRef.die();
    });
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
      if (!e.repeat && this.player.health > 0) {
        let cmd = e.keyCode;
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
          case controlKeys.slide:
            this.characterRef.slide();
            break;
          case controlKeys.attack:
            this.characterRef.attack();
            this.$emit('attack');
            break;
          case controlKeys.shoot:
            if (this.player.canUseSpecialAttack) {
              this.characterRef.shoot();
              this.$emit('shoot');
            }
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