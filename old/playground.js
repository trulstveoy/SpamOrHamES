console.log('start');

//let + const
let foo = 'foo';
const bar = 'bar';

//template strings
let text = 'foo';
console.log(`bar != ${text}`);

var sym = Symbol();
var promise = new Promise();

var s = '';

async function testAsync() {
    if( Math.round(Math.random()) )
        return 'Success!';
    else
        throw 'Failure!';
}

//destructuring
console.log('end');

