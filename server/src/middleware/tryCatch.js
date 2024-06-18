import { NextFunction, Response, Request } from 'express';

export const tryCatch = (fn: (req, res, next) => ) => {
  return (req, res, next): void => {
    fn(req, res, next).catch(next);
  };
};
