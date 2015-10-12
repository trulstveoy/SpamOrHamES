export default class Bayes {
	
	constructor(tokenize){
		this.tokenize = tokenize;
	}
	
	laplace(count, total){
		return (count + 1) / (total + 1);
	}
	
	score(tokens, token, size) {
		let occurence = tokens.filter(t => 
			t === token
		).length;
		const score = this.laplace(occurence, size);
		return score;	
	}	
	
	tokenizeGroup(messages, label){
		return messages.filter(m => 
			m.label === label).map(m => 
				this.tokenize(m.text));
	}
	
	scoreGroup(classificationTokens, group, groupCount){
		return classificationTokens.map(ct => {
			const countIn = group.filter(hg => 
				hg.indexOf(ct) !== -1).length;
			const tokenScore = this.laplace(countIn, groupCount);
			return {
				token:ct,
				value: tokenScore
			}				
		});
	}
	
	analyze(messages, classificationTokens){
		console.log('Analyzing...')
		
		const messageCount = messages.length;		
		
		//spam
		const hamGroup = this.tokenizeGroup(messages, 'ham');
		const hamGroupCount = hamGroup.length;
		
		this.hamProportion = hamGroupCount / messageCount;		
		this.hamScores = this.scoreGroup(classificationTokens, hamGroup, hamGroupCount); 		
		
		//ham
		const spamGroup = this.tokenizeGroup(messages, 'spam');
		const spamGroupCount = spamGroup.length;
		
		this.spamProportion = spamGroupCount / messageCount;		
		this.spamScores = this.scoreGroup(classificationTokens, spamGroup, spamGroupCount);
		
		console.log('Analyzing complete')
	}
	
	summarizeScores(tokens, group, proportion){
		const sum = tokens.map(t => {
			const score = group.filter(s => s.token === t)[0];
			const value = !!score ? Math.log(score.value) : 0;
			return value;
		}).reduce((prev, cur) => prev + cur);	
		const finalSum = Math.log(proportion) + sum;
		return finalSum;
	}
	
	classify(text){
		const tokens = this.tokenize(text).sort();
		if(!tokens){
			console.log(text);
		}
		
		const hamScoresSum = this.summarizeScores(tokens, this.hamScores, this.hamProportion);		
		const spamScoresSum = this.summarizeScores(tokens, this.spamScores, this.spamProportion);		
		
		if(hamScoresSum >= spamScoresSum)
			return 'ham';
			
		return 'spam';
	}
}