import read from './file';

console.log('start');

let messages = read('../data/messages.txt');

var classify = function(text){
	if(text.toLowerCase().indexOf('free') === -1){	
		return 'ham';
	} else{
		return 'spam';
	}
}

var correct = messages.map(m => 
	m.label === classify(m.text) ? 1 : 0
).reduce((p,c) => 
	p + c
);

var avg = (correct / messages.length) * 100;
console.log('Correcly validated ' + avg + '%');

console.log('end');