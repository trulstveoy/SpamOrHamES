import { Tokenizer } from './tokenizer';

console.log('start');

var test = '123abc,. foobar 123 juba';
var re = /\w+/gi;

var res = test.match(re);

var tokenizer = new Tokenizer();
var messages = tokenizer.getMessages('../data/messages.txt');
var training = messages.splice(0,999);
var validation = messages.splice(1000);

var spamWithFree = training.filter(message => {
	return message.label === 'spam' && message.words.indexOf('free') !== -1;
});
console.log("Spam with 'free': " + spamWithFree.length);

var hamWithFree = training.filter(message => {
	return message.label === 'ham' && message.words.indexOf('free') !== -1;
});

console.log("Ham with 'free': " + hamWithFree.length);

console.log('end')
	




