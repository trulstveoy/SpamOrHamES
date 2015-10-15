# To get started:

* Install Node (https://nodejs.org/)
* Run command `npm install`

#Om oppgavene
Vi skal lage en enkel spam-gjenkjennings-funksjon. Vi har et datasett med spam
og ham fra SMS vi benytter som utgangspunkt.

## Oppgave 1 - Enkel klassifisering
Lag en enkel classify-funksjon som tar inn en streng og returnerer hvorvidt
teksten er spam eller ham. Funksjonen kan skrives i src/main.js hvor det også er
noen meldinger som funksjonen kan anvendes på. 

Hint: 
I spam forekommer ofte order "free". Bruk så mye ES6-funksjonalitet du kan,
en fin start er let, const og arrow functions.

##Oppgave 2 - Filinnlesing
Utvid programmet med filinnlesing og parsing. I data-folderen ligger det filer som 
inneholder meldinger med både spam og ham. Meldingene har samme struktur som i 
oppgave 1, og label/text separeres med tab. Hvert label/text-par separeres med newline.

Hint: 
Node har en innebygd fil-IO modul med funksjonen 'readFileSync(filename, 'utf8')'
som leser hele innholdet av en fil. Running folder får man ved å benytte den
globale varibalen '__dirname'.

Node moduler kan importeres med ES6-module syntax. Fillesing/parsing er også en fin
kandidat for modularisering. Meldingene har strukturen label/tekst - kan destructuring
være nyttig her?

##Oppgave 3 - Analysering og klassifisering
I spamgjenkjenning er det som regel slik at man avender historiske data som grunnlag for å avgjøre om
noe er spam eller ham. Benytt en del av datasettet for å trene opp algoritmen din. Når det er gjort
kan de resterende data anvendes for å måle hvor god metoden er. La oss kalle treningen for analyse, mens
andre steg, målingen, kalles for klassifisering. Vi trenger en funksjon analyze(..) og en funksjon
classify(..).

Hint: 
I en slik tostegs-operasjon er det naturlig at analyze- og classify-funksjonene deler tilstand. Klasser kan
ha tilstand.

I analysefasen er det et poeng at man vekter alle ord og gir dem en score i henhold til hvor ofte de
forekommer i treningssettet. En Map() kan ha ord/score.

##Oppgave 4 - Anvend sannsynlighetsteori
Å finne opp gode algoritmer for å score et ord er vanskelig. Men det er heller ikke nødvendig, slike
algorimter er allerede etablert innenfor sannsynlighetsteori og statistikk. Bayes' teorem er slik, og den
skal vi anvende nå.

Bayes vil vekte hvert unike ord i treningssettet, og hvert unike ord vil få to scores. En score for hvor mye
ordet indikerer spam, og en score for hvor mye det indikerer ham. Når dette er gjort er vi klare for
klassifisering. Vi tar alle ordene fra en tekst i valideringssettet og summerer scores gjort i analysen.
Da får vi vite om det scoret høyest som ham, eller høyest som spam.

Hint:
I denne oppgaven er vi opptatt av å vekte ord. For å dele opp en tekst-streng i et array av tokens (ord)
så er det praktisk med en tokenize-funksjon som benytter regex. Feks noe slikt, som gir lowercase tokens:
```
const lowercaseTokens = (text.match(/\w+/gi) || []).map(t => t.toLowerCase());
```

Vi skal vekte alle unike ord i treningssettet. Vi må finne disse og legge i en egen collection. La oss kalle
den 'classificationTokens'. Et Set har unike entries.

I ext-folderen ligger det en modul som heter bayes som vi skal bruke. Den har 2 funksjoner. Den første,
scoreToken, brukes i analysen. Den tar inn parameteret token som er et ord fra classificationTokens, og et
parameter group. Group er et array av token arrays, basert på tekster i valideringssettet, gruppert som ham eller
spam. Den kan se slik ut (spam):
```
[
	['i am spam'],
	['and i am spam too']	
]
```
Eller ham:
```
[
	['i am ham'],
	['and i am ham too']	
]
```
Funksjonen returner en score, og kan altså score for både spam og ham, avhengig av input.

Den andre funksjonen skal brukes i klassifiseringen heter classifyTokens. Den tar inn 3 parametre. 
Den første er unike tokens i en tekst som skal klassifiseres.
Eks: 
```
 ['am', 'i', 'spam', 'or', 'ham']
```

Den andre er et array av object literals som baserer seg på scorede classificationTokens fra analysen. Eks:
```
[
	{ token: 'text', value: 0.123 },
	{ token: 'free', value: 0.321 }
]
```

Den tredje er proportion, forholdet mellom antallet i en gruppe (spam eller ham) og det totale antallet meldinger,
altså group.length / messages.length.