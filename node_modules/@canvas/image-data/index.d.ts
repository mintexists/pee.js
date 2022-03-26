declare class ImageData {
  /**
   * Creates an `ImageData` object from a given `Uint8ClampedArray` and the size of the image it contains.
   *
   * @param array A `Uint8ClampedArray` containing the underlying pixel representation of the image.
   * @param width An `unsigned` `long` representing the width of the image.
   * @param height An `unsigned` `long` representing the height of the image. This value is optional: the height will be inferred from the array's size and the given width.
   */
  constructor (array: Uint8ClampedArray, width: number, height?: number)

  /**
   * Creates an `ImageData` object of a black rectangle with the given width and height.
   *
   * @param width An `unsigned` `long` representing the width of the image.
   * @param height An `unsigned` `long` representing the height of the image.
   */
  constructor (width: number, height: number)

  /**
   * A `Uint8ClampedArray` representing a one-dimensional array containing the data in the RGBA order, with integer values between `0` and `255` (included).
   */
  readonly data: Uint8ClampedArray

  /**
   * An `unsigned` `long` representing the actual height, in pixels, of the `ImageData`.
   */
  readonly height: number

  /**
   * An `unsigned` `long` representing the actual width, in pixels, of the `ImageData`.
   */
  readonly width: number
}

export = ImageData
