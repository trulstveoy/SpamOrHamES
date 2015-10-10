import read from './file';

console.log('start');

const messages = read('../data/messages_small.txt');

function classify(text){
	if(text.toLowerCase().indexOf('free') === -1){	
		return 'ham';
	} else{
		return 'spam';
	}
}

const correct = messages.map(({label, text}) => 
	label === classify(text) ? 1 : 0
).reduce((p,c) => 
	p + c
);

const avg = (correct / messages.length) * 100;
console.log(`Correcly validated ${avg}%`);

console.log('end');