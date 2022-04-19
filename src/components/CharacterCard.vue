<template>
  <div
    :class="['card', { selected: isSelected }]"
    @click="selectCharacter()"
    @keypress="handleKeyPress($event)"
    @mouseenter="mouseOver()"
  >
    <character-animation
      :character="character.name"
      :animation="animation"
      :characterType="'enemies'"
    >
    </character-animation>
    <h2>{{ character.name }}</h2>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import characterActions from '@/assets/constants/characterActions';
import CharacterAnimation from '@/components/CharacterAnimation';

export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  components: { CharacterAnimation },
  data() {
    return {
      animation: characterActions.idle,
      availableAnimations: ['attack', 'shoot', 'slide'],
    };
  },
  computed: {
    ...mapGetters(['player']),
    isSelected: function () {
      return this.character.id === this.player.character.id;
    },
  },
  methods: {
    ...mapMutations(['chooseCharacter']),
    mouseOver() {
      this.animation = { ...this.getRandomAnimation() };
    },
    getRandomAnimation() {
      const arrayIndex = Math.round(
        Math.random() * (this.availableAnimations.length - 1)
      );
      const actionName = this.availableAnimations[arrayIndex];
      return characterActions[actionName];
    },
    selectCharacter() {
      this.chooseCharacter(this.character);
    },
    handleKeyPress(e) {
      // enter
      if (e.keyCode === 13) {
        this.selectCharacter();
      }
    },
  },
};
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
  &:hover,
  &:focus {
    box-shadow: $box-shadow;
    outline: none;
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