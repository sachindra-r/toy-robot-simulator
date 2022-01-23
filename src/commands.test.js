import { placeCommand, turnRightCommand, turnLeftCommand, moveCommand, reportCommand, executeCommand } from './commands.js'
import { logSuccess } from './logger.js'



jest.mock('./logger.js');


test('should return object with x & y coordinates and direction that match the user input',  () => {
    const placeLocation = '1,2,NORTH';
    const returnVal = {
                coordinateX: 1,
                coordinateY: 2,
                direction: 'NORTH'};
    expect(placeCommand(placeLocation)).toMatchObject(returnVal);
});

test('should return false to a empty user input',  () => {
    const placeLocation = '';
    expect(placeCommand(placeLocation)).toBeFalsy();;
});

test('should return false to a invalid x-coordinate',  () => {
    const placeLocation = 'q,2,NORTH';
    expect(placeCommand(placeLocation)).toBeFalsy();;
});

test('should return false to a invalid y-coordinate',  () => {
    const placeLocation = '1,q,NORTH';
    expect(placeCommand(placeLocation)).toBeFalsy();;
});

test('should return the direction to the right when a direction is given',  () => {
    const inputDirection = 'NORTH';
    const returnDirection = 'EAST';
    expect(turnRightCommand(inputDirection)).toBe(returnDirection);
});

test('should return the direction to the left when a direction is given',  () => {
    const inputDirection = 'NORTH';
    const returnDirection = 'WEST';
    expect(turnLeftCommand(inputDirection)).toBe(returnDirection);
});

test('should return changed coordinates to when the its possible to move',  () => {
    const x = 1;
    const y = 2;
    const direction = 'WEST';

    const output = 
        { validMove: true,
            x: 0,
            y: 2,
            direction: 'WEST' };
    
    expect(moveCommand(x,y,direction)).toMatchObject(output);
});

test('should return validMove variable as false to when the its not possible to move',  () => {
    const x = 0;
    const y = 2;
    const direction = 'WEST';

    const output = 
        { validMove: false };
    
    expect(moveCommand(x,y,direction)).toMatchObject(output);
});

test('should call logsuccess method with given output',  () => {
    const x = 0;
    const y = 2;
    const direction = 'WEST';

    const output = 'Output: ' + x + ',' + y + ',' + direction + '\n';
    reportCommand(x, y, direction);
    expect(logSuccess).toHaveBeenCalledWith(output);
});

test('should return false to a invalid direction',  () => {
    const placeLocation = '1,2,NORT';
    expect(placeCommand(placeLocation)).toBeFalsy();;
});

test('should return false when place command called when robot is already placed',  () => {
    const userInputArr = ['PLACE', '1,2,NORTH'];
    const isFirstCommand = false;
    expect(executeCommand(userInputArr, isFirstCommand)).toBeFalsy();;
});

test('should return isFirstCommand value as false when place command called with valid parameters',  () => {
    const userInputArr = ['PLACE', '1,2,NORTH'];
    const isFirstCommand = true;

    const output = {isFirstCommand: false};
    expect(executeCommand(userInputArr, isFirstCommand)).toMatchObject(output);
});

test('should return true when "MOVE" command was successfull',  () => {
    const userInputArr = ['MOVE'];
    const isFirstCommand = false;
    const output = {isFirstCommand: false};
    expect(executeCommand(userInputArr, isFirstCommand)).toBeTruthy();
});

test('should return true when "LEFT" command was successfull',  () => {
    const userInputArr = ['LEFT'];
    const isFirstCommand = false;
    const output = {isFirstCommand: false};
    expect(executeCommand(userInputArr, isFirstCommand)).toBeTruthy();
});

test('should return true when "RIGHT" command was successfull',  () => {
    const userInputArr = ['RIGHT'];
    const isFirstCommand = false;
    const output = {isFirstCommand: false};
    expect(executeCommand(userInputArr, isFirstCommand)).toBeTruthy();
});

test('should call logSuccess function when report command was called',  () => {
    const userInputArr = ['REPORT'];
    const isFirstCommand = false;
    executeCommand(userInputArr, isFirstCommand);
    expect(logSuccess).toHaveBeenCalled();
});

