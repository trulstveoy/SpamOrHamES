
function analyzeType(messages, classificationTokens, type) {
	const messageCount = messages.length;
	const typeMessages = messages.filter(m => m.label === type);
	const type = typeMessages.length;
	const typeWords = [].concat.apply([], typeMessages.map(m => this.tokenize(m.text)));
	const proportion = type / messageCount;
	const scores = classificationTokens.map(ct => {
		return {token: ct, score: this.score(typeWords, ct, type)};
	});

	return {proportion, scores};
}

function classifyType(tokens, type) {
	const sums = tokens.map(t => {
		let freq = type.scores.filter(s => s.token === t)[0];
		return !!freq ? Math.log(freq.score): 0;
	});
	const sum = sums.reduce((prev, cur) => prev + cur);

	return Math.log(type.proportion + sum);
}

export default class Bayes {
	
	constructor(tokenize){
		this.tokenize = tokenize;
	}
	
	laplace(count, total){
		return (count + 1) / total + 1;
	}
	
	score(tokens, token, size) {
		const occurence = tokens.filter(t =>
			t === token
		).length;
		
		return this.laplace(occurence, size);	
	}	
	
	analyze(messages, classificationTokens){
		this.ham = analyzeType(messages, classificationTokens, 'ham');
		this.spam = analyzeType(messages, classificationTokens, 'spam');
	}
	
	classify(text){
		const tokens = this.tokenize(text);
		const finalHamScore = classifyType(tokens, this.ham);
		const finalSpamScore = classifyType(tokens, this.spam);
		
		return finalHamScore >= finalSpamScore ? 'ham' : 'spam';
	}
}