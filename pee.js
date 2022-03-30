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