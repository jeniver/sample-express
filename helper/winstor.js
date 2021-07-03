const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');

const { combine, colorize, label, printf, json, timestamp } = format;

const logFormat = combine(
  timestamp(),
  json(),
  colorize(),
  label({ label: '[SARVANA-SERVER]' }),
  printf(
    ({ timestamp: Timestamp, label: Label, level, message, ...info }) =>
      `${Timestamp} ${chalk.cyan(Label)} ${level} : ${message} : ${JSON.stringify({ ...info })}`
  )
);

const logger = createLogger({
  level:'info',
  transports: [
    // new transports.File({
    //   filename: 'logs/error.log',
    //   level: 'error',
    //   format: logFormat,
    // }),
    new transports.Console({}),
  ],
  format: logFormat,
  exitOnError: false,
});

module.exports = logger;
