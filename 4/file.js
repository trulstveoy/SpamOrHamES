import * as path from 'path';
import * as fs from 'fs';

export default function	read(filename) {
	const fullname = path.join(__dirname, filename);
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

	return messages;
}