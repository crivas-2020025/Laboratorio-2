//IMPORTACIONES
const asignacionesModels = require('../models/asignaciones.model');
const asignacionesModel = require('../models/asignaciones.model');
const Asignaciones = require('../models/asignaciones.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')


function validacionesAsignacion(req, res){
    var asignacionModelo = new Asignaciones();
    var parametros = req.body;

    Asignaciones.find({ idAlumno: req.user.sub}, (err, asignacionCurso)=>{
        if(asignacionCurso.length == 3){
            return res.status(500).send({mensaje: "No puede asignarse a mas de tres cursos"});
        }else{
            Asignaciones.find({idCurso: parametros.idCurso, idAlumno: req.user.sub}, (err,metodoAsiganciones) => {
                if(metodoAsiganciones.length == 0){
                    if(parametros.idCurso){
                        asignacionModelo.idAlumno = req.user.sub;
                        asignacionModelo.idCurso = parametros.idCurso;
                        asignacionModelo.save((err, ingreso) =>{
                            if(err) return res.status(500).send({mensaje:"No es posible realizar la accion"});
                            if (!ingreso) return res.status(404).send({mensaje:"No se esta realizando ninguna asignacion"});

                            return res.status(200).send({asignaciones: ingreso});
                        })
                    }
                }else{
                    return res.status(500).send({mensaje:"No puede ser agregado de nuevo"});
                }
            }).populate('idAlumno','nombre')
        }
    })
}

function asiganciones(req, res){
    Asignaciones.find({idAlumno: req.user.sub}, (err, cantidadAsig)=>{
        if(err) return res.status(500).send({mensaje:"Error en la accion"});
        if(!cantidadAsig) return res.status(404).send({mensaje: "No es posible ver las asignaciones"})

        return res.status(200).send({asiganciones:cantidadAsig })
    })
}

module.exports = {
    validacionesAsignacion,
    asiganciones
}