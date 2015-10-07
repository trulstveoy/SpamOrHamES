import read from './file';
import Bayes from './bayes';

console.log('start');

const tokenize = function(text) {	
	if(!text) {	console.log('text is nothing');	}		
	return (text.match(/\w+/gi) || []).map(t => t.toLowerCase());	
}

const messages = read('../data/messages_small.txt');
const validation = messages.splice(0,50);
const training = messages;

const classificationTokens = 
	[...new Set([].concat.apply([], training.map(x =>
		tokenize(x.text))))].map(t =>
			t.toLowerCase());

const bayes = new Bayes(tokenize);
//bayes.analyze(training, ['txt', 'free']);
bayes.analyze(training, classificationTokens);

const correct = validation.map(m => {
	const result = bayes.classify(m.text);
	m.label === result ? 1 : 0
}).reduce((p,c) => p + c);

const avg = (correct / validation.length) * 100;
console.log('Correcly validated ' + avg + '%');

console.log('end');