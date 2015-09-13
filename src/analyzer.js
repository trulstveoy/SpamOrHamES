export default function analyze(messages){
	
	var map = new Map();
	for(let message of messages){
		
	}
	
	return function(text){
		return 'ham';
	}
}


let classify = function(text){
	if(text.toLowerCase().indexOf('free') === -1){	
		return 'ham';
	} else{
		return 'spam';
	}
}

let tokenize = function(text){
	return text.match(/\w+/gi);	
}

