import path from 'path';
import fs from 'fs';

export class Tokenizer{
	getMessages(filename) {
		var fullname = path.join(__dirname, filename);
		var content = fs.readFileSync(fullname, 'utf8');
		var lines = content.split('\n');
		var messages = lines.filter(line => {
			return line.trim() !== '';	
		}).map(line => {
			var tokens = line.split('\t');
			var label = tokens[0];
			if(tokens[1] === undefined){
				console.log(line);
			}
			var words = tokens[1].split(' ');
			return {label: label, words: words}
		});
		
		return messages;
	}
}