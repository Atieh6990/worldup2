export function parseDigitKey(event) {
  if (!event) return null

  const keyCode = event.keyCode
  if (keyCode >= 96 && keyCode <= 105) {
    return keyCode - 96
  }
  if (keyCode >= 48 && keyCode <= 57) {
    return keyCode - 48
  }

  const key = event.key
  if (typeof key === 'string' && /^[0-9]$/.test(key)) {
    return parseInt(key, 10)
  }

  return null
}

export function consumeNumericKey(event) {
  if (!event || event.repeat) return null

  const digit = parseDigitKey(event)
  if (digit !== null) {
    event.preventDefault()
    event.stopPropagation()
    return digit
  }

  if (isBackspaceKey(event)) {
    event.preventDefault()
    event.stopPropagation()
    return -1
  }

  return null
}

export function isBackspaceKey(event) {
  if (!event) return false
  const keyCode = event.keyCode
  return keyCode === 8 || keyCode === 46
}
