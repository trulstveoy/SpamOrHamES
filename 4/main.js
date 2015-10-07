import read from './file';
import Bayes from './bayes'

console.log('start');

const tokenize = function(text) {	
	if(!text) {	console.log('text is nothing');	}		
	return text.match(/\w+/gi);	
};

const messages = read('../data/messages_small.txt');

const validation = messages.splice(0, 49);
const training = messages.splice(50);

const bayes = new Bayes(tokenize);
bayes.analyze(training, ['txt']);

const correct = validation.map(m => 
	m.label === bayes.classify(m.text) ? 1 : 0
).reduce((p,c) => p + c);

const avg = (correct / validation.length) * 100;
console.log(`Correcly validated ${avg}%`);

console.log('end');