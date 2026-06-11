const localImgContext = require.context('../assets/images', true, /\.(png|gif|jpe?g|svg)$/i)
const localImagesByName = {}
const localImagesByRelPath = {}

function toAssetUrl(module) {
  if (!module) return ''
  if (typeof module === 'string') return module
  if (module.default) return module.default
  return module
}

function buildStaticPath(relPath) {
  return `./img/${relPath}`
}

function buildRemoteUrl(fileName, remoteBase) {
  if (!fileName) return ''
  const path = fileName.replace(/^\//, '')
  return remoteBase + path
}

localImgContext.keys().forEach((key) => {
  const relPath = key.replace(/^\.\//, '')
  const fileName = key.split('/').pop()
  const devUrl = toAssetUrl(localImgContext(key))
  const staticUrl = process.env.NODE_ENV === 'production'
    ? buildStaticPath(relPath)
    : devUrl

  localImagesByRelPath[relPath] = staticUrl
  localImagesByRelPath[relPath.toLowerCase()] = staticUrl
  localImagesByName[fileName] = staticUrl
  localImagesByName[fileName.toLowerCase()] = staticUrl
  localImagesByName[relPath] = staticUrl
  localImagesByName[relPath.toLowerCase()] = staticUrl
})

function isGif(fileName) {
  return /\.gif$/i.test(fileName)
}

function getLocalImage(fileName) {
  if (!fileName) return ''
  const baseName = fileName.split('/').pop()
  const keys = [
    fileName,
    fileName.toLowerCase(),
    baseName,
    baseName.toLowerCase(),
  ]
  for (let i = 0; i < keys.length; i++) {
    if (localImagesByName[keys[i]]) {
      return localImagesByName[keys[i]]
    }
  }

  const relMatches = Object.keys(localImagesByRelPath).filter((relPath) => {
    return relPath === fileName
      || relPath.toLowerCase() === fileName.toLowerCase()
      || relPath.split('/').pop() === baseName
  })

  if (relMatches.length > 0) {
    const preferred = relMatches.find((relPath) => relPath.startsWith('scores/'))
      || relMatches.find((relPath) => relPath.startsWith('winner/'))
      || relMatches.find((relPath) => relPath.startsWith('menu/'))
      || relMatches[0]
    return localImagesByRelPath[preferred]
  }

  return ''
}

function getRemoteImagePath(fileName) {
  if (!fileName) return ''
  if (fileName.includes('/')) return fileName.replace(/^\//, '')

  const baseName = fileName.split('/').pop()
  const relMatches = Object.keys(localImagesByRelPath).filter((relPath) => {
    return relPath === fileName
      || relPath.toLowerCase() === fileName.toLowerCase()
      || relPath.split('/').pop() === baseName
  })

  if (relMatches.length > 0) {
    return relMatches.find((relPath) => relPath.startsWith('scores/'))
      || relMatches.find((relPath) => relPath.startsWith('winner/'))
      || relMatches.find((relPath) => relPath.startsWith('menu/'))
      || relMatches[0]
  }

  return fileName.replace(/^\//, '')
}

export function resolveWImg(fileName, developMode, remoteBase) {
  if (developMode == 0) {
    return buildRemoteUrl(getRemoteImagePath(fileName), remoteBase)
  }

  const local = getLocalImage(fileName)
  if (local) return local
  if (isGif(fileName)) return ''
  console.warn('[wImg] developMode: فایل لوکال یافت نشد →', fileName)
  return ''
}

export function resolveAssetPath(relPath, developMode, remoteBase, localModule) {
  const normalized = String(relPath || '').replace(/^\//, '')
  if (developMode == 0) {
    return buildRemoteUrl(normalized, remoteBase)
  }
  return toAssetUrl(localModule)
}

export function resolveTeamImageUrl(path, baseUrl) {
  if (!path) return ''
  const value = String(path).trim()
  if (!value) return ''
  if (/^https?:\/\//i.test(value)) return value
  const base = baseUrl || ''
  return base + value.replace(/^\//, '')
}
