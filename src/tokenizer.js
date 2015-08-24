import path from 'path';
import lineReader from 'line-reader';

export class Tokenizer{
	async getMessages(filename, callback){
		var fullname = path.join(__dirname, filename);
		lineReader.eachLine(fullname, (line, last) => {
			var tokens = line.split('\t').filter(token =>{
				return token.trim() !== '';
			});		
			
			var label = tokens[0] === 'ham' ? 1 : 0;
			var message = tokens[1];			
			
			callback({label:label, message:message});
		});
	}
}