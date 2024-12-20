import express from 'express';
import { simulator } from '../controllers/simulatorController.js';

const router = express.Router();

router.post('/', simulator);

export default router;