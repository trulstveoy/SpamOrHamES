import * as path from 'path';
import * as fs from 'fs';

export default function	read(filename) {
	var fullname = path.join(__dirname, filename);
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
	}).filter(m => 
		m.text !== ''
	);
	
	return messages;
}