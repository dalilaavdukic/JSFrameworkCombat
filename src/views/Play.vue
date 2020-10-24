<template>
  <div class="play-container">
    <div class="game-world-bg"></div>
    <div class="game">
      <div class="players-bars">
        <players-bars :player="player"></players-bars>
        <players-bars :player="enemy" side="right"></players-bars>
      </div>
      <div class="playable-area">
        <player
          ref="player"
          @attack="playerAttacked()"
          @shoot="playerShot()"
          :character="player.character.name"
        ></player>
        <oponent
          ref="enemy"
          :character="enemy.character.name"
          :positions="positions"
          @positionRequest="getPositions()"
          @attack="enemyAttacked()"
          @shoot="enemyShot()"
        ></oponent>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Player from '@/components/Player';
import Oponent from '@/components/Oponent';
import PlayersBars from '@/components/PlayersBars';
import constants from '@/assets/constants/common';
import characterActions from '@/assets/constants/characterActions';

export default {
  name: 'Play',
  components: { Player, Oponent, PlayersBars },
  computed: {
    ...mapGetters(['player', 'enemy']),
  },
  data() {
    return {
      constants: constants,
      specialAttackInterval: undefined,
      positions: {
        player: {},
        enemy: {}
      }
    };
  },
  created() {
    this.specialAttackInterval = setInterval(() => {
      if (this.enemy.health > 0 && this.player.health > 0) {
        this.increasePlayersSpecialAttack();
        this.increaseEnemysSpecialAttack();
      }
    }, constants.specialAttackIncreaseInterval);
  },
  mounted() {
    this.getPositions();
  },
  destroyed() {
    this.resetEnemysSpecialAttack();
    this.resetPlayersSpecialAttack();
    this.resetPlayersHealth();
    this.resetEnemysHealth();
    clearInterval(this.specialAttackInterval);
  },
  methods: {
    ...mapMutations([
      'damagePlayersHealth',
      'damageEnemysHealth',
      'resetPlayersHealth',
      'resetEnemysHealth',
      'increasePlayersSpecialAttack',
      'increaseEnemysSpecialAttack',
      'decreasePlayersSpecialAttack',
      'decreaseEnemysSpecialAttack',
      'resetPlayersSpecialAttack',
      'resetEnemysSpecialAttack',
    ]),
    playerAttacked() {
      // emit event that player has attacked so enemy can react
      if (this.attackCanDamageEnemy()) {
        this.damageEnemysHealth(constants.attackDamageHealthAmount);
      }
    },
    playerShot() {
      // emit event that play has shot so enemy can react
      if (this.shotCanDamageEnemy()) {
        this.damageEnemysHealth(constants.shotDamageHealthAmount);
      }
      this.decreasePlayersSpecialAttack(constants.specialAttackDecreaseAmount);
    },
    enemyAttacked() {
      if (this.attackCanDamagePlayer()) {
        this.damagePlayersHealth(constants.attackDamageHealthAmount);
      }
    },
    enemyShot() {
      if (this.shotCanDamagePlayer()) {
        this.damagePlayersHealth(constants.shotDamageHealthAmount);
      }
      this.decreaseEnemysSpecialAttack(constants.specialAttackDecreaseAmount);
    },
    getPosition(mode) {
      const position = {
        top: this.$refs[mode].$el.offsetTop,
        left: this.$refs[mode].$el.offsetLeft,
      }

      if (mode === 'player') {
        this.playerPosition = position;
      } else {
        this.enemyPosition = position;
      }

      return position;
    },
    getPositions() {
      this.positions = {
        enemy: {
          top: this.$refs.enemy.$el.offsetTop,
          left: this.$refs.enemy.$el.offsetLeft,
        },
        player: {
          top: this.$refs.player.$el.offsetTop,
          left: this.$refs.player.$el.offsetLeft,
        }
      }
    },
    attackCanDamageEnemy() {
      if (
        this.enemy.currentAnimation === characterActions.roll ||
        this.enemy.currentAnimation === characterActions.slide
      ) {
        return false;
      }
      this.getPositions();
      const distance = this.positions.enemy.left - this.positions.player.left;
      if (this.player.facingDirection === 'right') {
        return (
          distance > 0 && distance <= constants.minimumAttackDamageDistance
        );
      } else {
        return (
          distance >= -constants.minimumAttackDamageDistance && distance < 0
        );
      }
    },
    shotCanDamageEnemy() {
      if (
        this.enemy.currentAnimation === characterActions.roll ||
        this.enemy.currentAnimation === characterActions.slide
      ) {
        return false;
      }
      this.getPositions();
      const heightDifference = this.positions.enemy.top - this.positions.player.top;
      const distance = this.positions.enemy.left - this.positions.player.left;
      if (Math.abs(heightDifference) < constants.damageHeight) {
        if (this.player.facingDirection === 'right') {
          return distance > 0;
        } else {
          return distance < 0;
        }
      }
      return false;
    },
    attackCanDamagePlayer() {
      if (
        this.player.currentAnimation === characterActions.roll ||
        this.player.currentAnimation === characterActions.slide
      ) {
        return false;
      }
      this.getPositions();
      const distance = this.positions.player.left - this.positions.enemy.left;
      if (this.enemy.facingDirection === 'right') {
        return (
          distance > 0 && distance <= constants.minimumAttackDamageDistance
        );
      } else {
        return (
          distance >= -constants.minimumAttackDamageDistance && distance < 0
        );
      }
    },
    shotCanDamagePlayer() {
      if (
        this.player.currentAnimation === characterActions.roll ||
        this.player.currentAnimation === characterActions.slide
      ) {
        return false;
      }
      this.getPositions();
      const heightDifference = this.positions.player.top - this.positions.enemy.top;
      const distance = this.positions.player.left - this.positions.enemy.left;
      if (Math.abs(heightDifference) < constants.damageHeight) {
        if (this.enemy.facingDirection === 'right') {
          return distance > 0;
        } else {
          return distance < 0;
        }
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.play-container {
  .game-world-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('~@/assets/worlds/boxingRing.jpg');
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .game {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .players-bars {
      position: relative;
      top: 0;
      color: white;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      padding: 20px 20px 0;
    }
    .playable-area {
      position: relative;
      width: 100%;
      height: 75%;
    }
  }
}
</style>
