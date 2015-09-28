declare class Bayes{
	constructor(tokenzie:Function);
	
	analyze(messages:{label:string; text:string}[], classificationTokens:string[]);
	
	classify(text:string);
}