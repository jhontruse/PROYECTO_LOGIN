const { matchedData } = require("express-validator");
const roles = require("../models/roles");
const models = require("../models");
const { encrypt, compare } = require("../utils/handlePassword");
const tokenSign = require("../utils/handleJWT");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db/mysql");

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
    const passwordEncrypt = await encrypt(req.body.password);
    const rol_asig = req.body.rol.id_rol;
    const body = await models.userModel.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      username: req.body.username,
      email: req.body.email,
      password: passwordEncrypt,
      fecnacimiento: req.body.fecnacimiento,
      estado: req.body.estado,
    });
    await models.userRolModel.create({
      id_user: body.id_user,
      id_rol: rol_asig,
    });
    body.set("password", undefined, { strict: false });
    const token = await tokenSign(rol_asig);
    const dataUser = {
      token: token,
      user: body,
    };
    res.status(200).json(dataUser);
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

const loginCtrl = async (req, res) => {
  try {
    console.log("🚀 ~ file: user.js:132 ~ loginCtrl ~ req", req.body);
    const user = await models.userModel.findOne({
      where: { username: req.body.username },
    });
    console.log("🚀 ~ file: user.js:136 ~ loginCtrl ~ user", user);
    const prueba = await sequelize.query(
      "SELECT A.id_rol FROM  db_pry_login.user_rols A, db_pry_login.users B WHERE A.id_user=B.id_user AND B.id_user = ?",
      {
        replacements: [user.dataValues.id_user],
        type: QueryTypes.SELECT,
      }
    );
    console.log(
      "🚀 ~ file: user.js:139 ~ loginCtrl ~ prueba",
      JSON.stringify(prueba[0].id_rol, null, null)
    );
    const rol_usuario = JSON.stringify(prueba[0].id_rol, null, null);
    console.log(
      "🚀 ~ file: user.js:148 ~ loginCtrl ~ rol_usuario",
      rol_usuario
    );
    if (!user) {
      res.status(404).send({ mensaje: "No existe usuario" });
      return;
    }
    console.log("PASO 1");
    const hashPassword = user.get("password");
    console.log(
      "🚀 ~ file: user.js:158 ~ loginCtrl ~ hashPassword",
      hashPassword
    );
    const check = await compare(req.body.password, hashPassword);
    console.log("PASO 2");
    console.log("🚀 ~ file: user.js:163 ~ loginCtrl ~ check", check);
    if (!check) {
      res.status(401).send({ mensaje: "Password Invalido" });
      return;
    }
    console.log("PASO 3");
    user.set("password", undefined, { strict: false });
    console.log("PASO 2");
    const token = await tokenSign(1);
    const dataUser = {
      token: token,
      user: user,
    };
    res.status(200).send(dataUser);
  } catch (error) {
    res.status(500).send({ mensaje: error });
  }
};

module.exports = {
  getItems,
  createItems,
  getPaginacionItem,
  getItem,
  loginCtrl,
};
