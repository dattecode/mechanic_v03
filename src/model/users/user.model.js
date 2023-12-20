import { sequelize } from "../../config/database/database.js";
import { DataTypes } from "sequelize";
import { randomUuid } from "../../plugins/uuidCrypto.js";
import { encrypterPassword } from "../../plugins/encrypterPass.js";

export const UserModel = sequelize.define(
  "user_model",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    accountId: {
      type: DataTypes.STRING(),
      allowNull: false,
      defaultValue: randomUuid()
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING(),
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    passWordChange: {
      type: DataTypes.DATE(),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("client", "employee"),
      allowNull: false,
      defaultValue: "client",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) =>{
        user.password = await encrypterPassword(user.password)
      },
    },
  }
);
