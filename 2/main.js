import * as path from 'path';
import * as fs from 'fs';

console.log('start');

var fullname = path.join(__dirname, '../data/messages.txt');
var content = fs.readFileSync(fullname, 'utf8');
var lines = content.split('\n');
var messages = lines.filter(line => 
	line.trim() !== ''
).map(line => {			
	var tokens = line.split('\t');
	var label = tokens[0];
	var text = tokens[1];
	
	if(!label || !text){
		console.log('line cannot be parsed: ' + line);
	}						
	
	return {label: label, text: text }
});

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