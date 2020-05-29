// express nos va a ayudar a maejar la rutas 
const { Router } = require('express')
const router = Router()
//const express = require('express');
//import {getDisps} from "../controllers/iot-controller"
const { getDisps, prueba, addDisp, newState, getDispsOn, getDispsOff } = require('../controllers/iot-controller')
//const router = express.Router();

router.get('/iot/dispositivos', getDisps);
router.get('/iot/dispositivos/on', getDispsOn);
router.get('/iot/dispositivos/off', getDispsOff);
router.post('/iot/addDisp', addDisp);
router.post('/iot/newState', newState);
router.get('/prueba', prueba);
module.exports = router