export default {
  characterModes: {
    player: 'players',
    enemy: 'enemies'
  },
  jumpHeight: 200,
  runSpeed: 200,
  runDuration: '0.8s',
  slideSpeed: 100,
  slideDuration: '0.3s',
  rollSpeed: 100,
  rollDuration: '0.3s',
  damageSpeed: 50,
  damageDuration: '0.2s',
  jumpDuration: 400, // ms
  playAreaBorderLimitOffset: 100,
  minimumAttackDamageDistance: 140,
  attackDamageHealthAmount: 5,
  shotDamageHealthAmount: 20,
  specialAttackIncreaseAmount: 10,
  specialAttackDecreaseAmount: 50,
  specialAttackMaxValue: 100,
  dizzinessDuration: 3000, // ms
  dizzyHealth: 25,
  specialAttackIncreaseInterval: 1500, // ms
  opponentFightInterval: 800, // ms
  damageHeight: 150,
  countdownToGameSeconds: 5,
  side: {
    right: 'right',
    left: 'left'
  }
};
