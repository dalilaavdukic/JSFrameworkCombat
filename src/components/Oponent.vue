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
    positions: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['enemy', 'player']),
    canFight: function () {
      return (
        this.player.health > 0 &&
        this.enemy.health > 0 &&
        this.enemy.currentAnimation !== characterActions.dizzy
      );
    },
  },
  created() {
    this.fightInterval = setInterval(() => {
      this.fight();
    }, constants.oponentFightInterval);
  },
  mounted() {
    this.characterRef = this.$refs.moveableCharacter;
    EventBus.$on('enemy-died', () => {
      this.characterRef.die();
      clearInterval(this.fightInterval);
    });
    EventBus.$on('enemy-dizzy', () => {
      this.characterRef.dizzy();
    });
  },
  destroyed() {
    clearInterval(this.fightInterval);
  },
  methods: {
    ...mapMutations(['setEnemysAnimation', 'setEnemysFacingDirection']),
    fight() {
      if (this.canFight) {
        if (this.enemy.canUseSpecialAttack) {
          this.faceCorrectDirection();
          this.shoot();
        } else {
          this.attack();
        }
      }
    },
    attack() {
      this.characterRef.attack();
      this.$emit('attack');
    },
    shoot() {
      this.characterRef.shoot();
      this.$emit('shoot');
    },
    faceCorrectDirection() {
      this.$emit('positionRequest');
      const distance = this.positions.enemy.left - this.positions.player.left;
      // if enemy is to the left of the player
      if (distance > 0) {
        // but facing right
        if (this.enemy.facingDirection === 'right') {
          this.characterRef.moveLeft();
          this.setEnemysFacingDirection(this.characterRef.facingDirection());
        }
      // else, enemy is to the right of the player  
      } else {
        // but facing left
        if (this.enemy.facingDirection === 'left') {
          this.characterRef.moveRight();
          this.setEnemysFacingDirection(this.characterRef.facingDirection());
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>