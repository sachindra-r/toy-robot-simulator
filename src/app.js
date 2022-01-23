import readline from 'readline';
import { executeCommand} from './commands.js';
import { validateCommand } from './validations.js';
import { printHeader } from './header.js';

let isFirstCommand = true; //Till the first "PLACE" is executed 

printHeader();

/**
 * Removing input whitespaces, converting to a string and then turning all the characters to uppercase.
 *
 * @param {string} userInput User input from commandline
 */
const cleanUserInput = (userInput) => {
    return userInput.trim()
    .toString()
    .toUpperCase(); 
}

/**
 * Creating a interface to get the standard input and output
 *
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });   

/**
 * Clean the userinput then after validating execute the command 
 *
 * @param {string} userInput User input from commandline
 */
const startSimulator = (userInput) => {
    userInput = cleanUserInput(userInput);
    const userInputArr = validateCommand(userInput, isFirstCommand);
    if (userInputArr) {
       const returnStatus = executeCommand(userInputArr, isFirstCommand);
       if (returnStatus) {
            isFirstCommand = returnStatus.isFirstCommand !== undefined ? returnStatus.isFirstCommand : isFirstCommand;
       }
    }
}    

/**
 * Using readline calling question method to process the user input
 * Then passing the input to startStimulator method
 */
const recursiveReadLine = function () {
    rl.question('',(userInput) => {
         startSimulator(userInput);
      recursiveReadLine(); //Calling this function again to get the user input
    });
  };


recursiveReadLine();

