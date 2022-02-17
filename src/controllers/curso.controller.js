//IMPORTACIONES
const cursosModels = require('../models/curso.model');
const cursosModel = require('../models/curso.model');
const Cursos = require('../models/curso.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

// AGREGAR CURSO
function RegistrarCurso(req, res){
   var paramentros = req.body;
   var cursoModel = new Cursos();

    if(paramentros.nombre){
        cursoModel.nombre = paramentros.nombre;
        cursoModel.descripcion = paramentros.descripcion;
        cursoModel.idMaestro = req.user.sub;
    }else{
        return res.status(500).send({ message: "Error en la accion" });
    } if(req.user.rol == "ROL_MAESTRO"){
        Cursos.find({nombre: paramentros.nombre, descripcion: paramentros.descripcion, idMaestro: req.user.sub}, (err, cursoGuardado)=>{
            if(cursoGuardado.length == 0){
            cursoModel.save((err, cursoGuardado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                if(!cursoGuardado) return res.status(404).send({mensaje: 'El curso no se agrego'});
                return res.status(201).send({cursos: cursoGuardado});
            })
        }
        }).populate('idMaestro', 'nombre')
    } else {
        return res.status(500).send({mensaje: 'Debe ser maestro para completar esta accion'});
    }
} 

// EDITAR CURSO
function EditarCurso(req, res){
    var idCursos = req.params.idCurso;
    var paramentros = req.body;

    if(req.user.rol == "ROL_MAESTRO"){
        Cursos.findOneAndUpdate({_id: idCursos, idMaestro: req.user.sub}, paramentros,{new:true},
            (err, cursoEditado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                if(!cursoEditado) return res.status(400).send({mensaje: 'No puede agregar al curso'});
                
                return res.status(200).send({cursos: cursoEditado});
            })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos'});
    }
}

//ELIMINAR CURSO
function EliminarCurso(req, res){
    var idCursos = req.params.idCurso;

    if(req.user.rol == "ROL_MAESTRO"){
        Cursos.findOneAndDelete({_id: idCursos, idMaestro: req.user.sub},(err, cursoEditado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                if(!cursoEditado) return res.status(400).send({mensaje: 'No puede agregar al curso'});
                
                return res.status(200).send({cursos: cursoEditado});
            })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos'});
    }
}

    module.exports = {
        RegistrarCurso,
        EditarCurso,
        EliminarCurso
    }
