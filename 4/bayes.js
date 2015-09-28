export default class Bayes {
	
	constructor(tokenize){
		this.tokenize = tokenize;
	}
	
	laplace(count, total){
		return (count + 1) / total + 1;
	}
	
	score(tokens, token, size) {
		let occurence = tokens.filter(t => 
			t === token
		).length;
		
		return this.laplace(occurence, size);	
	}	
	
	analyze(messages, classificationTokens){
		//ham
		const hamMessages = messages.filter(m => m.label === 'ham');
		const spamMessages = messages.filter(m => m.label === 'spam');
		
		const messageCount = messages.length;
		
		const hamCount = hamMessages.length;
		this.hamProportion = hamCount / messageCount;
		const hamWords = [].concat.apply([], hamMessages.map(m => 
			this.tokenize(m.text)	
		));	
		this.hamScores = classificationTokens.map(ct => {
			return {token: ct, score: this.score(hamWords, ct, hamCount)};		
		});	
			
		//spam
		const spamCount = spamMessages.length;	
		this.spamProportion = spamCount / messageCount;
		const spamWords = [].concat.apply([], spamMessages.map(m => 
			this.tokenize(m.text)	
		));
		this.spamScores = classificationTokens.map(ct => {
			return {token: ct, score: this.score(spamWords, ct, hamCount)};		
		});
	}
	
	classify(text){
		const tokens = this.tokenize(text);
		//ham
		const hamSums = tokens.map(t => {
			let freq = this.hamScores.filter(s => s.token === t)[0];
			return !!freq ? Math.log(freq.score): 0;				
		})
		const hamSum = hamSums.reduce((prev, cur) => prev + cur);	
		const finalHamScore = Math.log(this.hamProportion + hamSum);		
		
		//spam
		const spamSums = tokens.map(t => {
			let freq = this.spamScores.filter(s => s.token === t)[0];
			return !!freq ? Math.log(freq.score): 0;				
		})
		var spamSum = spamSums.reduce((prev, cur) => prev + cur);	
		const finalSpamScore = Math.log(this.spamProportion + spamSum);
		
		if(finalHamScore >= finalSpamScore)
			return 'ham';
			
		return 'spam';
	}
}