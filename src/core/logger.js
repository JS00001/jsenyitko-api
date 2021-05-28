const chalk = require("chalk");
const CLog = console.log;

function log(color, type, message) {
    switch (color) {
        case "red":
            CLog(`${chalk.red(`[${type}] ${chalk.gray(message)}`)}`);
            break;
        case "orange":
            CLog(`${chalk.yellow(`[${type}] ${chalk.gray(message)}`)}`);
            break;
        case "green":
            CLog(`${chalk.green(`[${type}] ${chalk.gray(message)}`)}`);
            break;
        case "blue":
            CLog(`${chalk.blue(`[${type}] ${chalk.gray(message)}`)}`);
            break;
        case "purple":
            CLog(`${chalk.magenta(`[${type}] ${chalk.gray(message)}`)}`);
            break;
        case "white":
            CLog(`${chalk.white(`[${type}] ${chalk.gray(message)}`)}`);
            break;
    }
}

module.exports = {log}