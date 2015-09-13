
let tokenize = function(text){
	if(!text){
		console.log('text is nothing');
	}
	return text.match(/\w+/gi);	
}

export default function analyze(messages) {		
	if(!messages){
		console.log('messages is nothing')
	}	
	let map = new Map();
	for(let message of messages) {
		let score = message.label === 'ham' ? 1 : -1;		
		let words = tokenize(message.text);	
		if(!words) {
			continue;
		}
		for(let word of words){
			if(!word){
				console.log('undefined word');
			}
			if(!map.has(word)){
				map.set(word, score);
			} else{
				var newScore = map.get(word) + score;
				map.set(word, newScore);
			}
		}
	}
	
	return function(text) {		
		let words = tokenize(text);
		var score = words.map(word => 
			map.has(word) ? map.get(word) : 0
		).reduce((p, c) =>{
			p + c
		});		
		
		return score >= 0 ? 'ham' : 'spam';
	}
}
