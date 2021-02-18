import { Request, Response, NextFunction } from 'express';
import { loggerService } from '../logger/logger.service';

export function errorMiddleware(
  error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  loggerService.error('Error occurred: ' + message, '', 'Error Middleware');
  response.status(status).send({
    status,
    message,
  });
}
