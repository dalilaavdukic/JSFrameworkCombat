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
    return {
      characterRef: undefined,
      fightInterval: undefined,
      distance: 0,
      playerSide: '',
    };
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
    alreadyAttacking: function () {
      return (
        this.enemy.currentAnimation === characterActions.attack ||
        this.enemy.currentAnimation === characterActions.shoot
      );
    },
  },
  created() {
    this.fightInterval = setInterval(() => {
      this.$emit('positionRequest');
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
  watch: {
    positions: function () {
      this.distance = this.positions.enemy.left - this.positions.player.left;
      this.playerSide = this.distance > 0 ? 'left' : 'right';
      if (!this.alreadyAttacking) {
        this.fight();
      }
    },
  },
  methods: {
    ...mapMutations(['setEnemysAnimation', 'setEnemysFacingDirection']),
    fight() {
      if (this.canFight) {
        // enemy is facing away from player
        if (this.playerSide !== this.enemy.facingDirection) {
          // turn around
          this.playerSide === 'right' ? this.moveRight() : this.moveLeft();
        }
        if (this.enemy.canUseSpecialAttack) {
          this.shoot();
          return;
        }
        this.attemptAttack();
      }
    },
    attemptAttack() {
      // enemy is close enough to player to attack
      if (Math.abs(this.distance) <= constants.minimumAttackDamageDistance) {
        this.attack();
      } else {
        // enemy needs to move closer to player
        this.playerSide === 'right' ? this.moveRight() : this.moveLeft();
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
    moveLeft() {
      this.characterRef.moveLeft();
      this.setEnemysFacingDirection(this.characterRef.facingDirection());
    },
    moveRight() {
      this.characterRef.moveRight();
      this.setEnemysFacingDirection(this.characterRef.facingDirection());
    },
  },
};
</script>
<style lang="scss" scoped>
</style>