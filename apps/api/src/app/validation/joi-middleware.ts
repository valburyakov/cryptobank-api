import Joi from 'joi';
import { loggerService } from '../logger/logger.service';
import { Request, Response, NextFunction } from 'express';

export const validateSchema = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    loggerService.log(`Validation started`, '[Validation Middleware]');

    const { error } = schema.validate(req.body, { abortEarly: false });
    const valid = error === undefined;

    if (valid) {
      next();
    } else {
      const { details } = error;
      console.log(details);
      const message = details.map((i) => i.message).join(',');

      loggerService.error(
        `Validation failed`,
        message,
        '[Validation Middleware]'
      );
      res.status(422).json({ error: message });
    }
  };
};
