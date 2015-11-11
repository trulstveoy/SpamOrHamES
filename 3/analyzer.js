export default class Analyzer{
	
	constructor(tokenize){
		this.tokenize = tokenize;
		this.map = new Map();
	}
	
	analyze(messages) {				
		for(let message of messages) {
			const score = message.label === 'ham' ? 1 : -1;		
			const words = this.tokenize(message.text);	
			
			for(let word of words){
				const currentScore = this.map.get(word) || 0;
				this.map.set(word, currentScore + score);
			}
		}		
	}
	
	classify(text){
		const words = this.tokenize(text);
		const score = words.map(word => 
			this.map.has(word) ? this.map.get(word) : 0
		).reduce((p, c) => {
			p + c
		});		
		
		return score >= 0 ? 'ham' : 'spam';
	}
}



