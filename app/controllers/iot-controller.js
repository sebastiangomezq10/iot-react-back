const { httpStatus, errorMessage, successMessage } = require("../helpers/http-status-helper");
const { dbQuery } = require("../db/query");
//API: Apli

/*export const peticion = async (request, response) => {
    //caracteristica de ES6 (OBJECT DESTRUCTURING)que me sirve  que me sirve para leer de una mejor manera que los datos que tiene un objeto 
    const { atrib1, atrib2 } = request.body;
    //conctenacion en string template... se utilizan las comillas`` y sirven para hacer un mjeor concatenacion atrib 3 =`${atrib1} ${atrib2}` 

};*/
const getDisps = async (request, response) => {

    const getDispsQuery = `
    SELECT d.id_dispositivo, descripcion , 
    (SELECT estado FROM estado_disp as e WHERE d.id_dispositivo = e.id_dispositivo ORDER BY fecha_estado DESC LIMIT 1) as estado
    FROM dispositivo as d ORDER BY d.id_dispositivo;
    `;

    const { rows } = await dbQuery(getDispsQuery);

    if (!rows) {
        errorMessage.error = 'Error getting disps';
        return response.status(httpStatus.bad).send(errorMessage);
    }   
    successMessage.data = rows;
    return response.status(httpStatus.ok).send(successMessage);
}
const getDispsOn = async (request, response) => {
    const getDispsQuery = `        
    SELECT d.id_dispositivo, descripcion , 
    (SELECT estado FROM estado_disp as e WHERE d.id_dispositivo = e.id_dispositivo ORDER BY fecha_estado DESC LIMIT 1) as estado
    FROM dispositivo as d;
    `;

    const { rows } = await dbQuery(getDispsQuery);

    if (!rows) {
        errorMessage.error = 'Error getting disps';
        return response.status(httpStatus.bad).send(errorMessage);
    }    

    const dispositivosData = [];
    for (let row in rows) {
//        console.log(rows[row].estado);
        if (rows[row].estado== "encendido") {            
            dispositivosData.push({
                id_dispositivo: rows[row].id_dispositivo,
                descripcion: rows[row].descripcion,
                estado: rows[row].estado
            });
        }        
    }    
    successMessage.data = dispositivosData;
    return response.status(httpStatus.ok).send(successMessage);
}

const getDispsOff = async (request, response) => {
    const getDispsQuery = `        
    SELECT d.id_dispositivo, descripcion , 
    (SELECT estado FROM estado_disp as e WHERE d.id_dispositivo = e.id_dispositivo ORDER BY fecha_estado DESC LIMIT 1) as estado
    FROM dispositivo as d;
    `;

    const { rows } = await dbQuery(getDispsQuery);

    if (!rows) {
        errorMessage.error = 'Error getting disps';
        return response.status(httpStatus.bad).send(errorMessage);
    }    

    const dispositivosData = [];
    for (let row in rows) {
        if (rows[row].estado== "apagado") {            
            dispositivosData.push({
                id_dispositivo: rows[row].id_dispositivo,
                descripcion: rows[row].descripcion,
                estado: rows[row].estado
            });
        }        
    }    
    successMessage.data = dispositivosData;
    return response.status(httpStatus.ok).send(successMessage);
}

const addDisp = async (request, response) => {
    try {
        const { id, desc } = request.body;
        const estado = "apagado";
        const addProductQuery = `
                INSERT into dispositivo (id_dispositivo ,descripcion)
                VALUES ($1, $2);
                
            `;
        const estquery = `INSERT into estado_disp (id_dispositivo,estado)
            VALUES ($1,$2);`
        const valuesP = [id, desc];
        const values = [id, estado]
        const { rowCount } = await dbQuery(addProductQuery, valuesP);
        if (!rowCount) {
            errorMessage.error = 'Error creating disp';
            return response.status(httpStatus.bad).send(errorMessage);
        }
        try {
            await dbQuery(estquery, values);
        } catch (error) {
            errorMessage.error = `Error creating esta: ${err}`;;
            return response.status(httpStatus.bad).send(errorMessage);
        }

        successMessage.data = rowCount;
        successMessage.message = `${rowCount} disp created successfully`;
        return response.status(httpStatus.ok).send(successMessage);

    }
    catch (err) {
        errorMessage.error = `Error creating disp: ${err}`;;
        return response.status(httpStatus.bad).send(errorMessage);
    }
}
const newState = async (request, response) => {
    try {
        const { id, state } = request.body;

        const addProductQuery = `
                INSERT into estado_disp (id_dispositivo ,estado)
                VALUES ($1, $2);
            `;
        const values = [id, state];
        const { rowCount } = await dbQuery(addProductQuery, values);
        if (!rowCount) {
            errorMessage.error = 'Error creating state';
            return response.status(httpStatus.bad).send(errorMessage);
        }

        successMessage.data = rowCount;
        successMessage.message = `${rowCount} state created successfully`;
        return response.status(httpStatus.ok).send(successMessage);

    }
    catch (err) {
        errorMessage.error = `Error creating state: ${err}`;;
        return response.status(httpStatus.bad).send(errorMessage);
    }
}

const prueba = (req, res) => {
    return res.status(200).send({
        status: "ok"
    });
}
module.exports = {
    getDisps,
    prueba,
    addDisp,
    newState,
    getDispsOn,
    getDispsOff
}