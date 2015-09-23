import read from './file';
import analyze from './analyzer'

console.log('start');

let messages = read('../data/messages_small.txt');

var validation = messages.splice(0, 49);
var training = messages.splice(50);

let classify = analyze(training, ['txt']);

// let correct = validation.map(m => 
// 	m.label === classify(m.text) ? 1 : 0
// ).reduce((p,c) => 
// 	p + c
// );
// 
// let avg = (correct / validation.length) * 100;
// console.log('Correcly validated ' + avg + '%');

console.log('end');