import { FileParser } from './fileParser';
import { Analyzer } from './analyzer';

console.log('start');

var parser = new FileParser();
var messages = parser.getMessages('../data/messages.txt');

var spamMessages = messages.filter(message => message.label === 'spam');
var spamWithFree = spamMessages.filter(message => message.text.indexOf('FREE') !== -1);	
console.log("Spam with FREE: " + spamWithFree.length);

var hamMessages = messages.filter(message => message.label === 'ham');
var hamWithFree = hamMessages.filter(message => message.text.indexOf('FREE') !== -1);	
console.log("Ham with FREE: " + hamWithFree.length); 

var validation = messages.splice(0,999);
var training = messages.splice(1000);

var analyzer = new Analyzer();
var classifier = analyzer.train(training, ['txt']);

var correctlyValidated = validation.map(message => {
	var result = classifier(message.text);
	return result === message.label ? 1 : 0;
}).reduce((prev, cur) => prev + cur);

var avrage = correctlyValidated / validation.length;
console.log('Based on "txt" correcly validated ' + avrage + '%');

console.log('end')
	




