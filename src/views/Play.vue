<template>
  <div class="play-container">
    <div class="game-world-bg"></div>
    <div class="game">
      <div class="playable-area">
        <playable-character
          :character="player.character.name">
        </playable-character>
        <oponent-character
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
      'damageHealth',
      'increaseSpecialAttack'
    ])
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
