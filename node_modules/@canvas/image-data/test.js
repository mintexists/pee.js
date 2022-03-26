/* eslint-env mocha */

const ImageData = (typeof window === 'object' ? window.ImageData : require('./index.js'))

const assert = (condition) => { if (!condition) throw new Error('Assertion failed') }
const assertThrows = (fn, condition) => { try { fn() } catch (err) { return assert(condition(err)) }; throw new Error('Function did not throw') }

const isStrict = (function () { return !this })()
const getRGBA = (data, idx) => `${data[(idx * 4)]},${data[(idx * 4) + 1]},${data[(idx * 4) + 2]},${data[(idx * 4) + 3]}`
const setRGBA = (data, idx, color) => data.set(color.split(',').map(Number), idx * 4)

assert(typeof ImageData === 'function')
assert(ImageData.length === 2)

{
  const img = new ImageData(10, 10)

  assert(typeof img === 'object')
  assert(img.width === 10)
  assert(img.height === 10)
  assert(img.data instanceof Uint8ClampedArray)
  assert(img.data.length === 400)
  assert(getRGBA(img.data, 4) === '0,0,0,0')

  setRGBA(img.data, 4, '0,255,255,128')
  assert(getRGBA(img.data, 4) === '0,255,255,128')
}

{
  const arr = new Uint8ClampedArray(24)
  const img = new ImageData(arr, 2)

  assert(typeof img === 'object')
  assert(img.width === 2)
  assert(img.height === 3)
  assert(img.data === arr)
}

{
  const arr = new Uint8ClampedArray(28)
  const img = new ImageData(arr, 7)

  assert(typeof img === 'object')
  assert(img.width === 7)
  assert(img.height === 1)
  assert(img.data === arr)
}

{
  const arr = new Uint8ClampedArray(28)
  const img = new ImageData(arr, 7, undefined)

  assert(typeof img === 'object')
  assert(img.width === 7)
  assert(img.height === 1)
  assert(img.data === arr)
}

{
  const arr = new Uint8ClampedArray(24)
  const img = new ImageData(arr, 2, 3)

  assert(typeof img === 'object')
  assert(img.width === 2)
  assert(img.height === 3)
  assert(img.data === arr)
}

{
  const img = new ImageData(100, 50)

  assertThrows(() => new ImageData(), err => err.name === 'TypeError' && err.message === `Failed to construct 'ImageData': 2 arguments required, but only 0 present.`)
  assertThrows(() => new ImageData(10), err => err.name === 'TypeError' && err.message === `Failed to construct 'ImageData': 2 arguments required, but only 1 present.`)
  assertThrows(() => new ImageData(new Uint8ClampedArray(0)), err => err.name === 'TypeError' && err.message === `Failed to construct 'ImageData': 2 arguments required, but only 1 present.`)
  assertThrows(() => new ImageData(new Uint8Array(400), 25, 25), err => err.name === 'TypeError' && err.message === `Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'.`)

  assertThrows(() => new ImageData(10, undefined), err => err.message === `Failed to construct 'ImageData': The source height is zero or not a number.`)
  assertThrows(() => new ImageData(0, 10), err => err.message === `Failed to construct 'ImageData': The source width is zero or not a number.`)
  assertThrows(() => new ImageData(10, 0), err => err.message === `Failed to construct 'ImageData': The source height is zero or not a number.`)
  assertThrows(() => new ImageData('width', 'height'), err => err.message === `Failed to construct 'ImageData': The source width is zero or not a number.`)
  assertThrows(() => new ImageData(1 << 31, 1 << 31), err => err.message === `Failed to construct 'ImageData': The requested image size exceeds the supported range.`)

  assertThrows(() => new ImageData(new Uint8ClampedArray(27), 2), err => err.message === `Failed to construct 'ImageData': The input data length is not a multiple of 4.`)
  assertThrows(() => new ImageData(new Uint8ClampedArray(28), 7, 0), err => err.message === `Failed to construct 'ImageData': The source height is zero or not a number.`)
  assertThrows(() => new ImageData(new Uint8ClampedArray(104), 14), err => err.message === `Failed to construct 'ImageData': The input data length is not a multiple of (4 * width).`)
  assertThrows(() => new ImageData(new Uint8ClampedArray([12, 34, 168, 65328]), 1, 151), err => err.message === `Failed to construct 'ImageData': The input data length is not equal to (4 * width * height).`)
  assertThrows(() => new ImageData(this, 4, 4), err => err.name === 'TypeError' && err.message === `Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'.`)
  assertThrows(() => new ImageData(null, 4, 4), err => err.name === 'TypeError' && err.message === `Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'.`)
  assertThrows(() => new ImageData(img.data, 0), err => err.message === `Failed to construct 'ImageData': The source width is zero or not a number.`)
  assertThrows(() => new ImageData(img.data, 13), err => err.message === `Failed to construct 'ImageData': The input data length is not a multiple of (4 * width).`)
  assertThrows(() => new ImageData(img.data, 1 << 31), err => err.message === `Failed to construct 'ImageData': The requested image size exceeds the supported range.`)
  assertThrows(() => new ImageData(img.data, 'biggish'), err => err.message === `Failed to construct 'ImageData': The source width is zero or not a number.`)
  assertThrows(() => new ImageData(img.data, 1 << 24, 1 << 31), err => err.message === `Failed to construct 'ImageData': The requested image size exceeds the supported range.`)
}

