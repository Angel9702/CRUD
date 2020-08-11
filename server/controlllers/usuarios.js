'use strict'
const Usuario = require('../models/usuarios')

function CreateUsuario (req, res) {
  console.log(req.body)
  const usuario = new Usuario()
  usuario.nombre = req.body.nombre
  usuario.apellido = req.body.apellido
  usuario.dni = req.body.dni
  usuario.tarjeta = req.body.tarjeta
  usuario.genero = req.body.genero
  usuario.saldo = req.body.saldo
  usuario.maxRetiro = req.body.maxRetiro
  usuario.retiro = req.body.retiro
  usuario.intentos = req.body.intentos

  usuario.save((err, usuario) => {
    // eslint-disable-next-line curly
    if (err) return res.status(500).send({ message: `Error en la base de datos ${err}` })
    res.status(200).send({ usuario })
  })
}
function GetUsuarios (req, res) {
  Usuario.find((err, usuarios) => {
    if (err) { res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!usuarios) { res.status(404).send({ message: 'no se encuentra datos' }) }
    res.status(200).send({ usuarios })
  })
}
function GetUsuario (req, res) {
  const usuarioId = req.params.usuarioId
  Usuario.findById(usuarioId, (err, usuario) => {
    if (err) { res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!usuario) { res.status(404).send({ message: 'No se encuentra usuarios' }) }
    res.status(200).send({ usuario })
  })
}
function UpdateUsuario (req, res) {
  const usuarioId = req.params.usuarioId
  const update = req.body
  Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!usuarioUpdate) { return res.status(404).send({ message: 'No se encontro el producto' }) }
    res.status(200).send({ message: 'Se actualizaron los datos' })
  })
}
function UpdateEstado (req, res) {
  const usuarioId = req.params.usuarioId
  const update = req.body
  Usuario.findByIdAndUpdate(usuarioId, update, (err, estadoUpdate) => {
    if (err) { return res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!estadoUpdate) { return res.status(404).send({ message: 'No se encuentra el usuario' }) }
    res.status(200).send({ message: 'Se actualizo correctamente' })
  })
}
function DeleteUsuario (req, res) {
  const usuarioId = req.params.usuarioId
  Usuario.findById(usuarioId, (err, usuario) => {
    if (err) { res.status(500).send({ message: `Error en la base de datos ${err}` }) }
    if (!usuario) { res.status(404).send({ message: 'No se encuentra el usuario' }) }
    usuario.remove((err) => {
      if (err) { res.status(500).send({ message: `Error en la base de datos ${err}` }) }
      res.status(200).send({ message: 'El producto fue eliminado' })
    })
  })
}

module.exports = {
  CreateUsuario,
  GetUsuario,
  GetUsuarios,
  UpdateUsuario,
  DeleteUsuario,
  UpdateEstado
}
