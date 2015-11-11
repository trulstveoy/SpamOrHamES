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

7. Øysteins link til diverse

## Assignment 1 - Hello World
We're starting by making sure that the environment is working correctly. We're going to write hello world,
compile, run and debug our program. All of the assignments will be
using NodeJS as runtime for a command line program. We're not using Node directly but through
the editor, VSCode. 

Similar to regular Visual Studio, a program can be started by pressing the F5 key. The 
entrypoint of the application is the file src\main.js. Modify it to write "hello world" to the console. Save the file.
Notice that gulp has compiled the file into lib\main.js, and outputted some info to the command line.
Run the program by pressing F5. A new command window should be displayed and print "hello world". Put a
break point in src/main.js. Rerun with F5. Notice that VSCode goes into debug mode.

## Assignment 2 - Simple classification
Create a classify-function. The function takes a string parameter and returns whether the string
is spam or ham. Write the function in src/main.js. There you'll also find some messages that
you can apply your function to. Write to console the percentage of correct results.

Hints:
1. Use ES6 features let, const, arrow function and string literals. 
2. The word "free" appears frequently in spam.
3. In javascript for(..)-constructs isn't used very frequently. Instead you have LINQ-like features for list transformation.
Map (similar to LINQs Select) and Reduce (similar to LINQs Aggregate) may be handy.

# Assignment 3 - Read from file







## Assignment 4 - Analyze and classify.




I spamgjenkjenning er det som regel slik at man avender historiske data som grunnlag for å avgjøre om noe er spam eller ham. Benytt en del av datasettet for å trene opp algoritmen din. Når det er gjort kan de resterende data anvendes for å måle hvor god metoden er. La oss kalle treningen for analyse, mens andre steg, målingen, kalles for klassifisering. Vi trenger en funksjon analyze(..) og en funksjon classify(..).

Hint: I en slik tostegs-operasjon er det naturlig at analyze- og classify-funksjonene deler tilstand. Klasser kan ha tilstand.

I analysefasen er det et poeng at man vekter alle ord og gir dem en score i henhold til hvor ofte de forekommer i treningssettet. En Map() kan ha ord/score.

For å vekte ord er det nødvendig å kunne dele opp en tekst i ord. For å dele opp en tekst-streng i et array av tokens (ord) så er det praktisk med en tokenize-funksjon som benytter regex. Feks noe slikt, som gir lowercase tokens:

const lowercaseTokens = (text.match(/\w+/gi) || []).map(t => t.toLowerCase());




Solutions can be found here: https://github.com/trulstveoy/SpamOrHamES/tree/solutions
