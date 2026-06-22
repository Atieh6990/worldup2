const TOKEN_COOKIE_NAME = 'Tokenw'
const TOKEN_STORAGE_KEY = 'Tokenw'
const COOKIE_MAX_AGE_DAYS = 30

export function setTokenCookie(value) {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setDate(expires.getDate() + COOKIE_MAX_AGE_DAYS)
  const encoded = encodeURIComponent(value || '')
  document.cookie = `${TOKEN_COOKIE_NAME}=${encoded};path=/;expires=${expires.toUTCString()};SameSite=Lax`
}

export function getTokenCookie() {
  if (typeof document === 'undefined') return null
  const pattern = new RegExp('(?:^|; )' + TOKEN_COOKIE_NAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)')
  const match = document.cookie.match(pattern)
  return match ? decodeURIComponent(match[1]) : null
}

export function removeTokenCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${TOKEN_COOKIE_NAME}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax`
}

/** همگام‌سازی کوکی → localStorage هنگام باز شدن WebView */
export function hydrateTokenFromCookie() {
  if (typeof localStorage === 'undefined') return
  try {
    const existing = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (existing) return
    const fromCookie = getTokenCookie()
    if (fromCookie) {
      localStorage.setItem(TOKEN_STORAGE_KEY, fromCookie)
    }
  } catch (e) {}
}

export function persistDevelopToken(key, value) {
  if (key !== TOKEN_STORAGE_KEY) return
  if (value) {
    setTokenCookie(value)
  } else {
    removeTokenCookie()
  }
}

export function saveToken(value) {
  if (typeof localStorage === 'undefined') return
  const serialized = typeof value === 'string' ? value : JSON.stringify(value)
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, serialized)
    setTokenCookie(serialized)
  } catch (e) {}
}

export function loadTokenRaw() {
  if (typeof localStorage === 'undefined') return null
  try {
    let stored = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (stored) return stored
    const fromCookie = getTokenCookie()
    if (fromCookie) {
      localStorage.setItem(TOKEN_STORAGE_KEY, fromCookie)
      return fromCookie
    }
  } catch (e) {}
  return null
}

export function loadToken() {
  const raw = loadTokenRaw()
  if (!raw || raw === 'null' || raw === '') return null
  try {
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

export function getAccessToken() {
  const token = loadToken()
  return token && token.access_token ? token.access_token : ''
}

export function isTokenValid(token) {
  if (!token || !token.access_token) return false
  const exp = Number(token.expires_in)
  if (!exp || Number.isNaN(exp)) return true
  const now = Date.now()
  if (exp > 1e12) return now < exp
  if (exp > 1e9) return now < exp * 1000
  return true
}

export function hasValidStoredToken() {
  return isTokenValid(loadToken())
}

export function clearStoredToken() {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch (e) {}
  }
  removeTokenCookie()
}
