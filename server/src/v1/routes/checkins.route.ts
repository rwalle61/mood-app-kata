import express from 'express';

import * as checkInsController from '../controllers/checkins.controller';

const router = express.Router();

router.get('/', checkInsController.getCheckIns);
router.post('/', checkInsController.postCheckIns);

export default router;
