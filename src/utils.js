export function flattenArray(arr){
	return [].concat(...arr);
}

export function uniqueArray(arr){
	return [...new Set(arr)];
}