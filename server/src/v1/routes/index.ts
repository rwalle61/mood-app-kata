import express from 'express';

import checkIns from './checkins.route';

const router = express.Router();

router.use('/checkins', checkIns);

export default router;
