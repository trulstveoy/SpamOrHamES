export class Tokenizer{
	tokenize(text){		
		var lowerText = text.toLowerCase();
		var words = lowerText.match(/\w+/gi);		
		return words; 
	}
}