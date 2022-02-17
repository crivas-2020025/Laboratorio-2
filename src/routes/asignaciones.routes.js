const express = require('express');
const asignacionesController = require('../controllers/asignaciones.controller');
const md_autentificacion = require('../middlewares/autentificacion');

//RUTAS
var api = express.Router();

api.post('/AgregarAsignaciones', md_autentificacion.Auth, asignacionesController.validacionesAsignacion);
api.get('/VisualizarAsignaciones', md_autentificacion.Auth, asignacionesController.asiganciones);

module.exports = api;