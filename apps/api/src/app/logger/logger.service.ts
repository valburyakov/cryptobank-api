import pinoLogger from 'pino';
import cls from 'cls-hooked';
import { APP_ID, LOGGER_ID } from './logger.constants';

const logger = pinoLogger({
  prettyPrint: process.env.NODE_ENV === 'development',
});

export class PinoLoggerService {
  init(traceId) {
    const clsNamespace = cls.getNamespace(APP_ID);
    const childLogger = logger.child({
      traceId,
    });
    clsNamespace.set(LOGGER_ID, childLogger);
  }

  error(message: string, trace?: string, context?: string) {
    this.pino.error(this.getMessage(message, context));
    if (trace) {
      this.pino.error(trace);
    }
  }

  log(message: string, context?: string) {
    this.pino.info(this.getMessage(message, context));
  }

  warn(message: string, context?: string) {
    this.pino.warn(this.getMessage(message, context));
  }

  private getMessage(message: any, context?: string) {
    return context ? `[${context}] ${message}` : message;
  }

  private get pino(): pinoLogger.Logger {
    const clsNamespace = cls.getNamespace(APP_ID);
    const childLogger = clsNamespace.get(LOGGER_ID);
    return childLogger ? childLogger : logger;
  }
}

export const loggerService = new PinoLoggerService();
