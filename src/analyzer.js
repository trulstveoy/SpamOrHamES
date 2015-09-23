import { bayes } from './statistics';

let tokenize = function(text){
	if(!text){
		console.log('text is nothing');
	}
	return text.match(/\w+/gi);	
}

export default function analyze(messages, classificationTokens) {		
	if(!messages){
		console.log('messages is nothing')
	}		
	
	//ham
	const hamMessages = messages.filter(m => m.label === 'ham');
	const spamMessages = messages.filter(m => m.label === 'spam');
	
	const messageCount = messages.length;
	
	const hamCount = hamMessages.length;
	const hamProportion = hamCount / messageCount;
	const hamWords = [].concat.apply([], hamMessages.map(m => 
		tokenize(m.text)	
	));	
	const hamScores = classificationTokens.map(ct => {
		return {token: ct, score: bayes(hamWords, ct, hamCount)};		
	});	
		
	//spam
	const spamCount = spamMessages.length;	
	const spamProportion = spamCount / spamMessages;
	const spamWords = [].concat.apply([], spamMessages.map(m => 
		tokenize(m.text)	
	));
	const spamScores = classificationTokens.map(ct => {
		return {token: ct, score: bayes(spamWords, ct, hamCount)};		
	});
	
	return (text) => {
		const tokens = tokenize(text);
		const scores = tokens.map(t => {
			let freq = 
		})
		
	};	
	
	// let map = new Map();
	// for(let message of messages) {
	// 	let score = message.label === 'ham' ? 1 : -1;		
	// 	let words = tokenize(message.text);	
	// 	if(!words) {
	// 		console.log('message: ' + message.text)
	// 		continue;
	// 	}
	// 	for(let word of words){
	// 		if(!word){
	// 			console.log('undefined word');
	// 		}
	// 		if(!map.has(word)){
	// 			map.set(word, score);
	// 		} else{
	// 			var newScore = map.get(word) + score;
	// 			map.set(word, newScore);
	// 		}
	// 	}
	// }
	// 
	// return function(text) {		
	// 	let words = tokenize(text);
	// 	var score = words.map(word => 
	// 		map.has(word) ? map.get(word) : 0
	// 	).reduce((p, c) =>{
	// 		p + c
	// 	});		
	// 	
	// 	return score >= 0 ? 'ham' : 'spam';
	// }
}

