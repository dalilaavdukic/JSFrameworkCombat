<template>
  <div id="app">
    <character-animation :animation="animationToPlay1"></character-animation>
    <character-animation :animation="animationToPlay2"></character-animation>
    <character-animation :animation="animationToPlay3"></character-animation>
  </div>
</template>

<script>
import characters from './assets/constants/characters';
import characterActions from './assets/constants/characterActions';
import CharacterAnimation from './components/CharacterAnimation';

export default {
  name: 'App',
  components: {
    CharacterAnimation
  },
  data() {
    return {
      animationToPlay1: {
        character: characters.vue,
        action: characterActions.idle
      },
      animationToPlay2: {
        character: characters.react,
        action: characterActions.idle
      },
      animationToPlay3: {
        character: characters.angular,
        action: characterActions.idle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
