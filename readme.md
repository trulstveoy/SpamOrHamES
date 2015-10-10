# To get started:

* Install Node (https://nodejs.org/)
* Run command `npm install`

## Oppgave 1 - Enkel klassifisering
Lag en enkel classify-funksjon som tar inn en streng og returnerer hvorvidt
teksten er spam eller ham. Funksjonen kan skrives i src/main.js hvor det også
noen meldinger som funksjonen kan anvendes på. Hint: I spamn forekommer ofte order
"free". Bruk så mye ES-6-funksjonalitet du kan, en fin start er let, const og arrow
functions.

##Oppgave 2

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