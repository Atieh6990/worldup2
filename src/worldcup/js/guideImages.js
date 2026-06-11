import { ROAST_CONFIG } from './config'
import { resolveAssetPath } from './wImgUrl'

export const GUIDE_POSTER_IMG = resolveAssetPath(
  'guide/rahnamaBack.png',
  ROAST_CONFIG.DEVELOP_MODE,
  ROAST_CONFIG.WImgUrl,
  require('../assets/images/guide/rahnamaBack.png'),
)

export const GUIDE_CONTENT_IMG = ROAST_CONFIG.resolveWImg('guide/rahnama.png')
