export function gregorianToJalali(gy, gm, gd) {
  const gDaysInMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  let jy = gy <= 1600 ? 0 : 979
  gy -= gy <= 1600 ? 621 : 1600
  const gy2 = gm > 2 ? gy + 1 : gy
  let days = (365 * gy)
    + Math.floor((gy2 + 3) / 4)
    - Math.floor((gy2 + 99) / 100)
    + Math.floor((gy2 + 399) / 400)
    - 80
    + gd
    + gDaysInMonth[gm - 1]

  jy += 33 * Math.floor(days / 12053)
  days %= 12053
  jy += 4 * Math.floor(days / 1461)
  days %= 1461

  if (days > 365) {
    jy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }

  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30)
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30)
  return [jy, jm, jd]
}

export function formatGregorianDateToJalali(date) {
  if (!date || isNaN(date.getTime())) return ''
  const [jy, jm, jd] = gregorianToJalali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  )
  const pad = (n) => String(n).padStart(2, '0')
  return `${jy}/${pad(jm)}/${pad(jd)} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
const JALALI_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
]

export function toLatinDigits(value) {
  return String(value).replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
}

export function getTodayJalaliParts(date) {
  const d = date || new Date()
  const [jy, jm, jd] = gregorianToJalali(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  )
  return { jy, jm, jd }
}

export function formatJalaliDateKey(jy, jm, jd) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${jy}/${pad(jm)}/${pad(jd)}`
}

function parseJalaliDateKey(value) {
  if (!value) return null
  const normalized = toLatinDigits(String(value).trim().split(' ')[0])
  const parts = normalized.split('/')
  if (parts.length < 3) return null
  const jy = parseInt(parts[0], 10)
  const jm = parseInt(parts[1], 10)
  const jd = parseInt(parts[2], 10)
  if (isNaN(jy) || isNaN(jm) || isNaN(jd)) return null
  return { jy, jm, jd }
}

function isSameJalaliDay(a, b) {
  return a && b && a.jy === b.jy && a.jm === b.jm && a.jd === b.jd
}

function titleMatchesJalaliDay(title, jm, jd) {
  if (!title) return false
  const monthName = JALALI_MONTHS[jm - 1]
  if (!monthName || !String(title).includes(monthName)) return false
  const dayCandidates = [String(jd), String(jd).padStart(2, '0')]
  return dayCandidates.some((day) => {
    const pattern = new RegExp('(?:^|[\\s،,])' + day + '\\s*' + monthName)
    return pattern.test(String(title))
  })
}

function groupMatchesJalaliDay(group, jy, jm, jd) {
  if (!group) return false
  const today = { jy, jm, jd }

  if (group.date && isSameJalaliDay(parseJalaliDateKey(group.date), today)) return true
  if (group.shamsi_date && isSameJalaliDay(parseJalaliDateKey(group.shamsi_date), today)) return true
  if (group.title && titleMatchesJalaliDay(group.title, jm, jd)) return true

  const matches = group.match || group.matches || []
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i] && matches[i].starttime
    if (start && isSameJalaliDay(parseJalaliDateKey(start), today)) return true
  }
  return false
}

function groupJalaliSortKey(group) {
  if (!group) return null
  if (group.date) return parseJalaliDateKey(group.date)
  const matches = group.match || group.matches || []
  if (matches.length && matches[0].starttime) {
    return parseJalaliDateKey(matches[0].starttime)
  }
  return null
}

function compareJalaliDays(a, b) {
  if (!a || !b) return 0
  if (a.jy !== b.jy) return a.jy - b.jy
  if (a.jm !== b.jm) return a.jm - b.jm
  return a.jd - b.jd
}

export function findTodayGroupIndex(dailyGroups) {
  if (!dailyGroups) return 0

  const len = Object.keys(dailyGroups).length
  if (!len) return 0

  const today = getTodayJalaliParts()
  let nearestFuture = -1
  let nearestFutureDiff = Infinity

  for (let i = 0; i < len; i++) {
    const group = dailyGroups[i]
    if (groupMatchesJalaliDay(group, today.jy, today.jm, today.jd)) {
      return i
    }

    const groupDay = groupJalaliSortKey(group)
    if (groupDay) {
      const diff = compareJalaliDays(groupDay, today)
      if (diff >= 0 && diff < nearestFutureDiff) {
        nearestFuture = i
        nearestFutureDiff = diff
      }
    }
  }

  if (nearestFuture >= 0) return nearestFuture
  return 0
}
