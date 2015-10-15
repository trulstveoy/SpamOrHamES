import read from './file';
import Analyzer from './analyzer';
import {flattenArray, uniqueArray} from './utils';

console.log('start');

const tokenize = function(text) {		
	const lowercaseTokens = (text.match(/\w+/gi) || []).map(t => t.toLowerCase());
	const uniqueTokens = uniqueArray(lowercaseTokens);
	return uniqueTokens;	
}

const messages = read('../data/messages_small.txt');
const validation = messages.splice(0,10);
const training = messages;

const classificationTokens = flattenArray(
	training.map(x =>
		tokenize(x.text))).map(t =>
			t.toLowerCase());

const analyzer = new Analyzer(tokenize);
analyzer.analyze(training, classificationTokens.splice(0, 40));

console.log('Classifying...')
const correct = validation.map(m => {
	const result = analyzer.classify(m.text);
	return m.label === result ? 1 : 0
}).reduce((p,c) => p + c);

const avg = (correct / validation.length) * 100;
console.log('Correcly classified ' + avg + '%');

console.log('end');