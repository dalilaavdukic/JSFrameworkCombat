<template>
  <character-animation
    class="character" 
    :character="character" 
    :animation="animation"
    :modifications="modifications">
  </character-animation>
</template>
<script>
import CharacterAnimation from '@/components/CharacterAnimation';
import characters from '@/assets/constants/characters';
import characterActions from '@/assets/constants/characterActions';

export default {
  name: 'MoveableCharacter',
  components: {CharacterAnimation},
  data() {
    return {
      animation: characterActions.idle
    }
  },
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
  }
}
</script>
<style lang="scss" scoped>
  .character {
    position: absolute;
    left: calc(100% - 300px); 
    right: 0; 
    bottom: -23px;
  }
</style>