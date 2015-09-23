import { Tokenizer } from './tokenizer';

export class Analyzer {	
	
	getProportion(count, total){
		return count / total;
	}
	
	getLaplace(count, total){
		return (count + 1) / (total + 1);
	}
	
	getCountIn(words, word){
		var filteredWords = words.filter(w => 
			w === word);
		return filteredWords.length;
	}
	
	innerScore(words, word, groupSize){
		var count = this.getCountIn(words, word);
		return this.getLaplace(count, groupSize);
	}
	
	analyze(group, totalDocs, classificationTokens){
		var groupSize = group.length;		
				
		var scoredTokens = classificationTokens.map(ct => {
			return {token: ct, score: this.innerScore(group, ct, groupSize) }
		});
		
		var groupProportion = this.getProportion(groupSize, totalDocs)
		
		return {
			proportion: groupProportion,
			tokenFrequencies: scoredTokens
		}
	}
	
	learn(label, docs, classificationTokens){
		var total = docs.length;
		var group = docs.filter(d => d.label === label).map(d => d.tokens);		
		var analysis = this.analyze(group, total, classificationTokens);		
		return analysis;
	}
	
	tokenScore(token, group){
		var tokenFreq = group.tokenFrequencies.filter(tf => tf.token === token)[0];
		if(tokenFreq){
			return Math.log(tokenFreq.score);
		}
		return 0;
	}
	
	score(tokens, group){		
		var scores = tokens.map(t => this.tokenScore(t, group));
		var sumScores = scores.reduce((prev, cur) => prev + cur);		
		return Math.log(group.proportion + sumScores);
	}
	
	classify(hamGroup, spamGroup){
		return (text) => {
			var tokenizer = new Tokenizer();		
			var tokens = tokenizer.tokenize(text);
			
			var hamScore = this.score(tokens, hamGroup);
			var spamScore = this.score(tokens, spamGroup);
			
			if(hamScore > spamScore)
				return 'ham';
			
			return 'spam';
		}
	}
	
	train(docs, classificationTokens) {
		
		var hamGroup = this.learn('ham', docs, classificationTokens);
		var spamGroup = this.learn('spam', docs, classificationTokens);
		var classifier = this.classify(hamGroup, spamGroup);
		return classifier;
	}
	
	
	
	
	
	
	
	
	
}