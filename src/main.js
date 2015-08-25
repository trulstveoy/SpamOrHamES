import { Tokenizer } from './tokenizer';

console.log('start');

var tokenizer = new Tokenizer();
var messages = tokenizer.getMessages('../data/training.txt');

var spamWithFree = messages.filter(message => {
	return message.label === 'spam' && message.words.indexOf('FREE') !== -1;
});
console.log("Spam with FREE: " + spamWithFree.length);

var hamWithFree = messages.filter(message => {
	return message.label === 'ham' && message.words.indexOf('FREE') !== -1;
});
console.log("Ham with FREE: " + hamWithFree.length);

console.log('end')
	