{
  const img = new ImageData(-0xfffffffc, -0xfffffffc)

  assert(img.width === 4)
  assert(img.height === 4)
  assert(img.data.length === 64)
}

{
  const arr = new Uint8ClampedArray(64)
  const img = new ImageData(arr, -0xfffffffc)

  assert(img.width === 4)
  assert(img.height === 4)
  assert(img.data.length === 64)
}

{
  const arr = new Uint8ClampedArray(64)
  const img = new ImageData(arr, -0xfffffffc, -0xfffffffc)

  assert(img.width === 4)
  assert(img.height === 4)
  assert(img.data.length === 64)
}

{
  const img1 = new ImageData(100, 50)
  const img2 = new ImageData(img1.data, 100)

  assert(img2.width === 100)
  assert(img2.height === 50)
  assert(img2.data === img1.data)

  assert(getRGBA(img1.data, 10) === '0,0,0,0')
  assert(getRGBA(img2.data, 10) === '0,0,0,0')

  setRGBA(img1.data, 10, '0,255,255,128')
  assert(getRGBA(img1.data, 10) === '0,255,255,128')
  assert(getRGBA(img2.data, 10) === '0,255,255,128')
}

{
  const arr = new Uint8ClampedArray(400)

  arr[22] = 129

  const img = new ImageData(arr, 20, 5)
  assert(img.width === 20)
  assert(img.height === 5)
  assert(img.data === arr)

  assert(getRGBA(arr, 2) === '0,0,0,0')
  assert(getRGBA(img.data, 2) === '0,0,0,0')

  setRGBA(img.data, 2, '0,255,255,128')
  assert(getRGBA(arr, 2) === '0,255,255,128')
  assert(getRGBA(img.data, 2) === '0,255,255,128')
}

{
  const img = new ImageData(1, 1)
  const keys = Object.getOwnPropertyNames(img)

  assert(keys.length === 1)
  assert(keys.includes('data'))
}

{
  const img = new ImageData(1, 1)
  const keys = Object.keys(img)

  assert(keys.length === 1)
  assert(keys.includes('data'))
}

{
  const img = new ImageData(1, 1)
  const keys = []

  for (const key in img) keys.push(key)

  assert(keys.length === 3)
  assert(keys.includes('data'))
  assert(keys.includes('data'))
  assert(keys.includes('data'))
}

{
  const img = new ImageData(12, 16)
  const arr1 = img.data
  const arr2 = new Uint8ClampedArray(768)

  if (isStrict) {
    assertThrows(() => { img.width = 20 }, err => err.name === 'TypeError')
    assertThrows(() => { img.height = 20 }, err => err.name === 'TypeError')
    assertThrows(() => { img.data = arr2 }, err => err.name === 'TypeError')
  } else {
    img.width = 20
    img.height = 20
    img.data = arr2
  }

  assert(img.width === 12)
  assert(img.height === 16)
  assert(img.data === arr1)
}
