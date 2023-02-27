const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

//declara la estructrua del archivo de mongodb
//primera seccion: se declara la estructura del archivo
//nombrecampo: {propiedad: propiedad}
//segunda seccion: definir en el esquema de mongo, decirle que cree los campos de created_at, updated_at
//select: false para omitir el campo al momento de consultar
const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, //created_ad, updated_at
    versionKey: false,
  }
);

UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserScheme);