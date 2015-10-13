function laplace(count, total){
	return (count + 1) / (total + 1);
}

function score(tokens, token, size) {
	let occurence = tokens.filter(t => 
		t === token
	).length;
	const score = laplace(occurence, size);
	return score;	
}

export function scoreGroup(classificationTokens, group, groupCount){
	return classificationTokens.map(ct => {
		const countIn = group.filter(hg => 
			hg.indexOf(ct) !== -1).length;
		const tokenScore = laplace(countIn, groupCount);
		return {
			token:ct,
			value: tokenScore
		}				
	});
}

export function summarizeScores(tokens, group, proportion){
	const sum = tokens.map(t => {
		const score = group.filter(s => s.token === t)[0];
		const value = !!score ? Math.log(score.value) : 0;
		return value;
	}).reduce((prev, cur) => prev + cur);	
	const finalSum = Math.log(proportion) + sum;
	return finalSum;
}

