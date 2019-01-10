console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('Inside of callback 0');
}, 0)

console.log('Fishining up');