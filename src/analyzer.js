import { Tokenizer } from './tokenizer';

export class Analyzer {	
	
	getProportion(count, total){
		return count / total;
	}
	
	getLaplace(count, total){
		return (count + 1) / (total + 1);
	}
	
	getCountIn(words, word){
		words.filter(w => w === word).length;
	}
	
	scoreToken(words, word, groupSize){
		var count = this.getCountIn(words, word);
		return this.getLaplace(count, groupSize);
	}
	
	analyze(group, totalDocs, classificationTokens){
		var groupSize = group.length;
		var totalSize = totalDocs.length;
		
		var scoredTokens = classificationTokens.map(ct => {
			return {token: ct, score: this.scoreToken(group, ct, groupSize) }
		});
		
		var groupProportion = this.getProportion(groupSize, totalSize)
		
		return {
			proportion: groupProportion,
			tokenFrequenzies: scoredTokens
		}
	}
	
	learn(docs, classificationTokens){
		var total = docs.length;
		var hamGroup = docs.filter(d => d.label === 'ham').map(d => d.tokens);
		var spamGroup = docs.filter(d => d.label === 'spam').map(d => d.tokens);
		
		var hamAnalyzis = this.analyze(hamGroup, total, classificationTokens);		
		var spamAnalyzis = this.analyze(spamGroup, total, classificationTokens);
		
		return [
			{label: 'ham', group: hamGroup},
			{label: 'spam', group: spamGroup},
		]
	}
	
	scoreClass(tokens, foo){
		
	}
	
	classify(groups, text){
		var tokenizer = new Tokenizer();		
		var tokenized = tokenizer.tokenize(text);
		
		
	}
	
	train(docs, classificationTokens) {
		
		var groups = this.learn(docs, classificationTokens);
		var classifier = this.classify()
		
		
				
		var s = "a";
	}
	
	
	
	
	
	
	
	
	
}