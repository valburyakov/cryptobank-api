import { Request, Response, NextFunction } from 'express';
import { loggerService } from '../logger/logger.service';
import { Boom, isBoom } from '@hapi/boom';

export function errorMiddleware(
  error: Boom | Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = isBoom(error) ? error.output.statusCode : 500;
  const message = isBoom(error) ? error.message : 'Something went wrong';
  loggerService.error('Error occurred: ' + message, '', 'Error Middleware');
  response.status(status).send({
    status,
    message,
  });
}
