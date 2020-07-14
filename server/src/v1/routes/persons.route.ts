import express from 'express';

import * as personsController from '../controllers/persons.controller';

const router = express.Router();

router.get('/', personsController.getPersons);

export default router;
