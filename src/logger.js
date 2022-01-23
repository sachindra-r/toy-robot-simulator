import 'colors';

const log = console.log;

const logSuccess = (message) => {
    log(message.green); //green
}

const logInfo = (message) => {
    log(message.yellow);
}

const logError = (message) => {
    log(message.red); //red
}

export { logSuccess, logInfo, logError }