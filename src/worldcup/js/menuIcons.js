export const MENU_HOVER_ICON = require('../assets/images/menu/hover.png')
export const MY_SCORE_ICON = require('../assets/images/menu/myScore.png')

const MENU_ICONS = {
  0: require('../assets/images/menu/0.png'),
  1: require('../assets/images/menu/1.png'),
  2: require('../assets/images/menu/2.png'),
  3: require('../assets/images/menu/3.png'),
  4: require('../assets/images/menu/4.png'),
  5: require('../assets/images/menu/5.png'),
  6: require('../assets/images/menu/6.png'),
}

export function getMenuIconPath(id) {
  let iconId = id > 6 ? (id % 7) : id
  return MENU_ICONS[iconId] || MENU_ICONS[0]
}
