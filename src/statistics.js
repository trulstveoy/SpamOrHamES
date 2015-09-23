export function bayes(tokens, token, size) {
	let occurence = tokens.filter(t => 
		t === token
	).length;
	
	return laplace(occurence, size);	
}

function laplace(count, total){
	return (count + 1) / total + 1;
}