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

### Commonjs (pee.cjs)
```js
const { leak } = require('pee.js');
leak(420); // Leaks 420 MB of memory
```
See `test/pee.test.cjs` for a more in-depth example

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