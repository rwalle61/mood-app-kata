import express from 'express';

import persons from './persons.route';

const router = express.Router();

router.use('/persons', persons);

export default router;
