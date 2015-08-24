import { Tokenizer } from './tokenizer';

var tokenizer = new Tokenizer();
tokenizer.getMessages('../data/training.txt', tokens => {
	console.log(tokens);
});



