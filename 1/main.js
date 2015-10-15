console.log('start');

const messages = [
	{label:'ham', text:'o until jurong point, crazy.. Available only in bugis n great world la e buffet... Cine there got amore wat...'},
	{label:'spam', text:'FreeMsg Hey there darling it\'s been 3 week\'s now and no word back! I\'d like some fun you up for it still? Tb ok! XxX std chgs to send, £1.50 to rcv'},
	{label:'ham', text:'ham	Eh u remember how 2 spell his name... Yes i did. He v naughty make until i v wet.'},
	{label:'spam', text:'07732584351 - Rodger Burns - MSG = We tried to call you re your reply to our sms for a free nokia mobile + free camcorder. Please call now 08000930705 for delivery tomorrow'},
	{label:'ham', text:'Just forced myself to eat a slice. I\'m really not hungry tho. This sucks. Mark is getting worried. He knows I\'m sick when I turn down pizza. Lol'},
	{label:'spam', text:'Thanks for your subscription to Ringtone UK your mobile will be charged £5/month Please confirm by replying YES or NO. If you reply NO you will not be charged'},
	{label:'ham', text:'Pls go ahead with watts. I just wanted to be sure. Do have a great weekend. Abiola'},
	{label:'spam', text:'As a valued customer, I am pleased to advise you that following recent review of your Mob No. you are awarded with a £1500 Bonus Prize, call 09066364589'},
	{label:'ham', text:'Its not the same here. Still looking for a job. How much do Ta\'s earn there.'},
	{label:'spam', text:'Sunshine Quiz Wkly Q! Win a top Sony DVD player if u know which country the Algarve is in? Txt ansr to 82277. £1.50 SP:Tyrone'},
];

function classify(text){
	if(text.toLowerCase().indexOf('free') === -1) {	
		return 'ham2';
	} else{
		return 'spams';
	}
}

const correct = messages.map(m =>
	m.label === classify(m.text) ? 1 : 0
).reduce((p,c) => 
	p + c
);

const avg = (correct / messages.length) * 100;

console.log(`Correcly validated ${avg}%`);

console.log('end');