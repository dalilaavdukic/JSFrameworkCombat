<template>
  <moveable-character
    ref="moveableCharacter"
    :character="character"
    :modifications="modifications"
    @animationStarted="setEnemysAnimation($event)"
  ></moveable-character>
</template>
<script>
import MoveableCharacter from '@/components/MoveableCharacter';
import constants from '@/assets/constants/common';
import EventBus from '@/utils/eventBus';
import characterActions from '@/assets/constants/characterActions';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Oponent',
  components: { MoveableCharacter },
  props: {
    character: {
      type: String,
      required: true,
    },
    modifications: {
      type: Object,
      default: () => ({ mode: constants.characterModes.enemy }),
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['enemy', 'player']),
  },
  created() {
    this.attackInterval = setInterval(() => {
      if (
        // if not dizzy, if player is not dead, if enemy is not dead
        this.player.health > 0 &&
        this.enemy.health > 0 &&
        this.enemy.currentAnimation !== characterActions.dizzy
      ) {
        if (this.enemy.canUseSpecialAttack) {
          // if special attack is available, face right direction and shoot
          this.characterRef.shoot();
        } else {
          // else, follow player and use regular attack
          this.characterRef.attack();
        }
      }
    }, constants.oponentAttackInterval);
  },
  mounted() {
    this.characterRef = this.$refs.moveableCharacter;
    EventBus.$on('enemy-died', () => {
      this.characterRef.die();
      clearInterval(this.attackInterval);
    });
    EventBus.$on('enemy-dizzy', () => {
      this.characterRef.dizzy();
    });
  },
  destroyed() {
    clearInterval(this.attackInterval);
  },
  methods: {
    ...mapMutations(['setEnemysAnimation'])
  },
};
</script>
<style lang="scss" scoped>
</style>