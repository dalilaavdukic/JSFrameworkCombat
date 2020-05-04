<template>
  <character-animation
    class="character"
    :style="[position]" 
    :character="character" 
    :animation="animation"
    :modifications="modifications">
  </character-animation>
</template>
<script>
import CharacterAnimation from '@/components/CharacterAnimation';
import characters from '@/assets/constants/characters';
import constants from '@/assets/constants/common';
import characterActions from '@/assets/constants/characterActions';

export default {
  name: 'MoveableCharacter',
  components: {CharacterAnimation},
  props: {
    character: {
      type: String,
      default: characters.vue.name
    },
    action: {
      type: String
    },
    modifications: {
      type: Object
    }
  },
  data() {
    return {
      animation: characterActions.idle,
      position: {}
    }
  },
  methods: {
    calculateInitialPosition() {
      this.position = {
        left: this.modifications?.mode === constants.characterModes.enemy? 'calc(100% - 300px)' : '0px'
      }
    }
  },
  mounted() {
    this.calculateInitialPosition();
  }
  // will listen to changes to actions and update position, animation etc and pass to characterAnimation
  // changes can be intiated by user's keyboard (playableCharacter component) or programatically
}
</script>
<style lang="scss" scoped>
  .character {
    position: absolute;
    left: 0; 
    right: 0; 
    bottom: -23px;
  }
</style>