<template>
  <div id="app">
    <div>
      <character-animation :animation="animationToPlay1"></character-animation>
      <animation-selector
        :value="animationToPlay1.action.name"
        @input="(animation) => setAnimation(animation, 'animationToPlay1')"
      ></animation-selector>
    </div>
    <div>
      <character-animation :animation="animationToPlay2"></character-animation>
      <animation-selector
        :value="animationToPlay2.action.name"
        @input="(animation) => setAnimation(animation, 'animationToPlay2')"
      ></animation-selector>
    </div>
    <div>
      <character-animation :animation="animationToPlay3"></character-animation>
      <animation-selector
        :value="animationToPlay3.action.name"
        @input="(animation) => setAnimation(animation, 'animationToPlay3')"
      ></animation-selector>
    </div>
  </div>
</template>

<script>
import characters from "./assets/constants/characters";
import characterActions from "./assets/constants/characterActions";
import CharacterAnimation from "./components/CharacterAnimation";
import AnimationSelector from "./components/AnimationSelector";

export default {
  name: "App",
  components: {
    CharacterAnimation,
    AnimationSelector,
  },
  data() {
    return {
      animations: characterActions,
      animationToPlay1: {
        character: characters.vue,
        action: characterActions.idle,
      },
      animationToPlay2: {
        character: characters.react,
        action: characterActions.idle,
      },
      animationToPlay3: {
        character: characters.angular,
        action: characterActions.idle,
      },
    };
  },
  methods: {
    setAnimation: function (newAnimation, changedAnimation) {
      this[changedAnimation] = {
        ...this[changedAnimation],
        action: newAnimation,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
}
</style>
