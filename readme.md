## To get the environment running:
1. Install Node. https://nodejs.org/en/
2. Install VSCode. https://code.visualstudio.com/  
3. Download assignments https://github.com/trulstveoy/SpamOrHamES/archive/master.zip
4. and unnzip content to c:\spamorham (the content of SpamOrHamES-master in the zip...)
5. Open cmd.exe and go to c:\spamorham
3. Run `npm install gulp -g`
4. Run `npm install`
5. Run `gulp watch` (this runs our compiler)
6. Open VSCode. Choose File->Open Folder. Choose c:\spamorham

7. Øysteins link til diverse

## Assignment 0 - Hello World
We're starting by making sure that the environment is working correctly. We're going to write hello world,
compile, run and debug our program. All of the assignments will be
using NodeJS as runtime for a command line program. We're not using Node directly but through
the editor, VSCode. 

Now we're going to run the program. The entry point of the application
is the file src\main.js. Modify it to write "hello world" to the console. Save the file.
Notice that gulp has compiled the file into lib\main.js and written some info to the console.
Run the program by pressing F5. A new command window should be displayed and print "hello world". Put a
break point in src/main.js. Rerun with F5. Notice that VSCode goes into debug mode.

## Assignment 1 - Simple classification
Create a classify-function. The function takes a string parameter and returns whether the string
is spam or ham. Write the function in src/main.js. There you'll also find some messages that
you can apply your function to. Print to console the percentage of correct results.

###Hints:
1. Use ES6 features let, const, arrow function and string literals. 
2. The word "free" appears frequently in spam.
3. In javascript for(..)-constructs isn't used very frequently. Instead you have LINQ-like features for list transformation.
Map (similar to LINQs Select) and Reduce (similar to LINQs Aggregate) may be handy.

## Assignment 2 - Read from file
Extend the program to read from file and parse the file contents. You'll find spam/ham-messages in the data folder.
We're going to use the small file. The messages have the same structure as the array in assignment 2. 
Label/text is separated by tab. Each line is separated by newline.

###Hints:
1. The messages in the file have the structure label/text. We can use the ES6-feature destructuring.
2. To read from file we'll use Node's file system module called 'fs'. It can be imported using the ES6 module syntax. Use the "import * as"-syntax.
3. The function we'll use on the fs-module is named readFileSync(filePath, 'utf-8') which will return the content of the file as string.
4. We can get the running folder from Node by using the global variable __dirname.
5. To concatinate a path we can use the function `path.join(__dirname, filename)` located in Node's path module.

## Assignment 3 - Analyze and classify
When trying recognizing spam it's common technique to use historic data to decide if an unknown message is spam or ham. Now we're going 
to build an algorithm that will be trained with a part of our dataset. With the rest of our data set we'll find out how intelligent our algorithm is.

We'll split the task in two. The first part is the analyzation. We'll train our algorithm, teach it to recognize spam.
The second part is the classification. We'll measure how good our algorithm is at recognizing spam.

###Hints:
1. Split the messages array in two, validation (20 items) and training (the rest). You can use the array-function 'splice'. 
2. Since we're trainng and analyzing we need to keep some kind of state. Classes are good at state. Create an ES6 class.
4. The class needs an analyze-method. This method should do a few things:
	* Take the training array as parameter.
	* Tokenize each message so that we get an array of tokens (words). You can use this snippet:
	  ```
	  const lowercaseTokens = (text.match(/\w+/gi) || []).map(t => t.toLowerCase());
      ```
	* Score each word. If the word is within a ham message +1, withing a spam message -1.
	* Add every word to a Map (ES6 feature) toghether with its score.
	* Finally we should hav a map of every word in all our training messages, and a score for each word.
5. The class also needs a classify-method. It should do a few things too:
	* Take a single validation message as parameter
	* Tokenize the message
	* Look up each word in the Map created during analyzation and find it's score.
	* Summarize the score for each message. If it's above 0, it's ham. Below, its spam.
6. Print to console the percentage of correct results.

![Image of algorithm](https://github.com/trulstveoy/SpamOrHamES/blob/master/illustration.jpg)

Solutions can be found here: https://github.com/trulstveoy/SpamOrHamES/tree/solutions, in folders 1,2,3