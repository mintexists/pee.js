const { leak } = require('../pee.cjs');

let getMemoryMiB = () => process.memoryUsage().rss / 1024 / 1024;
let getArrayBufferMemoryMiB = () => process.memoryUsage().arrayBuffers / 1024 / 1024;

const amountOfPee = 10;
const margin = .95;

test('it can pee', (andMakesSureThereIsNoLastDrop) => {
    console.log('Testing commonjs');

    let initiallyUsed = getMemoryMiB();
    let initiallyUsedArrayBuffers = getArrayBufferMemoryMiB();

    console.log(`The script uses approximately ${initiallyUsed.toFixed(2)} MiB of total memory before Peeing.`);
    console.log(`The script uses approximately ${initiallyUsedArrayBuffers.toFixed(2)} MiB of ArrayBuffer memory before Peeing.`);

    leak(amountOfPee);

    let used = getMemoryMiB();
    let peeDifferential = used - initiallyUsed;

    let usedArrayBuffers = getArrayBufferMemoryMiB();
    let peeDifferentialArrayBuffers = usedArrayBuffers - initiallyUsedArrayBuffers;

    console.log(`The script uses approximately ${used.toFixed(2)} MiB of total memory after Peeing.`);
    console.log(`The script uses approximately ${usedArrayBuffers.toFixed(2)} MiB of ArrayBuffers after Peeing.`);

    expect(peeDifferentialArrayBuffers >= amountOfPee * margin).toBeTruthy();

    console.log("Waiting 10 seconds...");

    setTimeout(() => {
        used = getMemoryMiB();
        peeDifferential = used - initiallyUsed;

        usedArrayBuffers = getArrayBufferMemoryMiB();
        peeDifferentialArrayBuffers = usedArrayBuffers - initiallyUsedArrayBuffers;

        console.log(`The script uses approximately ${used.toFixed(2)} MiB of total memory 10 seconds after Peeing.`);
        console.log(`The script uses approximately ${usedArrayBuffers.toFixed(2)} MiB of ArrayBuffers 10 seconds after Peeing.`);

        expect(peeDifferentialArrayBuffers >= amountOfPee * margin).toBeTruthy();

        console.log("Enjoy your leaking!");
        andMakesSureThereIsNoLastDrop();
    }, 1000 * 10);
})