import api from '../api/api'
import { ROAST_CONFIG } from './config'
import { formatGregorianDateToJalali } from './jalaliDate'

const ISPORT_6_PATTERN = /اسپرت\s*6|اسپورت\s*6/i

export function getReactLivePosterUrl() {
  return ROAST_CONFIG.resolveWImg('ligue.jpg')
}

export function parseHamsamDateTime(value) {
  if (!value) return null
  const normalized = String(value).trim().replace(' ', 'T')
  const date = new Date(normalized)
  return isNaN(date.getTime()) ? null : date
}

export function formatHamsamDateTime(value) {
  const date = parseHamsamDateTime(value)
  if (!date) return String(value || '')
  return formatGregorianDateToJalali(date)
}

export function isLivePlayable(live, now) {
  if (!live) return false
  const current = now || new Date()
  const start = parseHamsamDateTime(live.start)
  const end = parseHamsamDateTime(live.end)
  if (!start || !end) return true
  return current >= start && current <= end
}

export function getLiveUnavailableMessage(live) {
  const start = formatHamsamDateTime(live && live.start)
  const end = formatHamsamDateTime(live && live.end)
  if (start && end) {
    return `این شبکه از ${start} تا ${end} قابل مشاهده خواهد بود.`
  }
  return 'این شبکه در بازه زمانی اعلام‌شده قابل مشاهده خواهد بود.'
}

export function buildHamsamPlayPayload(live) {
  const playable = isLivePlayable(live)
  return {
    video: live && live.link ? live.link : '',
    poster: getReactLivePosterUrl(),
    message: playable ? '' : getLiveUnavailableMessage(live),
    playable,
  }
}

export function buildHamsamPlayMessage(live) {
  const payload = buildHamsamPlayPayload(live)
  return {
    type: 'playVideo',
    data: {
      video: payload.video,
      poster: payload.poster,
      message: payload.message,
    },
  }
}

export function findISport6Live(lives) {
  if (!Array.isArray(lives)) return null
  return lives.find((item) => {
    const title = item && item.title ? String(item.title) : ''
    return ISPORT_6_PATTERN.test(title)
  }) || null
}

export function fetchISport6Live() {
  return api.hamsamLives().then((lives) => findISport6Live(lives))
}

export function fetchHamsamLivesList() {
  return api.hamsamLives().then((lives) => (Array.isArray(lives) ? lives : []))
}
