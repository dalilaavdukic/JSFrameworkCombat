<template>
  <div class="home game-view">
    <div class="title-side">
      <game-title></game-title>
      <div class="character-animation">
        <character-animation 
          :character="characters.vue.name" 
          :animation="vueAnimation.animation"
          :modifications="vueAnimation.modifications">
        </character-animation>
        <character-animation 
          :character="characters.react.name" 
          :animation="reactAnimation.animation"
          :modifications="reactAnimation.modifications">
        </character-animation>
      </div>
    </div>
    <div class="menu-side">
      <div>
        <character-animation 
          :character="characters.angular.name" 
          :animation="angularAnimation.animation"
          :modifications="angularAnimation.modifications">
        </character-animation>
      </div>
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
      characters: characters,
      vueAnimation: {
        animation: characterActions.shoot,
        modifications: {
          loop: true
        }
      },
      reactAnimation: {
        animation: characterActions.shoot,
        modifications: {
          mode: constants.characterModes.enemy,
          loop: true
        }
      },
      angularAnimation: {
        animation: characterActions.jetpack,
        modifications: {
          mode: constants.characterModes.enemy,
          loop: true
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  flex-direction: row;
  .title-side, .menu-side {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .character-animation {
      margin-top: 10%;
    }
  }
  .menu-side {
    justify-content: flex-start;
  }
}
</style>
