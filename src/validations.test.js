import { validateCoordinates, validateDirection, validateCommand } from './validations.js';
import { validCoordinateValues, validDirections, validCommands } from './constants.js';
import { is } from '@babel/types';

test('should return false if given coordinatates are not numbers',  () => {
    const x = 'w';
    const y = '3';
    expect(validateCoordinates(x,y)).toBeFalsy();
});

test('should return false if given coordinatates are not in the given range',  () => {
    const x = 1;
    const y = 10;
    expect(validateCoordinates(x,y)).toBeFalsy();
});

test('should return true if given coordinatates are numbers and within valid range',  () => {
    const x = 1;
    const y = 3;
    expect(validateCoordinates(x,y)).toBeTruthy();
});

test('should return false if given direction is not valid',  () => {
    const direction = 'NOORTH';
    expect(validateDirection(direction)).toBeFalsy();
});

test('should return true if given directionis valid',  () => {
    const direction = 'NORTH';
    expect(validateDirection(direction)).toBeTruthy();
});

test('should return false if given input is invalid',  () => {
    const input = 'PLA';
    const isFirstCommand = true;
    expect(validateCommand(input, isFirstCommand)).toBeFalsy();
});

test('should return false if first command is not a "PLACE" command',  () => {
    const input = 'MOVE';
    const isFirstCommand = true;
    expect(validateCommand(input, isFirstCommand)).toBeFalsy();
});

test('should return object with user input command as an array',  () => {
    const input = 'MOVE';
    const isFirstCommand = false;

    let output = ['MOVE'];
    expect(validateCommand(input, isFirstCommand)).toEqual(output);
});

