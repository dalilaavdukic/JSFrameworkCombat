<template>
  <div class="play-container">
    <div class="game-world-bg"></div>
    <div class="game">
      <div class="playable-area">
        <playable-character
          ref="player"
          @attack="playerAttacked()"
          @shoot="playerShot()"
          @roll="playerRolled()"
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
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
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
      constants: constants
    }
  },
  created() {
  },
  methods: {
    ...mapMutations([
      'damagePlayersHealth',
      'damageEnemysHealth',
      'increasePlayersSpecialAttack'
    ]),
    playerAttacked() {
      if (this.attackCanDamageEnemy()) {
        this.damageEnemysHealth(constants.attackDamageHealthAmount);
      }
    },
    playerShot() {
      console.log('player shot');
    },
    playerRolled() {
      console.log('player rolled');
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
