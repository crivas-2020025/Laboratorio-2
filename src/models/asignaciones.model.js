const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var asignacionesSchema = Schema ({
    idCurso: {type: Schema.Types.ObjectId, ref: 'cursos'},
    idAlumno: {type: Schema.Types.ObjectId, ref: 'usuarios'}
});

module.exports = mongoose.model('asiganciones', asignacionesSchema);