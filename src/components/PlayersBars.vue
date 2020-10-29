<template>
  <div :class="['player-info', side]">
    <div class="profile-pic">
      <img :src="profilePic" />
    </div>
    <div :class="['bars', side]">
      <bar :value="player.health" :side="side"></bar>
      <bar
        :value="player.specialAttack"
        :character="player.character.name"
        :side="side"
      ></bar>
    </div>
  </div>
</template>

<script>
import Bar from './Bar';
import gameAssetsService from '@/services/gameAssets.service';
import constants from '@/assets/constants/common';

export default {
  name: 'PlayersBars',
  components: { Bar },
  props: {
    player: {
      type: Object,
      required: true,
    },
    side: {
      type: String,
      required: false,
      default: constants.side.left,
    },
  },
  computed: {
    profilePic: function () {
      return gameAssetsService.assets.characters[
        this.side === constants.side.left ? 'players' : 'enemies'
      ][this.player.character.name].profilePic.src;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.right {
    justify-content: flex-end;
    flex-direction: row-reverse;
  }
  &:last-child {
    text-align: end;
  }
  .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid $js-darkest-yellow;
    background-color: $js-grey;
    z-index: 1;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .bars {
    width: 420px;
    &.left {
      margin-left: -7px;
    }
    &.right {
      margin-right: -7px;
    }
  }
}
</style>
