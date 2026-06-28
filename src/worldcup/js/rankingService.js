import api from '../api/api'

export function findSelfRankingEntry(list) {
  if (!Array.isArray(list)) return null
  return list.find(item => item && (item.self == 1 || item.self === '1')) || null
}

function isSelfEntry(item) {
  return !!(item && (item.self == 1 || item.self === '1'))
}

/** لیست نمایشی: ردیف self تکراری انتهای API حذف می‌شود؛ اگر کاربر در جایگاه واقعی لیست باشد می‌ماند */
export function buildRankingDisplayList(list) {
  if (!Array.isArray(list) || !list.length) return []

  const selfIndexes = list
    .map((item, index) => (isSelfEntry(item) ? index : -1))
    .filter(index => index >= 0)

  if (!selfIndexes.length) return list

  const lastIndex = list.length - 1
  const tailIsSelf = selfIndexes[selfIndexes.length - 1] === lastIndex

  if (tailIsSelf) {
    return list.slice(0, lastIndex)
  }

  return list
}

export function fetchRankingList() {
  return api.scores().then(data => {
    if (!data || data.success != 'true') {
      return []
    }
    return data.data || []
  }).catch(() => [])
}

export function fetchMyRankingEntry() {
  return fetchRankingList().then(list => findSelfRankingEntry(list))
}

export function fetchMyTotalScore() {
  return fetchMyRankingEntry().then(entry => {
    if (!entry || entry.score == null) return ''
    return entry.score
  })
}
