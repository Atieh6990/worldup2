import { ROAST_CONFIG } from './config'

export function initWebViewShell() {
  if (!ROAST_CONFIG.WEBVIEW_MODE) return

  document.documentElement.classList.add('webview-mode')

  const meta = document.querySelector('meta[name="viewport"]')
  if (meta) {
    meta.setAttribute(
      'content',
      'width=' + ROAST_CONFIG.MENU_WIDTH +
      ', height=' + ROAST_CONFIG.MENU_HEIGHT +
      ', initial-scale=1, maximum-scale=1, user-scalable=no'
    )
  }
}
