import express from "express";
import iotRoutes from "./app/routes/iot-routes";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("", iotRoutes);

app.listen(3000).on('listening', () => {
    console.log('App running');
 })