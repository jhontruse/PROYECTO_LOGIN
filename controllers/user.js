const { matchedData } = require("express-validator");
const roles = require("../models/roles");
const models = require("../models");
const { Model } = require("sequelize");
const userRol = require("../models/users_rol");

/**
//!SECTION Listar usuarios
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
  try {
    await models.userModel
      .findAll()
      .then((usuarios) => {
        res.status(200).json({ usuarios });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (e) {
    console.log("------------------------------------------------------");
    console.log("ERROR-getItems");
    console.log("------------------------------------------------------");
    console.log("🚀 ~ file: user.js ~ line 15 ~ getItems ~ e", e);
    res.status(400).send(e);
  }
};

/**
//!SECTION Registrar usuario
 * @param {*} req 
 * @param {*} res 
 */
const createItems = async (req, res) => {
  try {
    await models.userModel.sync();
    await models.rolModel.sync();
    await models.userRolModel.sync();
    const user = await models.userModel
      .create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        fecnacimiento: req.body.fecnacimiento,
        estado: req.body.estado,
      })
      .then(async (user) => {
        req.body.rol.forEach(async (element) => {
          console.log(
            "🚀 ~ file: user.js:53 ~ req.body.rol.forEach ~ element",
            element
          );
          const user_rol = await models.userRolModel.create({
            id_user: user.id_user,
            id_rol: element.id_rol,
          });
        });
        res.status(200).json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (e) {
    console.log("------------------------------------------------------");
    console.log("ERROR-createItems");
    console.log("------------------------------------------------------");
    console.log("🚀 ~ file: user.js ~ line 15 ~ getItems ~ e", e);
    res.status(400).send(e);
  }
};

/**
//!SECTION Paginacion usuario
 * @param {*} req 
 * @param {*} res 
 */
const getPaginacionItem = async (req, res) => {
  try {
    const offset = parseInt(req.params.offset);
    const limit = parseInt(req.params.limit);
    await models.userModel
      .findAll({ offset, limit, include: roles })
      .then((usuarios) => {
        res.status(200).json({ usuarios });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (e) {
    console.log("------------------------------------------------------");
    console.log("ERROR-getPaginacionItem");
    console.log("------------------------------------------------------");
    console.log("🚀 ~ file: user.js ~ line 59 ~ getPaginacionItem ~ e", e);
    res.status(400).send(e);
  }
};

/**
//!SECTION Listar usuario
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await models.userModel
      .findByPk(id)
      .then((usuario) => {
        if (usuario === null) {
          res.status(404).json({ usuario });
        } else {
          res.status(200).json({ usuario });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (e) {
    console.log("------------------------------------------------------");
    console.log("ERROR-getItems");
    console.log("------------------------------------------------------");
    console.log("🚀 ~ file: user.js ~ line 15 ~ getItems ~ e", e);
    res.status(400).send(e);
  }
};

module.exports = { getItems, createItems, getPaginacionItem, getItem };
