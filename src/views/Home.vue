<template>
  <div class="home game-view">
    <div class="title-side">
      <game-title></game-title>
      <div class="character-animation">
        <character-animation
          :character="characters.vue.name"
          :animation="vueAnimation.animation"
          :modification="vueAnimation.modification"
        >
        </character-animation>
        <character-animation
          :character="characters.react.name"
          :animation="reactAnimation.animation"
          :modification="reactAnimation.modification"
        >
        </character-animation>
      </div>
    </div>
    <div class="menu-side">
      <div>
        <character-animation
          :character="characters.angular.name"
          :animation="angularAnimation.animation"
          :modification="angularAnimation.modification"
        >
        </character-animation>
      </div>
      <game-menu></game-menu>
      <div class="credits">
        <div>Game by Dalila Balic</div>
        <div>
          Characters by
          <a href="https://themeforest.net/user/pasilan">Pasilan</a>
        </div>
      </div>
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
    CharacterAnimation,
  },
  data() {
    return {
      characters: characters,
      vueAnimation: {
        animation: { ...characterActions.shoot, loop: true },
      },
      reactAnimation: {
        animation: { ...characterActions.shoot, loop: true },
        modification: constants.characterModes.enemy,
      },
      angularAnimation: {
        animation: { ...characterActions.jetpack, loop: true },
        modification: constants.characterModes.enemy,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  flex-direction: row;
  .title-side,
  .menu-side {
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
    .credits {
      position: absolute;
      bottom: 31px;
      right: 40px;
      font-size: 20px;
      a {
        color: $js-dark-yellow;
      }
    }
  }
}
</style>
