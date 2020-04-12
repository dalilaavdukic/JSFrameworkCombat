<template>
  <div class="characters">
    <div class="characters-header">
      <game-title size='small'></game-title>
      <h1>Choose a character to play with: </h1>
    </div>
    <div class="character-options">
      <character-card 
        v-for="character in characters" 
        :key="character.name" 
        :character="character">
      </character-card>
    </div>
  </div>
</template>

<script>
import characters from '../assets/constants/characters';
import GameTitle from '@/components/GameTitle';
import CharacterCard from '@/components/CharacterCard';

export default {
  name: 'Characters',
  components: {
    GameTitle,
    CharacterCard
  },
  data() {
    return {
      characters: characters
    }
  }
}
</script>

<style lang="scss" scoped>
.characters {
  background: $js-grey;
  -webkit-box-shadow: inset $box-shadow;
  box-shadow: inset $box-shadow;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .characters-header {
    align-self: flex-start;
    display: flex;
    align-items: center;
    padding-top: 25px;
    h1 {
      color: $font-color;
    }
  }
  .character-options {
    display: flex;
  }
}
</style>
