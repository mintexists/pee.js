const widthMap = new WeakMap()
const heightMap = new WeakMap()

class ImageData {
  constructor (width, height, ...args) {
    if (arguments.length < 2) {
      throw new TypeError(`Failed to construct 'ImageData': 2 arguments required, but only ${arguments.length} present.`)
    }

    if (typeof width === 'object') {
      if (!(width instanceof Uint8ClampedArray)) {
        throw new TypeError(`Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'.`)
      }

      if (typeof height !== 'number' || height === 0) {
        throw new Error(`Failed to construct 'ImageData': The source width is zero or not a number.`)
      }

      height = height >>> 0

      if ((height * 4) > width.length) {
        throw new Error(`Failed to construct 'ImageData': The requested image size exceeds the supported range.`)
      }

      if ((width.length % 4) !== 0) {
        throw new Error(`Failed to construct 'ImageData': The input data length is not a multiple of 4.`)
      }

      if ((width.length % (4 * height)) !== 0) {
        throw new Error(`Failed to construct 'ImageData': The input data length is not a multiple of (4 * width).`)
      }

      if (typeof args[0] !== 'undefined') {
        if (typeof args[0] !== 'number' || args[0] === 0) {
          throw new Error(`Failed to construct 'ImageData': The source height is zero or not a number.`)
        }

        args[0] = args[0] >>> 0

        if ((width.length % (4 * height * args[0])) !== 0) {
          throw new Error(`Failed to construct 'ImageData': The input data length is not equal to (4 * width * height).`)
        }
      }

      widthMap.set(this, height)
      heightMap.set(this, typeof args[0] !== 'undefined' ? args[0] : (width.byteLength / height / 4))
      Object.defineProperty(this, 'data', { configurable: true, enumerable: true, value: width, writable: false })
    } else {
      if (typeof width !== 'number' || width === 0) {
        throw new Error(`Failed to construct 'ImageData': The source width is zero or not a number.`)
      }

      width = width >>> 0

      if (typeof height !== 'number' || height === 0) {
        throw new Error(`Failed to construct 'ImageData': The source height is zero or not a number.`)
      }

      height = height >>> 0

      if ((width * height) >= (1 << 30)) {
        throw new Error(`Failed to construct 'ImageData': The requested image size exceeds the supported range.`)
      }

      widthMap.set(this, width)
      heightMap.set(this, height)
      Object.defineProperty(this, 'data', { configurable: true, enumerable: true, value: new Uint8ClampedArray(width * height * 4), writable: false })
    }
  }
}

Object.defineProperty(ImageData.prototype, 'width', {
  enumerable: true,
  configurable: true,
  get () { return widthMap.get(this) }
})

Object.defineProperty(ImageData.prototype, 'height', {
  enumerable: true,
  configurable: true,
  get () { return heightMap.get(this) }
})

module.exports = ImageData
