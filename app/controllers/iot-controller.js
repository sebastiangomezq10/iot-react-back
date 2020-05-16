import { HttpStatus, errorMessage, successMessage } from "../helpers/http-status-helper";

//API: Apli

export const peticion = async (request,response)=>{
    //caracteristica de ES6 (OBJECT DESTRUCTURING)que me sirve  que me sirve para leer de una mejor manera que los datos que tiene un objeto 
    const {atrib1,atrib2} =request.body;
    //conctenacion en string template... se utilizan las comillas`` y sirven para hacer un mjeor concatenacion atrib 3 =`${atrib1} ${atrib2}` 

};