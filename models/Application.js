const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Application = sequelize.define("Application", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  position_applied: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ktp_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  place_of_birth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blood_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marital_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_ktp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_current: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emergency_contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_education: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  education_details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  training_history: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  work_experience: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  relocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expected_salary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "waiting",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Menyatakan model User sebagai referensi
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

module.exports = Application;
