import { leak } from '../pee.js';

let getMemoryMB = () => process.memoryUsage().rss / 1024 / 1024;
let getArrayBufferMemoryMB = () => process.memoryUsage().arrayBuffers / 1024 / 1024;

const amountOfPee = 10;
const margin = .90;

test('it can pee', (andMakesSureThereIsNoLastDrop) => {
    const env = `[ecmascript] ${typeof window === 'undefined' ? '[node]' : '[jsdom]'}`

    let initiallyUsed = getMemoryMB();
    let initiallyUsedArrayBuffers = getArrayBufferMemoryMB();

    console.log(env, `The script uses approximately ${initiallyUsed.toFixed(2)} MB of total memory before Peeing.`);
    console.log(env, `The script uses approximately ${initiallyUsedArrayBuffers.toFixed(2)} MB of ArrayBuffer memory before Peeing.`);

    leak(amountOfPee);

    let used = getMemoryMB();
    let peeDifferential = used - initiallyUsed;

    let usedArrayBuffers = getArrayBufferMemoryMB();
    let peeDifferentialArrayBuffers = usedArrayBuffers - initiallyUsedArrayBuffers;

    console.log(env, `The script uses approximately ${used.toFixed(2)} MB of total memory after Peeing.`);
    console.log(env, `The script uses approximately ${usedArrayBuffers.toFixed(2)} MB of ArrayBuffers after Peeing.`);

    expect(peeDifferentialArrayBuffers >= amountOfPee * margin).toBeTruthy();

    console.log(env, "Waiting 10 seconds...");

    setTimeout(() => {
        used = getMemoryMB();
        peeDifferential = used - initiallyUsed;

        usedArrayBuffers = getArrayBufferMemoryMB();
        peeDifferentialArrayBuffers = usedArrayBuffers - initiallyUsedArrayBuffers;

        console.log(env, `The script uses approximately ${used.toFixed(2)} MB of total memory 10 seconds after Peeing.`);
        console.log(env, `The script uses approximately ${usedArrayBuffers.toFixed(2)} MB of ArrayBuffers 10 seconds after Peeing.`);

        expect(peeDifferentialArrayBuffers >= amountOfPee * margin).toBeTruthy();

        console.log(env, "Enjoy your leaking!");
        andMakesSureThereIsNoLastDrop();
    }, 1000 * 10);
})