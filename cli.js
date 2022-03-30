#!/usr/bin/env node

// warning this is all very very cursed

// this needs alot of fuckery in order for module path resolution to work and stuff

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'module';

// All this to resolve the proper path of the commonjs version that we run in ecmascript mode lmao
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const modulePath = path.join(__dirname, 'pee.cjs')

const { leak } = require(modulePath)

leak(process.argv[2], true)