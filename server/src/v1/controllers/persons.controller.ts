import { Request, Response } from 'express';

import * as personsService from '../services/persons.service';

export const getPersons = (req: Request, res: Response): void => {
  const persons = personsService.getPersons();
  res.status(200).send(persons);
};
