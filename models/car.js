const { DataTypes } = require('sequelize');
   const sequelize = require('../database');

   const Car = sequelize.define('Car', {
     make: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     model: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     year: {
       type: DataTypes.INTEGER,
       allowNull: false,
     },
     color: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     licensePlate: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
     },
     dailyRate: {
       type: DataTypes.FLOAT,
       allowNull: false,
     },
     available: {
       type: DataTypes.BOOLEAN,
       defaultValue: true,
     },
   });

   module.exports = Car;