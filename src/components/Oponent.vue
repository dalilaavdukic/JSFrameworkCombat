<template>
  <moveable-character
    ref="moveableCharacter"
    :character="character"
    :modification="characterType"
    @animationStarted="setEnemysAnimation($event)"
    :characterType="characterType"
  ></moveable-character>
</template>
<script>
import MoveableCharacter from '@/components/MoveableCharacter';
import constants from '@/assets/constants/common';
import EventBus from '@/utils/eventBus';
import characterActions from '@/assets/constants/characterActions';
import { mapGetters, mapMutations } from 'vuex';

const availableActionsForEvadingAttacks = ['roll', 'slide', 'jump'];

export default {
  name: 'Oponent',
  components: { MoveableCharacter },
  props: {
    character: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      characterRef: undefined,
      fightInterval: undefined,
      characterType: constants.characterModes.enemy,
    };
  },
  computed: {
    ...mapGetters(['enemy', 'player', 'game', 'positions', 'distance']),
    canFight: function () {
      return (
        !this.game.over &&
        this.enemy.currentAnimation !== characterActions.dizzy &&
        this.enemy.currentAnimation !== characterActions.takeDamage
      );
    },
    alreadyAttacking: function () {
      return (
        this.enemy.currentAnimation === characterActions.attack ||
        this.enemy.currentAnimation === characterActions.shoot
      );
    },
    evadingAttack: function () {
      return (
        this.enemy.currentAnimation === characterActions.roll ||
        this.enemy.currentAnimation === characterActions.slide ||
        this.enemy.currentAnimation === characterActions.jump
      );
    },
    playerSide: function () {
      return this.game.distance > 0
        ? constants.side.left
        : constants.side.right;
    },
  },
  mounted() {
    this.characterRef = this.$refs.moveableCharacter;
    // wait for game countdown to finish before initiating enemy actions
    setTimeout(() => {
      this.fightInterval = setInterval(() => {
        this.$emit('positionRequest');
      }, constants.oponentFightInterval);
    }, constants.countdownToGameSeconds * 1000);

    EventBus.$on('enemy-died', () => {
      this.characterRef.die();
      clearInterval(this.fightInterval);
    });
    EventBus.$on('player-died', () => {
      clearInterval(this.fightInterval);
    });
    EventBus.$on('enemy-dizzy', () => {
      this.characterRef.dizzy();
    });
    EventBus.$on('player-attacked', () => {
      this.reactToPlayerAttack();
    });
    EventBus.$on('player-shot', () => {
      this.reactToPlayerShot();
    });
    EventBus.$on('enemy-damaged', () => {
      const attackSide =
        this.distance > 0 ? constants.side.left : constants.side.right;
      this.characterRef.takeDamage(attackSide);
    });
  },
  destroyed() {
    clearInterval(this.fightInterval);
  },
  watch: {
    positions: function () {
      if (!this.alreadyAttacking && !this.evadingAttack && !this.game.paused) {
        this.fight();
      }
    },
  },
  methods: {
    ...mapMutations(['setEnemysAnimation', 'setEnemysFacingDirection']),
    fight() {
      if (this.canFight) {
        // enemy is facing away from player
        if (!this.game.enemyIsFacingPlayer) {
          // turn around
          this.playerSide === constants.side.right
            ? this.moveRight()
            : this.moveLeft();
        }
        if (this.enemy.canUseSpecialAttack) {
          this.shoot();
          return;
        }
        this.attemptAttack();
      }
    },
    attemptAttack() {
      // enemy is close enough to player to attack
      if (
        Math.abs(this.game.distance) <= constants.minimumAttackDamageDistance
      ) {
        this.attack();
      } else {
        // enemy needs to move closer to player
        this.playerSide === constants.side.right
          ? this.moveRight()
          : this.moveLeft();
      }
    },
    attack() {
      this.characterRef.attack();
      this.$emit('attack');
    },
    shoot() {
      this.characterRef.shoot();
      this.$emit('shoot');
    },
    moveLeft() {
      this.characterRef.moveLeft();
      this.setEnemysFacingDirection(this.characterRef.facingDirection());
    },
    moveRight() {
      this.characterRef.moveRight();
      this.setEnemysFacingDirection(this.characterRef.facingDirection());
    },
    shouldEvadeAttack() {
      return this.canFight && Math.random() < 0.35;
    },
    reactToPlayerShot() {
      if (!this.evadingAttack && this.shouldEvadeAttack()) {
        this.executeAttackEvasion();
      }
    },
    reactToPlayerAttack() {
      if (
        Math.abs(this.game.distance) <= constants.minimumAttackDamageDistance
      ) {
        if (!this.evadingAttack && this.shouldEvadeAttack()) {
          this.executeAttackEvasion();
        }
      }
    },
    executeAttackEvasion() {
      const response = this.getRandomAttackResponse();
      switch (response) {
        case 'roll':
          this.characterRef.roll();
          break;
        case 'slide':
          this.characterRef.slide();
          break;
        case 'jump':
          this.characterRef.jump();
          break;
      }
    },
    getRandomAttackResponse() {
      const arrayIndex = Math.round(
        Math.random() * (availableActionsForEvadingAttacks.length - 1)
      );
      return availableActionsForEvadingAttacks[arrayIndex];
    },
  },
};
</script>