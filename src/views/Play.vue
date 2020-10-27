<template>
  <div class="play-container">
    <div v-if="timeLeft > 0 || game.over || game.paused" class="overlay"></div>
    <div class="overlay-content">
      <div v-if="timeLeft > 0" class="counter-number">
        {{ timeLeft }}
      </div>
      <div v-if="game.over" class="game-over">
        <game-over></game-over>
      </div>
      <div v-if="game.paused" class="paused">
        <div v-if="!game.quitInitiated">Game paused, press 'Space' to resume</div>
        <quit-game v-else></quit-game>
      </div>
    </div>
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
        <oponent
          ref="enemy"
          :character="enemy.character.name"
          @positionRequest="getPositions()"
          @attack="enemyAttacked()"
          @shoot="enemyShot()"
        ></oponent>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Player from '@/components/Player';
import Oponent from '@/components/Oponent';
import PlayersBars from '@/components/PlayersBars';
import GameOver from '@/components/GameOver';
import QuitGame from '@/components/QuitGame';
import constants from '@/assets/constants/common';
import EventBus from '@/utils/eventBus';

export default {
  name: 'Play',
  components: { Player, Oponent, PlayersBars, GameOver, QuitGame },
  computed: {
    ...mapGetters(['player', 'enemy', 'game']),
  },
  data() {
    return {
      constants: constants,
      specialAttackInterval: undefined,
      timeLeft: constants.countdownToGameSeconds,
    };
  },
  mounted() {
    setTimeout(() => {
      this.gameCountdown();
    }, 1000);
    setTimeout(() => {
      this.specialAttackInterval = setInterval(() => {
        if (!this.game.over && !this.game.paused) {
          this.increasePlayersSpecialAttack();
          this.increaseEnemysSpecialAttack();
        }
      }, constants.specialAttackIncreaseInterval);
      this.getPositions();
    }, constants.countdownToGameSeconds * 1000);
  },
  destroyed() {
    this.resetGame();
    clearInterval(this.specialAttackInterval);
  },
  methods: {
    ...mapMutations([
      'damagePlayersHealth',
      'damageEnemysHealth',
      'resetGame',
      'increasePlayersSpecialAttack',
      'increaseEnemysSpecialAttack',
      'decreasePlayersSpecialAttack',
      'decreaseEnemysSpecialAttack',
      'setPositions',
    ]),
    playerAttacked() {
      // emit event that player has attacked so enemy can react
      EventBus.$emit('player-attacked');
      this.getPositions();
      if (this.game.attackCanDamageEnemy) {
        this.damageEnemysHealth(constants.attackDamageHealthAmount);
      }
    },
    playerShot() {
      // emit event that player has shot so enemy can react
      EventBus.$emit('player-shot');
      this.getPositions();
      if (this.game.shotCanDamageEnemy) {
        this.damageEnemysHealth(constants.shotDamageHealthAmount);
      }
      this.decreasePlayersSpecialAttack(constants.specialAttackDecreaseAmount);
    },
    enemyAttacked() {
      this.getPositions();
      if (this.game.attackCanDamagePlayer) {
        this.damagePlayersHealth(constants.attackDamageHealthAmount);
      }
    },
    enemyShot() {
      this.getPositions();
      if (this.game.shotCanDamagePlayer) {
        this.damagePlayersHealth(constants.shotDamageHealthAmount);
      }
      this.decreaseEnemysSpecialAttack(constants.specialAttackDecreaseAmount);
    },
    getPositions() {
      const positions = {
        enemy: {
          top: this.$refs.enemy.$el.offsetTop,
          left: this.$refs.enemy.$el.offsetLeft,
        },
        player: {
          top: this.$refs.player.$el.offsetTop,
          left: this.$refs.player.$el.offsetLeft,
        },
      };
      this.setPositions(positions);
    },
    gameCountdown() {
      this.timeLeft--;
      if (this.timeLeft >= 0) {
        setTimeout(() => {
          this.gameCountdown();
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.play-container {
  .overlay {
    opacity: 0.5;
    background: #000;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
    left: 0;
    position: fixed;
  }
  .overlay-content {
    width: 100%;
    height: 100%;
    z-index: 11;
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    .counter-number,
    .game-over,
    .paused {
      color: white;
      font-size: 3rem;
      opacity: 1;
    }
  }
  .game-world-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('~@/assets/worlds/boxingRing.jpg');
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
      height: 75%;
    }
  }
}
</style>
