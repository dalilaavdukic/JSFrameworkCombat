<template>
  <div class="characters">
    <div class="characters-header">
      <game-title size='small'></game-title>
      <h1>Choose a character to play with: </h1>
    </div>
    <form class="player-form">
      <div class="character-options">
        <character-card 
          v-for="character in characters" 
          :key="character.name" 
          :character="character">
        </character-card>
      </div>
      <div class="player-inputs">
        <div>
          <label>Name:</label>
          <input 
            :value="player.name" 
            @input="updateName" 
            type="text">
        </div>
        <button @click="play" :disabled="!player.name">Play!</button>
      </div>
    </form>
  </div>
</template>

<script>
import characters from '../assets/constants/characters';
import GameTitle from '@/components/GameTitle';
import CharacterCard from '@/components/CharacterCard';
import { mapGetters, mapMutations } from 'vuex';

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
  },
  computed: {
    ...mapGetters(['player']),
    buttonDisabled: function() {
      return this.player.name === '';
    }
  },
  methods: {
    ...mapMutations([
      'giveName'
    ]),
    updateName(e) {
      this.giveName(e.target.value);
    },
    play() {
      this.$router.push('play');
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
  color: $font-color;
  .characters-header {
    align-self: flex-start;
    display: flex;
    align-items: center;
    padding-top: 25px;
  }
  .player-form {
    .character-options {
      display: flex;
    }
    .player-inputs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2rem;
      label {
        font-size: 24px;
      }
      input {
        height: 35px;
        width: 350px;
        margin-left: 30px;
        padding: 0 15px;
        border-radius: $border-radius;
        padding-left: 15px;
        font-size: 18px;
        outline: none;
        background: $js-grey;
        border: 1px solid gray;
        color: wheat;
        &:focus {
          border: 1px solid $js-yellow;
        }
      }
      button {
        font-size: 24px;
        padding: 1rem;
        color: $font-color;
        background: $js-grey;
        box-shadow: $box-shadow;
        border-radius: $border-radius;
        border: 0;
        font-family: 'Nova Flat';
        &:hover {
          box-shadow: 0 0 100px 0px $js-yellow;
          color: $js-grey;
          background: $js-dark-yellow;
        }
        &:active {
          box-shadow: inset 0 0 30px 0px $js-grey;
          outline: none;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
  
}
</style>
