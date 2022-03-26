import { leak } from '../pee.js';

const amountOfPee = 10

test('it can pee', (andMakesSureThereIsNoLastDrop) => {
    console.log('Testing ecmascript')
    let initiallyUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(initiallyUsed * 100) / 100} MB before Peeing.`);
    leak(amountOfPee);
    let used = process.memoryUsage().heapUsed / 1024 / 1024;
    let peeDifferential = used - initiallyUsed
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB after Peeing.`);
    expect(peeDifferential >= amountOfPee).toBeTruthy()
    console.log("Waiting 10 seconds...");
    setTimeout(() => {
        used = process.memoryUsage().heapUsed / 1024 / 1024;
        peeDifferential = used - initiallyUsed
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB 10 seconds after Peeing.`);
        // TODO: this fails
        expect(peeDifferential >= amountOfPee).toBeTruthy()
        console.log("Enjoy your leaking!");
        andMakesSureThereIsNoLastDrop()
    }, 1000 * 10);
})


