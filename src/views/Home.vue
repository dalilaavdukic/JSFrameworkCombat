<template>
  <div class="home">
    <div class="title-side">
      <game-title></game-title>
      <character-animation style="padding-top: 80px" :animation="vueCharacter"></character-animation>
    </div>
    <div class="menu-side"></div>
  </div>
</template>

<script>
import GameTitle from '@/components/GameTitle';
import characters from '@/assets/constants/characters';
import characterActions from '@/assets/constants/characterActions';
import CharacterAnimation from '@/components/CharacterAnimation';

export default {
  name: 'Home',
  components: {
    GameTitle,
    CharacterAnimation
  },
  data() {
    return {
      vueCharacter: {
        character: characters.vue,
        action: characterActions.runWithGun
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
  }
  .title-side {
    text-align: center;
  }
}
</style>
