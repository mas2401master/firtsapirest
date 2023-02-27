//Llamar el uso de la liberia para consultar las variabls 
//de entorno
require("dotenv").config()

const express = require("express")
//Exportar el archivo de conexion a mongodb
const dbConnectNoSql = require("./config/mongo");
const {dbConnectMySql} = require("./config/mysql");

const morganBody = require("morgan-body")
const  loggerStream  = require("./utils/handleLogger");

//Swagger
const swaggerUI = require("swagger-ui-express")

const openApiConfigration = require("./docs/swagger")
//permite evitar error de origen crusado entre los navegadore
const cors = require("cors")
//Instanciar la app con express
const app = express()

const port = process.env.PORT || 3001

app.use(cors())

//para recibir json
app.use(express.json())

//hacer uso de recursos publicos: express saca de la carpeta storage los archivos y ponlos publicos
app.use(express.static("storage"))

morganBody(app,{
    noColors: true,
    stream: loggerStream, 
    skip: function(req, res){
        return res.statusCode < 400
    }
});


/**
 * DEFINIR RUTAS DE DOCUMENTANCION SWAGGER 
 */
app.use('/documentation',
    swaggerUI.serve, 
    swaggerUI.setup(openApiConfigration)
)

/**
 * RUTAS 
 */
app.use("/api", require("./routes"))

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

if(NODE_ENV != 'test'){
    app.listen(port, () =>{
        console.log("Hola mundo con Node JS");
        console.log("http://localhost:", port);
    });
}

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql();

module.exports = app;