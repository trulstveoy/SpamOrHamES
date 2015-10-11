import read from './file';
import analyze from './analyzer'

console.log('start');

const messages = read('../data/messages_small.txt');

const validation = messages.splice(0, 10);
const training = messages;



const classify = analyze(training);

const correct = validation.map(({label, text}) => 
	label === classify(text) ? 1 : 0
).reduce((p,c) => 
	p + c
);

const avg = (correct / validation.length) * 100;
console.log(`Correcly validated ${avg}%`);

console.log('end');