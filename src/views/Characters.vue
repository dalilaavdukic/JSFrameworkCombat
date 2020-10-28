<template>
  <div class="game-view">
    <game-header>Choose a character to play with:</game-header>
    <form class="player-form">
      <div class="character-options">
        <character-card
          v-for="character in characters"
          :key="character.name"
          :character="character"
        >
        </character-card>
      </div>
      <div class="player-inputs">
        <div>
          <label>Name:</label>
          <input :value="player.name" @input="updateName" type="text" />
        </div>
        <button
          type="button"
          @click="play"
          :disabled="!player.name || !player.character"
        >
          Play!
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import characters from '../assets/constants/characters';
import GameHeader from '@/components/GameHeader';
import CharacterCard from '@/components/CharacterCard';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Characters',
  components: {
    GameHeader,
    CharacterCard,
  },
  data() {
    return {
      characters: characters,
    };
  },
  computed: {
    ...mapGetters(['player']),
    buttonDisabled: function () {
      return this.player.name === '';
    },
  },
  methods: {
    ...mapMutations(['giveName']),
    updateName(e) {
      this.giveName(e.target.value);
    },
    play() {
      this.$router.push('play');
    },
  },
};
</script>

<style lang="scss" scoped>
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
      color: $font-color;
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
        &:disabled {
          box-shadow: none;
        }
      }
      &:active {
        box-shadow: inset 0 0 30px 0px $js-grey;
        outline: none;
      }
      &:focus {
        outline: 0.5px solid $js-grey;
      }
      &:disabled {
        box-shadow: none;
        color: $js-grey;
        background: $disabled-btn-background;
      }
    }
  }
}
</style>
