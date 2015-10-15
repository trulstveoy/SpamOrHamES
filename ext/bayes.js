function laplace(count, total){
	return (count + 1) / (total + 1);
}

export function scoreToken(token, group){
	const groupCount = group.length;
	const countIn = group.filter(hg => 
			hg.indexOf(token) !== -1).length;
	const tokenScore = laplace(countIn, groupCount);
	return tokenScore;		
}

export function classifyTokens(tokens, scores, proportion){
	const sum = tokens.map(t => {
		const score = scores.filter(s => s.token === t)[0];
		const value = !!score ? Math.log(score.value) : 0;
		return value;
	}).reduce((prev, cur) => prev + cur);	
	const finalSum = Math.log(proportion) + sum;
	return finalSum;
}

