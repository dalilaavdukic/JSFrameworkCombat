export default {
  right: 39, // '-> arrow key', // run right
  left: 37, // '<- arrow key', // run left (add enemy modification)
  jump: 38, // 'up arrow key', // jump, and move up
  sliding: 40, // 'down arrow key', // roll and move forward,
  attack: 65, // 'a', // play attack animation, if close to other character decrease health (calculate position with getBoundingClientRect)
  shoot: 83, // 's', // play shoot animation, if on same height in facing correct direction decrease health
  roll: 68, //'d', // play roll animation, move forwward, decrease health if colides with other character
}