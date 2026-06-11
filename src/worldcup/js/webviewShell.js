import { ROAST_CONFIG } from './config'

export function isReactNativeWebView() {
  return typeof window !== 'undefined' && !!window.ReactNativeWebView
}

export function initWebViewShell() {
  if (!ROAST_CONFIG.WEBVIEW_MODE) return

  const root = document.documentElement
  root.classList.add('webview-mode')

  const meta = document.querySelector('meta[name="viewport"]')

  // داخل RN: scale از index.html می‌آید — viewport و عرض پنل را دست نزن
  if (isReactNativeWebView()) {
    root.classList.add('webview-native-shell')
    return
  }

  if (meta) {
    meta.setAttribute(
      'content',
      'width=' + ROAST_CONFIG.MENU_WIDTH +
      ', height=' + ROAST_CONFIG.MENU_HEIGHT +
      ', initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'
    )
  }
}

export function repaintWebViewPanel() {
  if (!isReactNativeWebView()) return
  const root = document.documentElement
  root.style.display = 'none'
  // eslint-disable-next-line no-unused-expressions
  root.offsetHeight
  root.style.display = ''
}
