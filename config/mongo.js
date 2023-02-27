const mongoose = require("mongoose")
const NODE_ENV = process.env.NODE_ENV;

mongoose.set('strictQuery', false);
const dbConnectNoSql = async () =>{
    //const DB_URI = process.env.DB_URI
    const DB_URI = (NODE_ENV === 'test')?  process.env.DB_URI_TEST : process.env.DB_URI
    mongoose.connect(DB_URI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, res) => {
            if(!err){
                console.log("=========>CONEXION EXITOSA")
            }else{
                console.log("=========>ERROR AL CONETARSE AL CLUSTER DE BASE DE DATOS")
            }
        }
    )
}

module.exports = dbConnectNoSql