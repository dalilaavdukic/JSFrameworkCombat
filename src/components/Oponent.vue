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
  watch: {
    positions: function() {
      // console.log('WATCHER', this.positions.enemy.left);
    }
  },
  methods: {
    ...mapMutations(['setEnemysAnimation', 'setEnemysFacingDirection']),
    fight() {
      if (this.canFight) {
        if (this.enemy.canUseSpecialAttack) {
          this.shoot();
          return;
        }
        this.attemptAttack();
      }
    },
    async attemptAttack() {
      let numOfItterations = 0;
      let attackPerformed = false;

      while (numOfItterations < 10 && !attackPerformed) {
        numOfItterations++;
        await this.getCurrentState();
        // enemy is facing away from player
        if (this.playerSide !== this.enemy.facingDirection) {
          // turn around
          this.playerSide === 'right'? this.moveRight() : this.moveLeft();
        }
        // enemy is close enough to player to attack
        if (Math.abs(this.distance) <= constants.minimumAttackDamageDistance) {
          this.attack();
          attackPerformed = true;
        } else {
        // enemy needs to move closer to player
          this.playerSide === 'right'? this.moveRight() : this.moveLeft();
        }
      }
    },
    getCurrentState() {
      return new Promise((resolve) => {
        this.$emit('positionRequest');
        setTimeout(()=> {
          this.distance = this.positions.enemy.left - this.positions.player.left;
          this.playerSide = this.distance > 0? 'left' : 'right';
          resolve();
        }, 500)
      })
    },
    attack() {
      this.characterRef.attack();
      this.$emit('attack');
    },
    shoot() {
      this.faceCorrectDirection();
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
    faceCorrectDirection() {
      this.$emit('positionRequest');
      const distance = this.positions.enemy.left - this.positions.player.left;
      // if player is to the left of the enemy
      if (distance > 0) {
        // but enemy is facing right
        if (this.enemy.facingDirection === 'right') {
          this.moveLeft();
        }
      // else, player is to the right of the enemy  
      } else {
        // but enemy is facing left
        if (this.enemy.facingDirection === 'left') {
          this.moveRight();
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>