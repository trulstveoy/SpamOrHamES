import * as path from 'path';
import * as fs from 'fs';

console.log('start');

const fullname = path.join(__dirname, '../data/messages.txt');
const content = fs.readFileSync(fullname, 'utf8');
const lines = content.split('\n');
const messages = lines.filter(line => 
	line.trim() !== ''
).map(line => {			
	const [label, text] = line.split('\t');

	if(!label || !text){
		console.log('line cannot be parsed: ' + line);
	}						
	
	return {label, text}
});

function classify(text){
	if(text.toLowerCase().indexOf('free') === -1){	
		return 'ham';
	} else{
		return 'spam';
	}
}

const correct = messages.map(m => 
	m.label === classify(m.text) ? 1 : 0
).reduce((p,c) => 
	p + c
);

const avg = (correct / messages.length) * 100;
console.log(`Correcly validated ${avg}%`);

console.log('end');