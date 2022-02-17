//IMPORTACIONES
const usuarioModels = require('../models/usuario.model');
const usuariosModel = require('../models/usuario.model');
const Usuarios = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

//LOGIN
function login(req,res){
    var paramentros = req.body;

    Usuarios.findOne({email: paramentros.email},(err,usuarioGuardado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(usuarioGuardado){
            bcrypt.compare(paramentros.password,usuarioGuardado.password,(err,verificacionPassword)=>{
                if(verificacionPassword){
                    if(paramentros.obtenerToken === 'true'){
                        return res.status(200).send({
                            toke: jwt.crearToken(usuarioGuardado)
                        })
                    }else{
                        usuarioGuardado.password = undefined;
                        return res.status(200).send({usuario: usuarioGuardado})
                    }
                }else{
                    return res.status(500).send({mensaje:'La contrasena no coincide'})
                }
            })
        }else{
            return res.status(500).send({mensaje: 'El usuario no se encuentra o no se identifica'})
        }
    })
}

// AGREGAR ALUMNOS
function RegistrarAlumnos(req, res){
    var parametros = req.body;
    var usuarioModelo = new Usuarios();
    
    if (parametros.nombre && parametros.apellido && parametros.email && parametros.password) {
        usuarioModelo.nombre = parametros.nombre;
        usuarioModelo.apellido = parametros.apellido;
        usuarioModelo.email = parametros.email;
        usuarioModelo.rol = 'ROL_ALUMNO';
   }
    Usuarios.find({ email: parametros.email }, (err, usuarioGuardado) => {
    if (usuarioGuardado.length == 0) {
        bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
        usuarioModelo.password = passwordEncriptada
        usuarioModelo.save((err, usuarioGuardado) => {
        console.log(err)
        if (err) return res.status(500).send({ message: "Error en la peticion" });
            if (!usuarioGuardado) return res.status(404).send({ message: "Error al agregar el Alumno" });
    
            return res.status(201).send({ usuarios: usuarioGuardado });
    })
}) 
   }else {
    return res.status(500).send({ message: "Error en la accion" });
   }
  })
    } 

// AGREGAR MAESTRO
function RegistrarMestro(req, res){
    var parametros = req.body
    var usuarioModel = new Usuarios()

    if (parametros.email) {
        usuarioModel.nombre = "MAESTRO";
        usuarioModel.apellido = parametros.apellido;
        usuarioModel.email = parametros.email;
        usuarioModel.rol = 'ROL_MAESTRO';

        Usuarios.find({ email: parametros.email }, (err, usuarioEncontrato) => {
            if (usuarioEncontrato.length == 0) {
                bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada
                    usuarioModel.save((err, usuarioGuardado) => {
            console.log(err)
            if (err) return res.status(500) .send({ mensaje: "Error en la peticion" });
            if (!usuarioGuardado) return res.status(404).send({ mensaje: "Error al agregar el maestro" });

            return res.status(201).send({ usuario: usuarioGuardado });

            })
        })
        } else {
            return res.status(500).send({ mensaje: "Error en la accion" });
        }
    })
    }
}

//ALUMNO EDITA SU PERFIL
function EditarAlumno(req, res){
    var idUser = req.params.idUsuario
    var paramentros = req.body

    if(idUser == req.user.sub){
        Usuarios.findByIdAndUpdate(req.user.sub, paramentros,{new:true},(err, usuarioActualizado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                if(!usuarioActualizado) return res.status(400).send({mensaje: 'No puede editar al usuario'});
                
                return res.status(200).send({usuarios: usuarioActualizado});
            })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos'});
    }

    }

//ALUMNO ELIMINA SU PERFIL
function EliminarAlumno(req, res){
    var idUser = req.params.idUsuario

    if(idUser == req.user.sub){
        Usuarios.findByIdAndDelete(req.user.sub,(err, usuarioEliminado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                if(!usuarioEliminado) return res.status(400).send({mensaje: 'No puede editar al usuario'});
                
                return res.status(200).send({usuarios: usuarioEliminado});
            })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos'});
    }

    }
  
module.exports = {
    login,
    RegistrarAlumnos,
    RegistrarMestro,
    EditarAlumno,
    EliminarAlumno
}