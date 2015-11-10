## To get the environment running:
1. Install Node. https://nodejs.org/en/
2. Install VSCode. https://code.visualstudio.com/  
3. Download assignments https://github.com/trulstveoy/SpamOrHamES/archive/master.zip
4. and unnzip content to c:\spamorham (the content of SpamOrHamES-master in the zip...)
5. Open cmd.exe and go to c:\spamorham
3. Run `npm install gulp -g`
4. Run `npm install`
5. Run `gulp watch`
6. Open VSCode. Choose File->Open Folder. Choose c:\spamorham

## Assignment 1 - Hello World
We're starting by making sure that the environment is working correctly. We're going to write hello world,
compile, run and debug our program. All of the assignments will be
using NodeJS as runtime for a command line program. We're not using Node directly but through
the editor, VSCode. Similar to regular Visual Studio, a program can be started by pressing the F5 key. The 
entrypoint of the application is the file src\main.js. Modify it to write "hello world" to the console. Save the file.
Notice that gulp has compiled the file into lib\main.js, and outputted some info to the command line.
Run the program by pressing F5. A new command window should be displayed and print "hello world". Put a
break point in src/main.js. Rerun with F5. Notice that VSCode goes into debug mode.

## Assignment 2 - Simple classification
Lag en enkel classify-funksjon som tar inn en streng og returnerer hvorvidt
teksten er spam eller ham. Funksjonen kan skrives i src/main.js hvor det også er
noen meldinger som funksjonen kan anvendes på. Skriv til konsollet hvor mange prosent
riktig du fikk.

Hint: 
I spam forekommer ofte order "free". Bruk så mye ES6-funksjonalitet du kan,
en fin start er let, const og arrow functions.

Skriv til konsoll kan benytte string literals.