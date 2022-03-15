<template>
  <div class="animation-selector">
    <select
      :value="value"
      @input="(event) => $emit('input', animations[event.target.value])"
    >
      <option
        v-for="animation in animations"
        :value="animation.name"
        :key="animation.name"
      >
        {{ animation.name }}
      </option>
    </select>
  </div>
</template>

<script>
import characterActions from "../assets/constants/characterActions";

export default {
  name: "AnimationSelector",
  props: ["value"],
  data() {
    return {
      animations: characterActions,
    };
  },
};
</script>

<style lang="scss" scoped>
.animation-selector {
  text-align: center;
}
</style>
