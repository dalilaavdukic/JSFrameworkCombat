<template>
  <character-animation
    ref="characterAnimation"
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
      currentModifications: {},
      position: {}
    }
  },
  methods: {
    calculateInitialPosition() {
      this.position = {
        left: this.currentModifications?.mode === constants.characterModes.enemy? 'calc(100% - 300px)' : '0px'
      }
    },
    jump() {
      this.$refs.characterAnimation.updateAnimation(characterActions.jump);
    },
    roll() {
      this.$refs.characterAnimation.updateAnimation(characterActions.roll);
    },
    attack() {
      this.$refs.characterAnimation.updateAnimation(characterActions.attack);
    },
    shoot() {
      this.$refs.characterAnimation.updateAnimation(characterActions.shoot);
    },
    moveForward() {
      console.log('moveForward');
    },
    moveBackward() {
      console.log('moveBackward');
    }
  },
  mounted() {
    this.currentModifications = this.modifications;
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