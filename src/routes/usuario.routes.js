//IMPORTACIONES
const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_autentificacion = require('../middlewares/autentificacion');

//RUTAS
var api = express.Router();

api.post('/agregarAlumno', usuarioController.RegistrarAlumnos);
api.post('/agregarMaestro', usuarioController.RegistrarMestro);
api.put('/editarAlumno/:idUsuario', md_autentificacion.Auth, usuarioController.EditarAlumno);
api.delete('/eliminarAlumno/:idUsuario', md_autentificacion.Auth, usuarioController.EliminarAlumno);


//LOGIN
api.post('/login', usuarioController.login);

module.exports = api;