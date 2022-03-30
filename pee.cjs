// this part is for running as cli as per the bin in package.json
// if somebody requires the packages as a dependency they can call pee.js directly from their scripts
const runAsCli = (mb) => {
    if (!mb) throw new Error('You should pass in the amount in MB of pee you want to leak.')
    console.log(`Using ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB. Beginning to pee.`)
    leak(Number.parseInt(mb))
    console.log(`Done peeing. Using ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB. `)
    console.log('Press CTRL+C to empty the pee.')
    setInterval(() => {}, 1 << 30) // we set an interval to fire once every twelve days to keep process running
}

// Take a leak
function leak(mb, shouldRunInCLIMode) {
    // Cursed runAsCLI method because found no other way to make it work
    if (shouldRunInCLIMode) return runAsCli(mb)

    // Fill the toilet with pee
    if (typeof window === "undefined") {
        // A global toilet is used to make it harder for the poor garbage men to clean up all the pee
        global.toilet = new Uint8Array(Math.floor(mb * 1024 * 1024)).fill(69);
    } else {
        // Pissing on someones windows will definitely be hard to clean up
        window.toilet = new Uint8Array(Math.floor(mb * 1024 * 1024)).fill(69);
    }
    // The 69 is (the number of the beast - thanks github copilit)
    // The 69 is also one of the fastest numbers I could fill the array with, tested on https://jsbench.me/z9l1b0ttf6
}

// handle running directly from command line via node command directly (not from package.json bin reference)
if (require.main === module) {
    runAsCli(process.argv[2])
} else { // we need to export conditionnally for commonjs otherwise there are errors when run in CLI mode
    module.exports = {
        leak // Share the pee with the world
    }
}

