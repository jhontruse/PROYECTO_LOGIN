const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/mysql");
const users = require("../models/users");
const roles = require("../models/roles");
class UserRol extends Model {}
UserRol.init(
  {
    id_user_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user_rol",
    timestamps: false,
  }
);

users.belongsToMany(roles, { through: UserRol, foreignKey: "id_user" });
roles.belongsToMany(users, { through: UserRol, foreignKey: "id_rol" });

module.exports = UserRol;
