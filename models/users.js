const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/mysql");
const rol = require("../models/roles");
class User extends Model {}
User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo obligatorio",
        },
        isAlpha: {
          args: true,
          msg: "El campo solo contiene letras",
        },
        len: {
          args: [2, 255],
          msg: "El campo tiene que ser entre 3 y 255 caracteres",
        },
      },
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo obligatorio",
        },
        isAlpha: {
          args: true,
          msg: "El campo solo contiene letras",
        },
        len: {
          args: [2, 255],
          msg: "El campo tiene que ser entre 3 y 255 caracteres",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo obligatorio",
        },
        isAlpha: {
          args: true,
          msg: "El campo solo contiene letras",
        },
        len: {
          args: [2, 255],
          msg: "El campo tiene que ser entre 3 y 255 caracteres",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo obligatorio",
        },
        isEmail: {
          args: true,
          msg: "El campo debe ser un correo valido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo obligatorio",
        },
      },
    },
    fecnacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
  }
);

module.exports = User;
