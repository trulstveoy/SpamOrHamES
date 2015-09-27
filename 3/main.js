import read from './file';
import analyze from './analyzer'

console.log('start');

const messages = read('../data/messages.txt');

const validation = messages.splice(0, 499);
const training = messages.splice(500);

const classify = analyze(training);

const correct = validation.map(m => 
	m.label === classify(m.text) ? 1 : 0
).reduce((p,c) => 
	p + c
);

const avg = (correct / validation.length) * 100;
console.log(`Correcly validated ${avg}%`);

console.log('end');