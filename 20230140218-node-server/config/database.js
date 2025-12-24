const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("dbku", "root", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./presensi.sqlite" // 1 file doang, langsung jadi
});

module.exports = sequelize;
