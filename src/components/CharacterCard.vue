<template>
  <div :class="['card', {'selected': isSelected}]"
       @click="selectCharacter()" 
       @mouseenter="mouseOver()">
    <character-animation 
      :character="character.name" 
      :animation="animation">
    </character-animation>
    <h2>{{character.name}}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

import characterActions from '@/assets/constants/characterActions';
import CharacterAnimation from '@/components/CharacterAnimation';

export default {
  name: 'CharacterCard',
  props: ['character'],
  components: { CharacterAnimation },
  data() {
    return {
      animation: characterActions.idle
    }
  },
  computed: {
    ...mapGetters([
      'player'
    ]),
    isSelected: function() {
      return this.character.id === this.player.character.id
    }
  },
  methods: {
    ...mapMutations([
      'chooseCharacter'
    ]),
    mouseOver() {
      this.animation = characterActions.attack;
    },
    selectCharacter() {
      const payload = {
        type: 'player',
        character: this.character
      };
      this.chooseCharacter(payload);
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 2rem;
  border-radius: $border-radius;
  border: solid 1px $js-yellow;
  color: $font-color;
  text-align: center;
  cursor: pointer;
  h2 {
    margin-top: 0px;
  }
  &:hover {
    box-shadow: $box-shadow;
  }
  &:active {
    color: $js-grey;
    background: $js-dark-yellow;
  }
  &.selected {
    box-shadow: $box-shadow;
    color: $js-grey;
    background: $js-dark-yellow;
  }
}
</style>