const fs = require("fs")
//Importacion del modelo
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const public_url  = process.env.PUBLIC_URL
const media_path =  `${__dirname}/../storage`;
/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems= async (request, response)=>{
    //const data = ["hola","mundo"]
    //response.send({data})
    try{
        const data = await storageModel.find({});
        response.send({data})
    }catch(e){
        handleHttpError(response,"Error al obtener el listado de storage")
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
        const data = await storageModel.findById(id)
        response.send({data});
    }catch(e){
        handleHttpError(response,"Error al obtener el storage")
    }
};
/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItems= async (request, response)=>{
    try{
        const { body , file} = request
        //const body = request.body
        console.log(file)
        const fileData = {
            url: `${public_url}/${file.filename}`,
            filename: file.filename
        }
        const data = await storageModel.create(fileData)
        response.send({data})
    }catch(e){
        handleHttpError(response,"Error al crear el storage")
    }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItems= async (request, response)=>{
    try{
        const { id } = matchedData(request)
        const dataFile = await storageModel.findById(id);
        const { filename } = dataFile
        const filePath = `${media_path}/${filename}`

        //fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted:1
        }
       
        //await storageModel.deleteOne(id)
        await storageModel.delete({_id:id})
        response.send({data})
    }catch(e){
        handleHttpError(response, "Error al eliminar items");
    }
};

module.exports = {getItems, getItem, createItems,deleteItems};