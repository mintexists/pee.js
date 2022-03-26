const pee = require('../pee.node.js');

let used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB before Peeing.`);
pee.leak(10);
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB after Peeing.`);
console.log("Waiting 10 seconds...");
setTimeout(() => {
    used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB 10 seconds after Peeing.`);
    console.log("Enjoy your leaking!");
}, 1000 * 10);