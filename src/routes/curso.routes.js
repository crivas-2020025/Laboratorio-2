//IMPORTACIONES
const express = require('express');
const cursoController = require('../controllers/curso.controller');
const md_autentificacion = require('../middlewares/autentificacion');

//RUTAS
var api = express.Router();

api.post('/agregarCurso', md_autentificacion.Auth, cursoController.RegistrarCurso);
api.put('/editarCurso/:idCurso', md_autentificacion.Auth, cursoController.EditarCurso);
api.delete('/eliminarCurso/:idCurso', md_autentificacion.Auth, cursoController.EliminarCurso);

module.exports = api;
