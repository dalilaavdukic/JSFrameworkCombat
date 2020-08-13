<template>
  <div class="play-container">
    <div class="game-world-bg"></div>
    <div class="game">
      <div class="players-bars">
        <players-bars :player="player"></players-bars>
        <players-bars :player="enemy" side="right"></players-bars>
      </div>
      <div class="playable-area">
        <player
          ref="player"
          @attack="playerAttacked()"
          @shoot="playerShot()"
          :character="player.character.name"
        ></player>
        <oponent ref="enemy" :character="enemy.character.name"></oponent>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Player from "@/components/Player";
import Oponent from "@/components/Oponent";
import PlayersBars from "@/components/PlayersBars";
import constants from "@/assets/constants/common";
import characterActions from "@/assets/constants/characterActions";

export default {
  name: "Play",
  components: { Player, Oponent, PlayersBars },
  computed: {
    ...mapGetters(["player", "enemy"])
  },
  data() {
    return {
      constants: constants,
      specialAttackInterval: undefined
    };
  },
  created() {
    this.specialAttackInterval = setInterval(() => {
      this.increasePlayersSpecialAttack();
      this.increaseEnemysSpecialAttack();
    }, 2000);
  },
  destroyed() {
    this.resetEnemysSpecialAttack();
    this.resetPlayersSpecialAttack();
    this.resetPlayersHealth();
    this.resetEnemysHealth();
    clearInterval(this.specialAttackInterval);
  },
  methods: {
    ...mapMutations([
      "damagePlayersHealth",
      "damageEnemysHealth",
      "resetPlayersHealth",
      "resetEnemysHealth",
      "increasePlayersSpecialAttack",
      "increaseEnemysSpecialAttack",
      "decreasePlayersSpecialAttack",
      "decreaseEnemysSpecialAttack",
      "resetPlayersSpecialAttack",
      "resetEnemysSpecialAttack"
    ]),
    playerAttacked() {
      if (this.attackCanDamageEnemy()) {
        this.damageEnemysHealth(constants.attackDamageHealthAmount);
      }
      // TO DO: remove this, using for testing purposes
      // because until the enemy is implemented there is no way to damage the players health
      // this.damagePlayersHealth(constants.attackDamageHealthAmount);
    },
    playerShot() {
      if (this.shotCanDamageEnemy()) {
        this.damageEnemysHealth(constants.shotDamageHealthAmount);
      }
      this.decreasePlayersSpecialAttack(constants.specialAttackDecreaseAmount);
    },
    getPosition(mode) {
      return {
        top: this.$refs[mode].$el.offsetTop,
        left: this.$refs[mode].$el.offsetLeft
      };
    },
    attackCanDamageEnemy() {
      if (
        this.enemy.currentAnimation === characterActions.roll ||
        this.enemy.currentAnimation === characterActions.slide
      ) {
        return false;
      }
      const playerPosition = this.getPosition("player");
      const enemyPosition = this.getPosition("enemy");
      const distance = enemyPosition.left - playerPosition.left;
      if (this.player.facingDirection === "right") {
        return (
          distance > 0 && distance <= constants.minimumAttackDamageDistance
        );
      } else {
        return (
          distance >= -constants.minimumAttackDamageDistance && distance < 0
        );
      }
    },
    shotCanDamageEnemy() {
      if (
        this.enemy.currentAnimation === characterActions.roll ||
        this.enemy.currentAnimation === characterActions.slide
      ) {
        return false;
      }
      const playerPosition = this.getPosition("player");
      const enemyPosition = this.getPosition("enemy");
      const heightDifference = enemyPosition.top - playerPosition.top;
      const distance = enemyPosition.left - playerPosition.left;
      if (Math.abs(heightDifference) < 150) {
        if (this.player.facingDirection === "right") {
          return distance > 0;
        } else {
          return distance < 0;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.play-container {
  .game-world-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("~@/assets/worlds/bg7.png");
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .game {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .players-bars {
      position: relative;
      top: 0;
      color: white;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      padding: 20px 20px 0;
    }
    .playable-area {
      position: relative;
      width: 100%;
      height: 74.5%;
    }
  }
}
</style>
