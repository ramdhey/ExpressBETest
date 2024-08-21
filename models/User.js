const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(6),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    confirmation_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token_expiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
