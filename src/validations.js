import { logSuccess, logInfo, logError } from './logger.js';
import { validCoordinateValues, validDirections, validCommands } from './constants.js';

/**
 * Validate input x and y coordinates to match the given range and check if they are integers.
 *
 * @param {integer} x  x-coordinate 
 * @param {integer} y  y-coordinate 
 */
const validateCoordinates = (x, y) => {   
    if (Number.isInteger(x) && Number.isInteger(y)) {
        if (validCoordinateValues.indexOf(x) !== -1 && validCoordinateValues.indexOf(y) !== -1) {
            return true;
        } else {
            const tableLegth = validCoordinateValues.length -1;
            logError(`x & y coordinates should be in the range of 0 - ${tableLegth}`);
            return false;
        }
    } else {
        logError('x & y coordinates should be number')
        return false;
    }    
}


/**
 * Check the direction passed by comparing it the directions stored in constant values
 *
 * @param {string} direction  direction whether its NORTH, SOUTH, EAST or WEST
 */
const validateDirection = (direction) => {
    if (validDirections.indexOf(direction) !== -1){
        return true;
    } else {
        logError(`Please enter one of the valid directions: ${validDirections}`);
        return false;
    }
}


/**
 * Check user input is a valid and the initial command is "PLACE" command
 *
 * @param {string} input  user input from command line
 * @param {boolean} isFirstCommand  value to check the "PLACE" command has been used
 */
const validateCommand = (input, isFirstCommand) => {
    let userInputArr = input.split(' ');
    const command = userInputArr[0];
    if (command && validCommands.indexOf(command) !== -1){
        if (isFirstCommand && command !== 'PLACE') {
            logError('Robot is not on table. \nPlace robot using command - "PLACE <x-coordinate>,<y-coordinate>,<direction>"')
            return  false;
        } else {
            return userInputArr;
        }
    }
    else{
        logError('Please Enter a valid command: PLACE, MOVE, LEFT, RIGHT, REPORT'); 
        return false;
    }
}
export { validateCoordinates, validateDirection, validateCommand }