<template>
  <div :class="['bar', side]">
    <div :class="[character, side]" :style="{ width: value + '%' }">
      <span v-if="value">{{ value }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: {
    character: {
      type: String,
      required: false,
    },
    value: {
      type: Number,
      required: true,
    },
    side: {
      type: String,
      required: false,
      default: 'left',
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  border: 1px solid $js-darkest-yellow;
  height: 20px;
  width: 100%;
  margin-bottom: 5px;
  &.right {
    border-radius: 10px 0 0 10px;
  }
  &.left {
    border-radius: 0 10px 10px 0;
  }
  div {
    height: 20px;
    transition: width 0.2s linear;
    color: $js-grey;
    text-align: center;
    &.right {
      display: block;
      float: right;
      border-radius: 10px 0 0 10px;
    }
    background-color: $js-dark-yellow; /* For browsers that do not support gradients */
    &.left {
      border-radius: 0 10px 10px 0;
      background-image: linear-gradient(
        to right,
        $js-dark-yellow,
        $js-darkest-yellow
      );
    }
    &.right {
      background-image: linear-gradient(
        to left,
        $js-dark-yellow,
        $js-darkest-yellow
      );
    }
    &.vue {
      background-color: $vue-color;
      &.left {
        background-image: linear-gradient(
          to right,
          $vue-color,
          $vue-dark-color
        );
      }
      &.right {
        background-image: linear-gradient(to left, $vue-color, $vue-dark-color);
      }
    }
    &.react {
      background-color: $react-color;
      &.left {
        background-image: linear-gradient(
          to right,
          $react-color,
          $react-dark-color
        );
      }
      &.right {
        background-image: linear-gradient(
          to left,
          $react-color,
          $react-dark-color
        );
      }
    }
    &.angular {
      background-color: $angular-color;
      &.left {
        background-image: linear-gradient(
          to right,
          $angular-color,
          $angular-dark-color
        );
      }
      &.right {
        background-image: linear-gradient(
          to left,
          $angular-color,
          $angular-dark-color
        );
      }
    }
  }
}
</style>
