const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/mysql");
class Role extends Model {}
Role.init(
  {
    id_rol: {
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
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    fec_registro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "El campo debe ser formato fecha",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "rol",
    timestamps: false,
  }
);

// const User = sequelize.define(
//     "user",
//     {
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     },
//     {
//         sequelize,
//         modelName: 'user',
//         timestamps: false
//     }
// );
module.exports = Role;
