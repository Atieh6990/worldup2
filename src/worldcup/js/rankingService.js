import api from '../api/api'

export function findSelfRankingEntry(list) {
  if (!Array.isArray(list)) return null
  return list.find(item => item && (item.self == 1 || item.self === '1')) || null
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
