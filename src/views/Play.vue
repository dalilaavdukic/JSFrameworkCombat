<template>
  <div class="game-container">
    <div class="game-world-bg"></div>
    <div class="game-canvas">
      <div class="playable-area">
        <character-animation
            class="player"
            :character="player.character.name"
            :animation="playerAnimation">
        </character-animation>
        <moveable-character
          :character="enemy.character.name"
          :modifications="{mode: constants.characterModes.enemy}">
        </moveable-character>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import characterActions from '@/assets/constants/characterActions';
import CharacterAnimation from '@/components/CharacterAnimation';
import MoveableCharacter from '@/components/MoveableCharacter';
import constants from '@/assets/constants/common';

export default {
  name: 'Play',
  components: {CharacterAnimation, MoveableCharacter},
  computed: {
    ...mapGetters([
      'player',
      'enemy'
    ])
  },
  data() {
    return {
      playerAnimation: characterActions.idle,
      constants: constants
    }
  },
  created() {
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
    }
  }
}
</style>
