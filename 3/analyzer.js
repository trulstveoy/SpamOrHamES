export default class Analyzer{
	
	constructor(tokenize){
		this.tokenize = tokenize;
		this.map = new Map();
	}
	
	analyze(messages) {				
		for(const message of messages) {
			const score = message.label === 'ham' ? 1 : -1;		
			const words = this.tokenize(message.text);	
			
			for(const word of words){			
				if(!this.map.has(word)){
					this.map.set(word, score);
				} else {
					const newScore = this.map.get(word) + score;
					this.map.set(word, newScore);
				}
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



