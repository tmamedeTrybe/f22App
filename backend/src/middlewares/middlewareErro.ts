import { NextFunction, Request, Response } from 'express';

const middlewareErro = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message } = err;

  console.log(`name: ${name}`);

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    case 'SequelizeDatabaseError':
    res.status(409).json({ message });
    break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
};

export default middlewareErro;