<template>
  <div @mouseenter="mouseOver()" @mouseleave="mouseLeave()" class="card">
    <character-animation :animation="animation"></character-animation>
    <h2>{{character.name}}</h2>
  </div>
</template>

<script>
import characterActions from '@/assets/constants/characterActions';
import CharacterAnimation from '@/components/CharacterAnimation';

export default {
  name: 'CharacterCard',
  props: ['character'],
  components: { CharacterAnimation },
  data() {
    return {
      animation: {
        character: this.character,
        action: characterActions.idle
      }
    }
  },
  methods: {
    mouseOver() {
      this.animation = {
        character: this.character,
        action: characterActions.attack
      };
    },
    mouseLeave() {
      this.animation = {
        character: this.character,
        action: characterActions.idle
      };
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
}
</style>