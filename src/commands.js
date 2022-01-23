import { logSuccess, logInfo, logError } from './logger.js';
import { validateCoordinates, validateDirection } from './validations.js';
import { validCoordinateValues } from './constants.js';

let coordinateX;
let coordinateY;
let direction;


/**
 * Return x & y coordinates and direction after verifying them
 *
 * @param {string} inputLocation x & y coordinates and direction
 */
const placeCommand = (inputLocation) => {
    if (inputLocation) {
        let placeArr = inputLocation.split(',');
        const inputXCoordinate = Number(placeArr[0]);
        const inputYCoordinate = Number(placeArr[1]);
        const inputDirection = placeArr[2];

        if (validateCoordinates(inputXCoordinate, inputYCoordinate) && validateDirection(inputDirection)) {
            return{
                coordinateX: inputXCoordinate,
                coordinateY: inputYCoordinate,
                direction: inputDirection
            }            
        } else {
            return false;
        }
    } else {
        logError('PLACE command should be as follow - "PLACE <x-coordinate>,<y-coordinate>,<direction>"');
        logError('i.e:- "PLACE 1,2,NORTH"');
        return false;
    }
}


/**
 * Return the direction on the right to the passed direction
 *
 * @param {string} direction direction whether its NORTH, SOUTH, EAST or WEST
 */
const turnRightCommand = (direction) => {
    switch (direction) {
        case 'NORTH':
            return 'EAST';
        case 'EAST':
            return 'SOUTH';
        case 'SOUTH':
            return 'WEST';
        case 'WEST':
            return 'NORTH';
    }  
}

/**
 * Return the direction on the left to the passed direction
 *
 * @param {string} direction direction whether its NORTH, SOUTH, EAST or WEST
 */
const turnLeftCommand = (direction) => {
    switch (direction) {
        case 'NORTH':
            return 'WEST';
        case 'EAST':
            return 'NORTH';
        case 'SOUTH':
            return 'EAST';
        case 'WEST':
            return 'SOUTH';
    }
}


/**
 * Return true or false if the move is going to over the specified range
 *
 * @param {integer} coordinate x or y coordinate
 * @param {boolean} isIncrement value to check if its a increment or a decrement to the coordinate
 */
const isValidMove = (coordinate, isIncrement) => {
    const tableLegth = validCoordinateValues.length - 1;
    let validMove = false;
    switch (isIncrement) {
        case true:
            validMove = coordinate < tableLegth ? true : false;
            break;
        case false:
            validMove = coordinate > 0 ? true : false;
            break;
    }
    return validMove;
}

/**
 * move by incrementing x or y coordinate by one according to the direction
 *
 * @param {integer} x x-coordinate
 * @param {integer} y y-coordinate
 * @param {string} direction direction whether its NORTH, SOUTH, EAST or WEST
 */

const moveCommand = (x, y, direction) => {
    let validMove = false;
    switch (direction) {
        case 'NORTH':
            validMove = isValidMove(y, true) ? true : false;
            y++;
            break;
        case 'EAST':
            validMove = isValidMove(x, true) ? true : false;
            x++;
            break;
        case 'SOUTH':
            validMove = isValidMove(y, false) ? true : false;
            y--;
            break;
        case 'WEST':
            validMove = isValidMove(x, false) ? true : false;
            x--;
            break;
    }
    
    if (validMove) {
        return {validMove: validMove,
                x: x,
                y: y,
                direction: direction }
    } else {
        return {validMove: validMove}
    }
}


/**
 * Log output with x & y coordinates and directions
 *
 * @param {integer} x x-coordinate
 * @param {integer} y y-coordinate
 * @param {string} direction direction whether its NORTH, SOUTH, EAST or WEST
 */
const reportCommand = (x, y, direction) => {
    const output = 'Output: ' + x + ',' + y + ',' + direction + '\n';
    logSuccess(output);
}

/**
 * Check user input is a valid and the initial command is "PLACE" command
 *
 * @param {Array} userInputArr  user input from command line in array format i.e. ['PLACE', '1,2,WEST']
 * @param {boolean} isFirstCommand  value to check the "PLACE" command has been used
 */
const executeCommand = (userInputArr, isFirstCommand) => {
    const command = userInputArr[0];
    if (command === 'PLACE') {
        if (isFirstCommand) {
            const inputLocation = userInputArr[1];
                const result = placeCommand(inputLocation);
                if (result) {
                    isFirstCommand = false;
                    coordinateX = result.coordinateX;
                    coordinateY = result.coordinateY;
                    direction = result.direction;
                } 
                return { isFirstCommand: isFirstCommand };
        } else {
            logError('Robot is already on the table. Please use the other commands: MOVE, LEFT, RIGHT, REPORT');
            return false;
        }
    } else {
        switch (command) {
            case 'MOVE':
                const newLocation = moveCommand(coordinateX, coordinateY, direction);
                if (newLocation && newLocation.validMove) {
                    coordinateX = newLocation.x;
                    coordinateY = newLocation.y;
                    direction = newLocation.direction;
                }
                break;
    
            case 'LEFT':
                direction = turnLeftCommand(direction);
                break;
    
            case 'RIGHT':
                direction = turnRightCommand(direction);
                break;
    
            case 'REPORT':
                reportCommand(coordinateX, coordinateY, direction);
                break;
        }
        return true;
    }
}

export { placeCommand, turnRightCommand, turnLeftCommand, moveCommand, reportCommand, executeCommand }