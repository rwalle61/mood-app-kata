import { Request, Response } from 'express';

import * as checkInsService from '../services/checkins.service';

export const getCheckIns = (req: Request, res: Response): void => {
  const checkIns = checkInsService.getCheckIns();
  res.status(200).send(checkIns);
};

export const postCheckIns = (req: Request, res: Response): void => {
  checkInsService.addCheckIn(req.body);
  res.sendStatus(201);
};
