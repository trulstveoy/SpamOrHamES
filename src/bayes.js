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
	
	analyze(messages, classificationTokens){
		
		const messageCount = messages.length;
		
		//ham
		const hamGroup = messages.filter(m => 
			m.label === 'ham').map(m => 
				this.tokenize(m.text));
		const hamGroupCount = hamGroup.length;
		
		this.hamProportion = hamGroupCount / messageCount;		
		this.hamScores = classificationTokens.map(ct => {
			const countIn = hamGroup.filter(hg => 
				hg.indexOf(ct) !== -1).length;
			const tokenScore = this.laplace(countIn, hamGroupCount);
			return {
				token:ct,
				value: tokenScore
			}				
		});
		
		//ham
		const spamGroup = messages.filter(m => 
			m.label === 'spam').map(m => 
				this.tokenize(m.text));
		const spamGroupCount = spamGroup.length;
		
		this.spamProportion = spamGroupCount / messageCount;		
		this.spamScores = classificationTokens.map(ct => {
			const countIn = spamGroup.filter(hg => 
				hg.indexOf(ct) !== -1).length;
			const value = this.laplace(countIn, spamGroupCount);
			return {
				token:ct,
				value: value
			}				
		});
		
		console.log(this.hamProportion);
		//console.log(this.hamScores);
		
		console.log(this.spamProportion);
		//console.log(this.spamScores);		
	}
	
	classify(text){
		const tokens = this.tokenize(text).sort();		
		if(!tokens){
			console.log(text);
		}
		
		//console.log('ham-------------------------------------------');
		const hamScoresSum = tokens.map(t => {
			const score = this.hamScores.filter(s => s.token === t)[0];
			const value = !!score ? Math.log(score.value): 0;
			//console.log(t + ' ' + value);
			return value;
		}).reduce((prev, cur) => prev + cur);	
		//const test = this.hamProportion + hamScoresSum;
		const finalHamScore = Math.log(this.hamProportion) + hamScoresSum;		
		//console.log('HamScore: ' + finalHamScore);
		//console.log('d ' + test);
		//console.log(Math.log(-40.208231123065495));
		
		//console.log('spam-------------------------------------------');
		const spamScoresSum = tokens.map(t => {
			const score = this.spamScores.filter(s => s.token === t)[0];
			const value = !!score ? Math.log(score.value): 0;
			//console.log(t + ' ' + value);
			return value;			
		}).reduce((prev, cur) => prev + cur);		
		const finalSpamScore = Math.log(this.spamProportion) + spamScoresSum; 
		//console.log('SpamScore: ' + finalSpamScore);		
		
		if(finalHamScore >= finalSpamScore)
			return 'ham';
			
		return 'spam';
	}
}