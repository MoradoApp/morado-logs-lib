import * as winston from 'winston';

export const winstonConsoleInfo = () => {
  return new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'HH-MM:ss YYYY-MM-DD' }),
      winston.format.prettyPrint(),
      winston.format.align(),
      winston.format.splat(),
      winston.format.json(),
      winston.format.printf(getLog),
    ),
  });
};

export const getLog = (logInfo: winston.Logform.TransformableInfo): string => {
  let message = `[${logInfo.timestamp}] [${logInfo.level}] :`;

  message = validateMessageProperty(logInfo, message);
  message = validateContextProperty(logInfo, message);
  message = validateStackProperty(logInfo, message);
  message = validateValueProperty(logInfo, message);

  return message;
};

export const validateMessageProperty = (
  logInfo: winston.Logform.TransformableInfo,
  message: string,
): string => {
  if (logInfo.message === '\tundefined') {
    logInfo.message = '';
  }

  if (logInfo.message) {
    if (typeof logInfo.message === 'object') {
      logInfo.message = JSON.stringify(logInfo.message, null, 2);
    }
    message = `${message}${logInfo.message}`;
  }
  return message;
};

export const validateContextProperty = (
  logInfo: winston.Logform.TransformableInfo,
  message: string,
): string => {
  if (logInfo.context) {
    if (typeof logInfo.context === 'object') {
      logInfo.context = JSON.stringify(logInfo.context, null, 2);
    }
    message = `${message}${logInfo.context}`;
  }
  return message;
};

export const validateStackProperty = (
  logInfo: winston.Logform.TransformableInfo,
  message: string,
): string => {
  if (
    logInfo.stack &&
    logInfo.stack.length > 0 &&
    logInfo.stack[0] != undefined
  ) {
    if (typeof logInfo.stack[0] === 'object') {
      logInfo.stack = JSON.stringify(logInfo.stack, null, 2);
    }
    message = `${message}${logInfo.stack}`;
  }
  return message;
};

export const validateValueProperty = (
  logInfo: winston.Logform.TransformableInfo,
  message: string,
): string => {
  if (logInfo.value) {
    if (typeof logInfo.value === 'object') {
      logInfo.value = JSON.stringify(logInfo.value, null, 2);
    }
    message = `${message}${logInfo.value}`;
  }
  return message;
};
