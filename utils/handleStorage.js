const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, micallbackfunc){
        const pathStorage = `${__dirname}/../storage`
        micallbackfunc(null,pathStorage)
    },
    filename: function(req, file,micallbackfunc){
        //pop agarra el ultimo valor de un array
        const extension = file.originalname.split(".").pop()
        const filename = `file-${Date.now()}.${extension}`
        micallbackfunc(null,filename)
    }
})

const uploadMiddleware = multer ({storage})

module.exports = uploadMiddleware