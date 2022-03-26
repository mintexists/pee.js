# ImageData

An `ImageData` implementation for usage outside of the browser.

## Installation

```sh
npm install --save @canvas/image-data
```

## Usage

```js
const ImageData = require('@canvas/image-data')

const img = new ImageData(2, 4)

console.log(img.width)
//=> 2

console.log(img.height)
//=> 4

console.log(img.data)
//=> Uint8ClampedArray [ 0, 0, 0, 0, 0, ... ]
```

## Hacking

The tests are made to be run against both this implementation and Chrome's implementation to make sure that we behave in the same way. You can run the tests in Chrome by spinning up a local web server and open `test.html`.
