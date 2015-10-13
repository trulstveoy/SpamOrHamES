import { scoreGroup, summarizeScores } from './bayes'

export default class Analyzer {
	
	constructor(tokenize){
		this.tokenize = tokenize;
	}	
	
	tokenizeGroup(messages, label){
		return messages.filter(m => 
			m.label === label).map(m => 
				this.tokenize(m.text));
	}	
	
	analyze(messages, classificationTokens){
		console.log('Analyzing...')
		
		const messageCount = messages.length;	
				
		//spam
		const hamGroup = this.tokenizeGroup(messages, 'ham');
		const hamGroupCount = hamGroup.length;
		
		this.hamProportion = hamGroupCount / messageCount;		
		//hamMap?
		this.hamScores = scoreGroup(classificationTokens, hamGroup, hamGroupCount); 		
		
		//ham
		const spamGroup = this.tokenizeGroup(messages, 'spam');
		const spamGroupCount = spamGroup.length;
		
		this.spamProportion = spamGroupCount / messageCount;		
		this.spamScores = scoreGroup(classificationTokens, spamGroup, spamGroupCount);
		
		console.log('Analyzing complete')
	}
		
	classify(text){
		const tokens = this.tokenize(text).sort();
		if(!tokens){
			console.log(text);
		}
		
		const hamScoresSum = summarizeScores(tokens, this.hamScores, this.hamProportion);		
		const spamScoresSum = summarizeScores(tokens, this.spamScores, this.spamProportion);		
		
		if(hamScoresSum >= spamScoresSum)
			return 'ham';
			
		return 'spam';
	}
}