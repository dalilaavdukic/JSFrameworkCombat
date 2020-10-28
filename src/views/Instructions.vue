<template>
  <div class="game-view">
    <game-header>How to play this game</game-header>
    <div class="game-instructions">
      <div class="instructions">
        <h2>Instructions</h2>
        <div>
          Choose your favourite JS framework and let it face off against other
          JS frameworks and see who wins! <br /><br />
          The character who's health (upper bar, yellow) first reaches 0,
          looses.<br /><br />
          You can decrease your oponent's health by attacking them with a knife
          or shooting at them.<br /><br />
          Attacking with a knife is always available, but causes less damage to
          your oponen't health than shooting. In order to cause damage with a
          knife attack you have to come close to your oponent.<br /><br />
          The colored bar bellow the health bar indicates when shooting is
          available. Shooting can be performed from a distance and it causes
          significantly more damage to your oponent than attacking with a
          knife. So be aware of your oponent's special attack bar! <br /><br />
          In order to evade attacks by your oponent and safe your character's
          health from being affected, you can roll, slide, jump or stay away
          from your oponent (for knife attacks).<br /><br />
          Let's play!
        </div>
      </div>
      <div class="controls">
        <h2>Controls</h2>
        <div v-for="(instruction, index) in instructions" :key="index">
          {{ instruction.sectionTitle }}:
          <div class="control-details">
            <div class="action">
              <div
                v-for="(control, action) in instruction.controls"
                :key="action"
              >
                {{ action }}
              </div>
            </div>
            <div class="control">
              <div
                v-for="(control, action) in instruction.controls"
                :key="action"
              >
                {{ control }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameHeader from '@/components/GameHeader';
import instructions from '@/assets/constants/instructions.js';

export default {
  name: 'Instructions',
  components: {
    GameHeader,
  },
  data() {
    return {
      instructions: instructions,
    };
  },
};
</script>

<style lang="scss" scoped>
.game-instructions {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .controls,
  .instructions {
    max-width: 400px;
    min-width: 350px;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem;
    border-radius: $border-radius;
    border: solid 1px $js-yellow;
    padding: 0rem 2rem;
    padding-bottom: 1rem;
    h2 {
      color: white;
    }
  }
  .instructions {
    margin-right: 1rem;
    max-width: 600px;
  }
  .controls {
    margin-left: 1rem;
    .control-details {
      margin: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      .action {
        color: white;
      }
      .control {
        text-align: right;
      }
    }
  }
}
</style>
