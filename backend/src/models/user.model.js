const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    phone: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("Admin", "User"), defaultValue: "User" },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = User;
