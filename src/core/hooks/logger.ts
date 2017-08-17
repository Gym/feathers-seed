import * as winston from 'winston';

import { AppHooks } from '../models';

class HookLogger {
  private _logger: any;

  constructor(options: winston.LoggerOptions) {
    this._logger = new winston.Logger(options);
  }

  public log(hook: any) {
    let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

    if (hook.type === 'error') {
      message += `: ${hook.error.message}`;
    }

    this._logger.info(message);
    this._logger.debug('hook.data', hook.data);
    this._logger.debug('hook.params', hook.params);

    if (hook.result) {
      this._logger.debug('hook.result', hook.result);
    }

    if (hook.error) {
      this._logger.error(hook.error);
    }
  }
}

const loggerOptions: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console()
  ]
};
const logger = new HookLogger(loggerOptions);

class LoggerHooks extends AppHooks {
  after = {
    all: [ (hook) => logger.log(hook) ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  };

  error = {
    all: [ (hook) => logger.log(hook) ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  };
}

export default new LoggerHooks();
