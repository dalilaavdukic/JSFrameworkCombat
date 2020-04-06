<template>
  <div class="home">
    <div class="title-side">
      <game-title></game-title>
      <character-animation :animation="vueCharacter"></character-animation>
      <character-animation :animation="reactCharacter"></character-animation>
    </div>
    <div class="menu-side">
      <character-animation :animation="angularCharacter"></character-animation>
      <game-menu></game-menu>
    </div>
  </div>
</template>

<script>
import GameTitle from '@/components/GameTitle';
import GameMenu from '@/components/GameMenu';
import characters from '@/assets/constants/characters';
import characterActions from '@/assets/constants/characterActions';
import CharacterAnimation from '@/components/CharacterAnimation';
import constants from '@/assets/constants/common';

export default {
  name: 'Home',
  components: {
    GameTitle,
    GameMenu,
    CharacterAnimation
  },
  data() {
    return {
      vueCharacter: {
        character: characters.vue,
        action: characterActions.attack,
        modifications: {
          loop: true
        }
      },
      reactCharacter: {
        character: characters.react,
        action: characterActions.runWithGun
      },
      angularCharacter: {
        character: characters.angular,
        action: characterActions.runWithGun,
        modifications: {
          mode: constants.characterModes.enemies,
          loop: true
        }
      },
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home {
  background: $js-grey;
  -webkit-box-shadow: inset $box-shadow;
  box-shadow: inset $box-shadow;
  color: white;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .title-side, .menu-side {
    width: 50%;
    height: 100%;
    text-align: center;
  }
}
</style>
