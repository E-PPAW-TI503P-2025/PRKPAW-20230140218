const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Presensi = sequelize.define(
  "Presensi",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    buktiFoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Presensis",
  }
);

module.exports = Presensi;
