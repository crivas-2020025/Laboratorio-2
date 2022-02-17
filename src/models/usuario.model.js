const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = Schema ({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String
});

module.exports = mongoose.model('usuarios', usuarioSchema);