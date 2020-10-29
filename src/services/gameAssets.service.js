import characters from '../assets/constants/characters';
import characterActions from '../assets/constants/characterActions';
import constants from '../assets/constants/common';
import store from '../store/index';

export default {
  assets: {},
  numOfLoadedAssets: 0,
  totalNumOfAssets() {
    return (
      Object.keys(characters).length *
        Object.keys(characterActions).length *
        Object.keys(constants.characterModes).length +
      Object.keys(characters).length *
        Object.keys(constants.characterModes).length
    );
  },
  loadGameAssets: function() {
    this.assets.characters = {};

    const characterModes = constants.characterModes;
    const characterTypes = Object.keys(characterModes);
    const availableCharacters = Object.keys(characters);
    const availableCharacterActions = Object.keys(characterActions);

    characterTypes.forEach(type => {
      this.assets.characters[characterModes[type]] = {};
      availableCharacters.forEach(character => {
        this.assets.characters[characterModes[type]][character] = {};
        // get profile pic
        const profilePic = new Image();
        profilePic.onload = () => {
          this.numOfLoadedAssets++;
          if (this.numOfLoadedAssets === this.totalNumOfAssets()) {
            store.commit('setAssetsLoaded', true);
          }
        }
        this.assets.characters[characterModes[type]][character].profilePic = profilePic;
        profilePic.src = require(`../assets/characters/${characterModes[type]}/${character}/profile.png`);

        // get all action sprites
        availableCharacterActions.forEach(action => {
          const actionSprite = new Image();
          actionSprite.onload = () => {
            this.numOfLoadedAssets++;
            if (this.numOfLoadedAssets === this.totalNumOfAssets()) {
              store.commit('setAssetsLoaded', true);
            }
          };
          this.assets.characters[characterModes[type]][character][
            action
          ] = actionSprite;
          actionSprite.src = require(`../assets/characters/${characterModes[type]}/${character}/${action}.png`);
        });
      });
    });
  }
};
