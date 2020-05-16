// expres nos va a ayudar a maejar la rutas 
import express from "express";
import {peticion} from "../controllers/iot-controller"

const router = express.Router();

router.post('iot/peticion',peticion)

export default router;