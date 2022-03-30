import { fileURLToPath } from 'url';

// Take a leak and share it with the world
export function leak(mb) {
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
// the splits are because you can either call with or without extension on node
// we also check that jest is not running the file because technically it is considered a cli run ? (it gets fucky ngl)
if (process.argv[1].split('.js')[0] === fileURLToPath(import.meta.url.split('.js')[0]) && process.env.JEST_WORKER_ID === undefined) {
    if (!process.argv[2]) throw new Error('You should pass in the amount in MB of pee you want to leak.')
    console.log(`Using ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB. Beginning to pee.`)
    leak(Number.parseInt(process.argv[2]))
    console.log(`Done peeing. Using ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB. `)
    console.log('Press CTRL+C to empty the pee.')
    setInterval(() => {}, 1 << 30) // we set an interval to fire once every twelve days to keep process running
} // otherwise function is already exported