const ImageData = require('@canvas/image-data')

// Toilet for the pee
let toilet = [];

function leak(mb) {
    // Magic Number of Piss (Node Edition)
    for (let i = 0; i < 2621 * mb; i++) {
        // Pee some memory into the toilet
        toilet.push(new ImageData(1, 1));
    }
    
    // Giving it a little wiggle does not appear to be necessary in Node, so we can just stop it here :(
}

exports.leak = leak;