const { DataTypes } = require('sequelize');
   const sequelize = require('../database');
   const User = require('./user');
   const Car = require('./car');

   const Booking = sequelize.define('Booking', {
     startDate: {
       type: DataTypes.DATE,
       allowNull: false,
     },
     endDate: {
       type: DataTypes.DATE,
       allowNull: false,
     },
     totalPrice: {
       type: DataTypes.FLOAT,
       allowNull: false,
     },
     status: {
       type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
       defaultValue: 'pending',
     },
   });

   Booking.belongsTo(User);
   Booking.belongsTo(Car);

   module.exports = Booking;