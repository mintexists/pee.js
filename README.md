# Pee.js
![Pee.js Logo, it says meow uwu pee.js ovo nya](logo.png)
> Piss away your memories...

# What is it?
Pee.js is a library for leaking a set amount of memory, written in JavaScript.

## Why does this exist?
I wanted to make a JavaScript library named pee.js because of a typo and a pun.

## Usage

This is a hybrid package (commonjs and ecmascript module) that is available on the [node package manager registry](https://www.npmjs.com/package/pee.js)
```shell
# To install the package in your project
npm install --save pee.js
```

### Ecmascript (pee.js)
```js
import { leak } from 'pee.js';
leak(69); // Leaks 69 MB of memory
```
See `test/pee.test.js` for a more in-depth example

### CommonJS (pee.cjs)
```js
const { leak } = require('pee.js');
leak(420); // Leaks 420 MB of memory
```
See `test/pee.test.cjs` for a more in-depth example

### Binary Usage (standalone, for scripts)
To install pee.js globally and make it available in your path for whenever you might need it
```shell
$ npm install -g pee.js

$ pee.js 123 # Leaks 123 MB of memory
```

You can use the script as standalone for testing purposes without installing anything
```shell
$ npx pee.js 1312 # Leaks 1312 MB of memory
```

Or if you want to use it as a script inside of one of your packages
```shell
# Say you create your little project
$ mkdir i_like_pee
$ cd i_like_pee
$ npm init -y

# Then you can install pee.js
$ npm install --save pee.js
```

Then inside of your package.json you can use the pee.js binary distribution in your scripts
```json
{
    ...
    "scripts": {
        "makeItRain101MB": "pee.js 101"
    }
    ...
}
```

The binary can also be directly called from your node_modules folder like so
```shell
$ node ./node_modules/.bin/pee.js 42 # Leaks 42 MB of memory
```

### Node CLI Usage (for testing, in case you clone)
```shell
# To run the default ecmascript version
$ npm run start 666 # Leaks 666 MB of memory

# Which is the same as
$ node pee 666 # Leaks 666 MB of memory

# To run the commonjs version
$ node pee.cjs 1312 # Leaks 1312 MB of memory
```

### Development
Test suites are available for both the commonjs (using node env) and ecmascript (using jsdom env) version.
```shell
# To run both tests
npm run test

# To run commonjs tests
npm run test:cjs

# To run ecmascript tests
npm run test:mjs
```

## Why should I care?
You should not. Thank you for your time.

## Feature Requests, Bug Reports, and Pull Requests are very welcome