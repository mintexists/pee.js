import ImageData from '@canvas/image-data'

// Toilet for the pee
let toilet = [];

export function leak(mb) {
    // Magic Number of Piss
    for (let i = 0; i < 5242 * mb; i++) {
        // Pee some memory into the toilet
        toilet.push(new ImageData(1, 1));
    }

    // Give it a little wiggle
    giveItALittleWiggle();
}

function giveItALittleWiggle() {
    // Prevent the toilet from being flushed
    for (let pee of toilet) {
        pee.data;
    }
    // Just Keep Wiggling, Just Keep Wiggling
    window.requestAnimationFrame(giveItALittleWiggle);
}