const express = require('express');
const simulatorController = require('../controllers/simulatorController');
const router = express.Router();


router.post('/', simulatorController.simulator);

