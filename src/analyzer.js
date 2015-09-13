
let tokenize = function(text){
	if(!text){
		console.log('not found');
	}
	return text.match(/\w+/gi);	
}

export default function analyze(messages) {		
	
	let map = new Map();
	for(let message of messages) {
		let score = message.label === 'ham' ? 1 : -1;		
		let words = tokenize(message.text);	
		for(let word of words){
			if(!word){
				console.log('undefined word');
			}
			if(!map.has(word)){
				map.set(word, score);
			} else{
				map[word] += score;
			}
		}
	}
	
	console.log(map);
	
	return function(text) {
		let words = tokenize(text);
		
	}
}


// let classify = function(text){
// 	if(text.toLowerCase().indexOf('free') === -1){	
// 		return 'ham';
// 	} else{
// 		return 'spam';
// 	}
// }



