import read from './file';
import Analyzer from './analyzer'

console.log('start');

function tokenize (text){
	if(!text) console.log('text is nothing');
	return text.match(/\w+/gi) || [];	
}

const messages = read('../data/messages_medium.txt');

const validation = messages.splice(0, 100);
const training = messages;

const analyzer = new Analyzer(tokenize);
analyzer.analyze(training);

const correct = validation.map(({label, text}) => 
	label === analyzer.classify(text) ? 1 : 0
).reduce((p,c) => 
	p + c
);

const avg = (correct / validation.length) * 100;
console.log(`Correcly validated ${avg}%`);

console.log('end');