const localImgContext = require.context('../assets/images', true, /\.(png|gif|jpe?g|svg)$/i)
const localImagesByName = {}

function toAssetUrl(module) {
  if (!module) return ''
  if (typeof module === 'string') return module
  if (module.default) return module.default
  return module
}

localImgContext.keys().forEach((key) => {
  const url = toAssetUrl(localImgContext(key))
  const fileName = key.split('/').pop()
  const relPath = key.replace(/^\.\//, '')

  localImagesByName[fileName] = url
  localImagesByName[fileName.toLowerCase()] = url
  localImagesByName[relPath] = url
  localImagesByName[relPath.toLowerCase()] = url
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
  return ''
}

export function resolveWImg(fileName, developMode, remoteBase) {
  const local = getLocalImage(fileName)
  if (developMode == 1) {
    if (local) return local
    if (isGif(fileName)) return ''
    console.warn('[wImg] developMode: فایل لوکال یافت نشد →', fileName)
    return ''
  }
  if (local) return local
  return remoteBase + fileName
}
