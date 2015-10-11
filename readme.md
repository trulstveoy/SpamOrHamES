# To get started:

* Install Node (https://nodejs.org/)
* Run command `npm install`

#Om oppgavene
Vi skal lage en enkel spam-gjenkjennings-funksjon. Vi har et datasett med spam
og ham fra SMS vi benytter som utgangspunkt.

## Oppgave 1 - Enkel klassifisering
Lag en enkel classify-funksjon som tar inn en streng og returnerer hvorvidt
teksten er spam eller ham. Funksjonen kan skrives i src/main.js hvor det også
noen meldinger som funksjonen kan anvendes på. 

Hint: 
I spam forekommer ofte order "free". Bruk så mye ES-6-funksjonalitet du kan,
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

I analysefasen er det et poeng at man vekter hvert alle ord og gir dem en score i henhold til hvor ofte de
forekommer i treningssettet. En Map() kan ha ord/score.

##Oppgave 4 - Anvend sannsynlighetsteori
Å finne opp gode algoritmer for å score et ord er vanskelig. Men det er heller ikke nødvendig, slike
algorimter er allerede etablert innenfor sannsynlighetsteori og statistikk. Bayes' teorem er slik, og den
skal vi anvende nå.




## Tasks:
1. Get to know the dataset
2. Parse the dataset. Line is separated by \n. Each line contain two columns separated by \t. First column is the label, 'ham' or 'spam'. 
Second is the message. 
3. A sentence with the word FREE appears more often in spam. Find spam and ham that contain the word.
4. Create a simple classifier that uses the word FREE to determine spam.
5. Message should be word tokenized into array.
6. Seperate training into sets of ham and spam. Calculate token (word) frequency pr set.

## Oppgaver:
1. Lage skall som scorer random, 50% sjanse
2. Telle opp antall ord, vekte dem i forhold til ham/spam
3. Trekke analyzer og laplace ut i egne klasser
4. Importere bayes modul
5. Lage modul av egne analyzers
6. Ansyc filinnlesing med async/await/Promises
7. Gjøre bruk av default parameteres
8. Gjøre bruk av destructuring
9. Lage testsuite

* lag branch for 1,2,3,4
* rendyrk oppgavene 1-4
* dryss ut es6 features