import IScroll from './iscroll'

/**
 * گزینه‌های مشترک IScroll — بدون translateZ اضافی روی scroller
 * (تداخل با webview paint و شکستن transform اسکرول در WebView قدیمی)
 */
export const SCROLL_OPTIONS = {
  scrollY: true,
  scrollX: false,
  scrollbars: false,
  momentum: true,
  preventDefault: true,
  preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
  mouseWheel: true,
  mouseMove: true,
  bounce: false,
  click: false,
  HWCompositing: false,
  useTransition: true,
  useTransform: true,
}

export function isLegacyScrollDevice() {
  if (typeof window === 'undefined' || !window.navigator) return false
  var ua = window.navigator.appVersion || ''
  var isBadAndroid = /Android /.test(ua) && !(/Chrome\/\d/.test(ua))
  var webKitMatch = ua.match(/AppleWebKit\/(\d+)/)
  var isOldWebKit = !!(webKitMatch && parseInt(webKitMatch[1], 10) < 537)
  return isBadAndroid || isOldWebKit
}

function buildScrollOptions(extraOptions) {
  var base = SCROLL_OPTIONS
  if (isLegacyScrollDevice()) {
    base = Object.assign({}, SCROLL_OPTIONS, {
      useTransform: false,
      useTransition: false,
      HWCompositing: false,
    })
  }
  return extraOptions ? Object.assign({}, base, extraOptions) : base
}

export function createVerticalScroll(el, extraOptions) {
  const node = typeof el === 'string' ? document.querySelector(el) : el
  if (!node) return null
  const scroll = new IScroll(node, buildScrollOptions(extraOptions))
  refreshVerticalScroll(scroll)
  return scroll
}

export function refreshVerticalScroll(scroll) {
  if (!scroll) return
  scroll.refresh()
  setTimeout(function () {
    if (scroll) scroll.refresh()
  }, 300)
}

export function destroyVerticalScroll(scroll) {
  if (!scroll) return null
  scroll.destroy()
  return null
}

export function scrollMoveDown(scroll, step) {
  if (!scroll) return
  scroll.moveDown(step || 80)
}

export function scrollMoveUp(scroll, step) {
  if (!scroll) return
  scroll.moveUp(step || 80)
}

/** اسکرول محدود به ابتدا/انتهای محتوا — برای صفحه راهنما */
export function scrollStepDown(scroll, step) {
  if (!scroll || !scroll.hasVerticalScroll) return false
  if (scroll.y <= scroll.maxScrollY) return false
  const delta = step || 80
  const nextY = Math.max(scroll.y - delta, scroll.maxScrollY)
  scroll.scrollTo(0, nextY, 300)
  return true
}

export function scrollStepUp(scroll, step) {
  if (!scroll || !scroll.hasVerticalScroll) return false
  if (scroll.y >= 0) return false
  const delta = step || 80
  const nextY = Math.min(scroll.y + delta, 0)
  scroll.scrollTo(0, nextY, 300)
  return true
}
