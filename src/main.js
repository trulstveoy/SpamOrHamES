import { Tokenizer } from './tokenizer';

console.log('start');

var tokenizer = new Tokenizer();
var messages = tokenizer.getMessages('../data/messages.txt');
var training = messages.splice(0,999);
var validation = messages.splice(1000);

var spamWithFree = training.filter(message => {
	return message.label === 'spam' && message.words.indexOf('FREE') !== -1;
});
console.log("Spam with FREE: " + spamWithFree.length);

var hamWithFree = training.filter(message => {
	return message.label === 'ham' && message.words.indexOf('FREE') !== -1;
});

console.log("Ham with FREE: " + hamWithFree.length);

console.log('end')
	




