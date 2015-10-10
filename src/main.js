import read from './file';
import Bayes from './bayes';

console.log('start');

const tokenize = function(text) {	
	if(!text) {	console.log('text is nothing');	}		
	const lowercaseTokens = (text.match(/\w+/gi) || []).map(t => t.toLowerCase());
	const uniqueTokens = [...new Set(lowercaseTokens)];
	return uniqueTokens;	
}

const messages = read('../data/messages_small.txt');
const validation = messages.splice(0,10);
const training = messages.splice(0, 10);

const classificationTokens = 
	[...new Set([].concat(...training.map(x =>
		tokenize(x.text))))].map(t =>
			t.toLowerCase());

const bayes = new Bayes(tokenize);
//bayes.analyze(training, ['txt', 'free', 'message']);
bayes.analyze(training, classificationTokens);

const correct = validation.map(m => {
	const result = bayes.classify(m.text);
	return m.label === result ? 1 : 0
}).reduce((p,c) => p + c);

const avg = (correct / validation.length) * 100;
console.log('Correcly validated ' + avg + '%');

console.log('end');