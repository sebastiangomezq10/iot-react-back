const express = require('express');
//import iotRoutes from "./app/routes/iot-routes";
const iotRoutes= require('./app/routes/iot-routes')
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", iotRoutes);

app.listen(3001).on('listening', () => {
    console.log('App running port ');
 })