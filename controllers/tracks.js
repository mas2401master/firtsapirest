//const { matchedData } = require("express-validator");
//Importacion del modelo
const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");


/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems= async (request, response)=>{
    //const data = ["hola","mundo"]
    //response.send({data})
    try{
        //const data = await tracksModel.find({});
        const data = await tracksModel.findAllData({});
        const user = request.user
        response.send({user, data})
    }catch (e){
        handleHttpError(response, "Error obteniendo items", 403)
    }
};
/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (request, response)=>{
    try{
        const {id} = matchedData(request)
        //const data = await tracksModel.findById(id)
        const data = await tracksModel.findOneData(id)
        response.send({data});
    }catch(e){
        handleHttpError(response,"Error al obtener el tracks")
    }
};
/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItems= async (request, response)=>{
    try{
        //machedData: limpia la data, que sea exactamente como el objeto del modelo
        const body = matchedData(request)
        //const { body } = request
        //const body = request.body
        console.log(body)

        const data = await tracksModel.create(body)
        response.send({data})
    }catch (e){
        handleHttpError(response, "Error creando items", 403)
    }
};
/**
 *  Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItems= async (request, response)=>{
    try {
        const {id, ...body} = matchedData(request);
        const data = await tracksModel.findOneAndUpdate(
          id, body
        );
        response.send({ data });
    } catch (e) {
        handleHttpError(response, "Error al modificar items");
    }
};
/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItems= async (request, response)=>{
    try{
        const {id} = matchedData(request)
        //borrado fisico con deleteOne
        //const data = await tracksModel.deleteOne({_id:id})
        const data = await tracksModel.delete({_id:id})
        response.send({data})
    }catch(e){
        handleHttpError(response, "Error al eliminar items");
    }
};

module.exports = {getItems, getItem, createItems,updateItems,deleteItems};