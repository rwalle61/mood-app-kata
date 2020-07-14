import { Request, Response, Application } from 'express';
import log4js from 'log4js';

import { inspect } from 'util';

import { defaultLogLevel } from '../config';
import { isEmpty } from '.';

const contextName = 'context';
const config = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: `%[[%d{dd/MM/yy hh:mm:ss} %X{${contextName}}] [%p]%] %m`,
      },
    },
  },
  categories: { default: { appenders: ['out'], level: defaultLogLevel } },
};

const validLevels = ['error', 'warn', 'info', 'debug', 'trace'];

export const setLoggingLevel = (level: string): void => {
  if (!validLevels.includes(level)) {
    throw new Error('INVALID_LEVEL');
  }
  config.categories.default.level = level;
  log4js.configure(config);
};

class Logger {
  log;

  constructor(context: string) {
    this.log = log4js.getLogger();
    log4js.configure(config);
    this.log.addContext(contextName, context);
  }

  trace(msg: string): void {
    this.log.trace(msg);
  }

  debug(msg: string): void {
    this.log.debug(msg);
  }

  info(msg: string): void {
    this.log.info(msg);
  }

  warn(msg: string): void {
    this.log.warn(msg);
  }

  error(msg: string): void {
    this.log.error(msg);
  }

  logAllApiCalls(app: Application): void {
    app.use((req, res, next) => {
      this.logRequest(req);
      this.logResponse(req, res);
      next();
    });
  }

  logRequest(req: Request): void {
    const route = `${req.method} ${req.path}`;
    let msg = `${route} called`;
    if (!this.log.isTraceEnabled()) {
      this.debug(msg);
    } else {
      msg += ` with \n req.body ${inspect(req.body)}`;
      if (req.query && !isEmpty(req.query)) {
        msg += `, and \n req.query ${inspect(req.query)}`;
      }
      this.trace(msg);
    }
  }

  logResponse(req: Request, res: Response): void {
    res.on('finish', () => {
      const route = `${req.method} ${req.path}`;
      this.trace(`responded to ${route} with status ${res.statusCode}`);
    });
  }
}

export default Logger;
