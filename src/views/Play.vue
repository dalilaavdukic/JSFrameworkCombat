<template>
  <div class="play-container">
    <div class="game-world-bg"></div>
    <div class="game">
      <div class="playable-area">
        <playable-character
          ref="player"
          @attack="playerAttacked()"
          @shoot="playerShot()"
          :character="player.character.name">
        </playable-character>
        <oponent-character
          ref="enemy"
          :character="enemy.character.name">
        </oponent-character>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PlayableCharacter from '@/components/PlayableCharacter';
import OponentCharacter from '@/components/OponentCharacter';
import constants from '@/assets/constants/common';

export default {
  name: 'Play',
  components: {PlayableCharacter, OponentCharacter},
  computed: {
    ...mapGetters([
      'player',
      'enemy'
    ])
  },
  data() {
    return {
      constants: constants,
      specialAttackInterval: undefined
    }
  },
  created() {
    this.specialAttackInterval = setInterval(() => {
      this.increasePlayersSpecialAttack();
      this.increaseEnemysSpecialAttack();
    }, 10000)
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
      'resetEnemysSpecialAttack'
    ]),
    playerAttacked() {
      if (this.attackCanDamageEnemy()) {
        this.damageEnemysHealth(constants.attackDamageHealthAmount);
      }
    },
    playerShot() {
      if (this.shotCanDamageEnemy()) {
        this.damageEnemysHealth(constants.shotDamageHealthAmount);
        this.decreasePlayersSpecialAttack(constants.specialAttackDecreaseAmount);
      }
    },
    getPosition(mode) {
      return {
        top: this.$refs[mode].$el.offsetTop,
        left: this.$refs[mode].$el.offsetLeft
      };
    },
    attackCanDamageEnemy() {
      const playerPosition = this.getPosition('player');
      const enemyPosition = this.getPosition('enemy');
      const distance = enemyPosition.left - playerPosition.left;
      if (this.player.facingDirection === 'right') {
        return distance > 0 && distance <= constants.minimumAttackDamageDistance; 
      } else {
        return distance >= -constants.minimumAttackDamageDistance && distance < 0;
      }
    },
    shotCanDamageEnemy() {
      const playerPosition = this.getPosition('player');
      const enemyPosition = this.getPosition('enemy');
      const heightDifference = enemyPosition.top - playerPosition.top;
      const distance = enemyPosition.left - playerPosition.left;
      if (Math.abs(heightDifference) < 150) {
        if (this.player.facingDirection === 'right') {
          return distance > 0;
        } else {
          return distance < 0;
        }
      }
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.play-container {
  .game-world-bg {
    position: absolute;
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0;
    background-image: url('~@/assets/worlds/bg7.png');
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
    .playable-area {
      position: relative;
      width: 100%;
      height: 75.5%;
      top: 100px;
    }
  }
}
</style>
