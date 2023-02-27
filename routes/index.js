const express = require("express");
//file system
const fs = require("fs")
const router = express.Router();

const PATH_ROUTES = __dirname;//ruta absoluta el path donde se encuetra el archivo

const removeExtension = (fileName) => {
    //TODO tracks.js [tracks, js]
    return fileName.split('.').shift() //agarra el primer valor, es decri el nombre del archivo
}
//Leer el directorio de forma asincrona
//funcion que devuelve un array con los archivos que estan en routes ejemplo tracks.js,auth.js...
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)//TODO users, storage, tracks
    const path = './'+file
    console.log(file)
    if(name !== 'index'){
        console.log(`Cargando rutas ${name}`)
        router.use(`/${name}`, require(`./${file}`)) //TODO http://localhost:3000/api/tracks
    }
})

module.exports = router