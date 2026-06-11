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
