import api from '../api/api'

export function fetchUpcomingMatches() {
  return api.aparatUpcomingMatches()
}

export function fetchLiveMatches() {
  return api.aparatLiveMatches()
}
