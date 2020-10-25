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

export default {
  name: 'Play',
  components: { Player, Oponent, PlayersBars },
  computed: {
    ...mapGetters(['player', 'enemy', 'game']),
  },
  data() {
    return {
      constants: constants,
      specialAttackInterval: undefined
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
      'setPositions'
    ]),
    playerAttacked() {
      // emit event that player has attacked so enemy can react
      this.getPositions();
      if (this.game.attackCanDamageEnemy) {
        this.damageEnemysHealth(constants.attackDamageHealthAmount);
      }
    },
    playerShot() {
      // emit event that play has shot so enemy can react
      this.getPositions();
      if (this.game.shotCanDamageEnemy) {
        this.damageEnemysHealth(constants.shotDamageHealthAmount);
      }
      this.decreasePlayersSpecialAttack(constants.specialAttackDecreaseAmount);
    },
    enemyAttacked() {
      this.getPositions();
      if (this.game.attackCanDamagePlayer) {
        this.damagePlayersHealth(constants.attackDamageHealthAmount);
      }
    },
    enemyShot() {
      this.getPositions();
      if (this.game.shotCanDamagePlayer) {
        this.damagePlayersHealth(constants.shotDamageHealthAmount);
      }
      this.decreaseEnemysSpecialAttack(constants.specialAttackDecreaseAmount);
    },
    getPositions() {
      const positions = {
        enemy: {
          top: this.$refs.enemy.$el.offsetTop,
          left: this.$refs.enemy.$el.offsetLeft,
        },
        player: {
          top: this.$refs.player.$el.offsetTop,
          left: this.$refs.player.$el.offsetLeft,
        },
      };
      this.setPositions(positions);
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
