import { bayes } from './statistics';

let tokenize = function(text){
	if(!text){
		console.log('text is nothing');
	}
	return text.match(/\w+/gi);	
}

export default function analyze(messages, classificationTokens) {		
	if(!messages){
		console.log('messages is nothing')
	}		
	
	//ham
	const hamMessages = messages.filter(m => m.label === 'ham');
	const spamMessages = messages.filter(m => m.label === 'spam');
	
	const messageCount = messages.length;
	
	const hamCount = hamMessages.length;
	const hamProportion = hamCount / messageCount;
	const hamWords = [].concat.apply([], hamMessages.map(m => 
		tokenize(m.text)	
	));	
	const hamScores = classificationTokens.map(ct => {
		return {token: ct, score: bayes(hamWords, ct, hamCount)};		
	});	
		
	//spam
	const spamCount = spamMessages.length;	
	const spamProportion = spamCount / spamMessages;
	const spamWords = [].concat.apply([], spamMessages.map(m => 
		tokenize(m.text)	
	));
	const spamScores = classificationTokens.map(ct => {
		return {token: ct, score: bayes(spamWords, ct, hamCount)};		
	});
	
	return (text) => {
		const tokens = tokenize(text);
		//ham
		const hamSums = tokens.map(t => {
			let freq = hamScores.filter(s => s.token === t)[0];
			return !!freq ? Math.log(freq.score): 0;				
		})
		const hamSum = hamSums.reduce((prev, cur) => prev + cur);	
		const finalHamScore = Math.log(hamProportion + hamSum);		
		
		//spam
		const spamSums = tokens.map(t => {
			let freq = spamScores.filter(s => s.token === t)[0];
			return !!freq ? Math.log(freq.score): 0;				
		})
		var spamSum = spamSums.reduce((prev, cur) => prev + cur);	
		const finalSpamScore = Math.log(spamProportion + spamSum);
		
		if(finalHamScore >= finalSpamScore)
			return 'ham';
			
		return 'spam';
	};		
}

