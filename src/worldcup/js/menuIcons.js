import { ROAST_CONFIG } from './config'
import { resolveAssetPath } from './wImgUrl'

const hoverLocal = require('../assets/images/menu/hover.png')
const myScoreLocal = require('../assets/images/menu/myScore.png')

const MENU_ICON_LOCAL = {
  0: require('../assets/images/menu/0.png'),
  1: require('../assets/images/menu/1.png'),
  2: require('../assets/images/menu/2.png'),
  3: require('../assets/images/menu/3.png'),
  4: require('../assets/images/menu/4.png'),
  5: require('../assets/images/menu/5.png'),
  6: require('../assets/images/menu/6.png'),
}

export const MENU_HOVER_ICON = resolveAssetPath(
  'menu/hover.png',
  ROAST_CONFIG.DEVELOP_MODE,
  ROAST_CONFIG.WImgUrl,
  hoverLocal,
)

export const MY_SCORE_ICON = resolveAssetPath(
  'menu/myScore.png',
  ROAST_CONFIG.DEVELOP_MODE,
  ROAST_CONFIG.WImgUrl,
  myScoreLocal,
)

export function getMenuIconPath(id) {
  const iconId = id > 6 ? (id % 7) : id
  const local = MENU_ICON_LOCAL[iconId] || MENU_ICON_LOCAL[0]
  return resolveAssetPath(
    `menu/${iconId}.png`,
    ROAST_CONFIG.DEVELOP_MODE,
    ROAST_CONFIG.WImgUrl,
    local,
  )
}

export function getSamLogoPath() {
  return resolveAssetPath(
    'menu/sam.png',
    ROAST_CONFIG.DEVELOP_MODE,
    ROAST_CONFIG.WImgUrl,
    require('../assets/images/menu/sam.png'),
  )
}
