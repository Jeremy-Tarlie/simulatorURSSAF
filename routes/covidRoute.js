import express from 'express';
import { covidData } from '../controllers/covidController.js';

const router = express.Router();

router.get('/', covidData);

export default router;