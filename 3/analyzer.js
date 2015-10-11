
function tokenize (text){
	if(!text){
		console.log('text is nothing');
	}
	return text.match(/\w+/gi) || [];	
}

export default function analyze(messages) {		
	const map = new Map();
	for(const message of messages) {
		const score = message.label === 'ham' ? 1 : -1;		
		const words = tokenize(message.text);	
		
		for(const word of words){			
			if(!map.has(word)){
				map.set(word, score);
			} else {
				const newScore = map.get(word) + score;
				map.set(word, newScore);
			}
		}
	}
	
	return function(text) {		
		const words = tokenize(text);
		const score = words.map(word => 
			map.has(word) ? map.get(word) : 0
		).reduce((p, c) => {
			p + c
		});		
		
		return score >= 0 ? 'ham' : 'spam';
	}
}
