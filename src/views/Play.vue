<template>
  <div class="game-container">
    <div class="game-world-bg"></div>
    <div class="game-canvas">
      <div class="playable-area">
        <character-animation v-if="playerAnimation" class="player" :animation="playerAnimation"></character-animation>
        <character-animation v-if="enemyAnimation" class="enemy" :animation="enemyAnimation"></character-animation>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import characterActions from '@/assets/constants/characterActions';
import CharacterAnimation from '@/components/CharacterAnimation';
import constants from '@/assets/constants/common';

export default {
  name: 'Play',
  components: {CharacterAnimation},
  computed: {
    ...mapGetters([
      'player',
      'enemy'
    ])
  },
  data() {
    return {
      playerAnimation: {},
      enemyAnimation: {}
    }
  },
  created() {
    this.playerAnimation = {
      character: this.player.character,
      action: characterActions.idle
    };
    this.enemyAnimation = {
      character: this.enemy.character,
      action: characterActions.idle,
      modifications: {
        mode: constants.characterModes.enemy
      }
    }
  },
  methods: {
    ...mapMutations([
      'damageHealth',
      'increaseSpecialAttack'
    ])
  }
}
</script>

<style lang="scss" scoped>
.game-container {
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
  .game-canvas {
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
      .player {
        position: absolute;
        left: 0; 
        right: 0; 
        bottom: -23px;
      }
      .enemy {
        position: absolute;
        left: calc(100% - 300px); 
        right: 0; 
        bottom: -23px;
      }
    }
  }
}
</style>
