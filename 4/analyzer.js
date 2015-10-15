import { scoreToken, classifyTokens } from './bayes'

export default class Analyzer {
	
	constructor(tokenize){
		this.tokenize = tokenize;
	}	
	
	tokenizeGroup(messages, label){
		return messages.filter(m => 
			m.label === label).map(m => 
				this.tokenize(m.text));
	}	
	
	scoreGroup(classificationTokens, group, groupCount){
		return classificationTokens.map(token => {		
			return {
				token: token,
				value: scoreToken(token, group, groupCount)
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
		this.hamScores = this.scoreGroup(classificationTokens, hamGroup); 		
		
		//ham
		const spamGroup = this.tokenizeGroup(messages, 'spam');
		const spamGroupCount = spamGroup.length;
		
		this.spamProportion = spamGroupCount / messageCount;		
		this.spamScores = this.scoreGroup(classificationTokens, spamGroup);
		
		console.log('Analyzing complete');
	}
		
	classify(text){
		const tokens = this.tokenize(text).sort();
		if(!tokens){
			console.log(text);
		}
		
		const hamScoresSum = classifyTokens(tokens, this.hamScores, this.hamProportion);		
		const spamScoresSum = classifyTokens(tokens, this.spamScores, this.spamProportion);		
		
		if(hamScoresSum >= spamScoresSum)
			return 'ham';
			
		return 'spam';
	}
}