import read from './file';
import Bayes from './bayes';

console.log('start');

const tokenize = function(text) {		
	const lowercaseTokens = (text.match(/\w+/gi) || []).map(t => t.toLowerCase());
	const uniqueTokens = [...new Set(lowercaseTokens)];
	return uniqueTokens;	
}

const messages = read('../data/messages_medium.txt');
const validation = messages.splice(0,100);
const training = messages;

const classificationTokens = 
	[...new Set([].concat(...training.map(x =>
		tokenize(x.text))))].map(t =>
			t.toLowerCase());

const bayes = new Bayes(tokenize);
bayes.analyze(training, classificationTokens);

console.log('Classifying...')
const correct = validation.map(m => {
	const result = bayes.classify(m.text);
	return m.label === result ? 1 : 0
}).reduce((p,c) => p + c);

const avg = (correct / validation.length) * 100;
console.log('Correcly classified ' + avg + '%');

console.log('end');