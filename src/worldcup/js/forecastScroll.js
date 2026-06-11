import IScroll from './iscroll'
import { SCROLL_OPTIONS } from './scrollHelper'

export const FORECAST_SCROLL_DURATION = 400

export const FORECAST_SCROLL_OPTIONS = Object.assign({}, SCROLL_OPTIONS, {
  mouseWheel: false,
})

const scrollEasing = IScroll.utils.ease.quadratic

export function createForecastScroll(el) {
  return new IScroll(el, FORECAST_SCROLL_OPTIONS)
}

export function refreshForecastScroll(scroll) {
  if (!scroll) return
  scroll.refresh()
  setTimeout(() => {
    if (scroll) scroll.refresh()
  }, 300)
}

export function scrollForecastToElement(scroll, selector) {
  if (!scroll) return
  scroll.refresh()
  scroll.scrollToElement(
    selector,
    FORECAST_SCROLL_DURATION,
    false,
    true,
    scrollEasing,
  )
}
