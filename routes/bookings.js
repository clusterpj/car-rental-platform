const express = require('express');
   const Booking = require('../models/booking');
   const Car = require('../models/car');
   const auth = require('../middleware/auth');

   const router = express.Router();

   // Create a new booking
   router.post('/', auth, async (req, res) => {
     try {
       const car = await Car.findByPk(req.body.carId);
       if (!car || !car.available) {
         return res.status(400).send({ error: 'Car not available' });
       }

       const booking = await Booking.create({
         ...req.body,
         UserId: req.user.id,
         status: 'pending',
       });

       // Update car availability
       await car.update({ available: false });

       res.status(201).send(booking);
     } catch (error) {
       res.status(400).send(error);
     }
   });

   // Get all bookings (admin only)
   router.get('/', auth, async (req, res) => {
     if (req.user.role !== 'admin') {
       return res.status(403).send({ error: 'Only admins can view all bookings' });
     }
     try {
       const bookings = await Booking.findAll({ include: [Car] });
       res.send(bookings);
     } catch (error) {
       res.status(500).send(error);
     }
   });

   // Get user's bookings
   router.get('/me', auth, async (req, res) => {
     try {
       const bookings = await Booking.findAll({
         where: { UserId: req.user.id },
         include: [Car],
       });
       res.send(bookings);
     } catch (error) {
       res.status(500).send(error);
     }
   });

   // Update booking status (admin only)
   router.patch('/:id', auth, async (req, res) => {
     if (req.user.role !== 'admin') {
       return res.status(403).send({ error: 'Only admins can update booking status' });
     }
     try {
       const booking = await Booking.findByPk(req.params.id);
       if (!booking) {
         return res.status(404).send({ error: 'Booking not found' });
       }
       await booking.update({ status: req.body.status });
       res.send(booking);
     } catch (error) {
       res.status(400).send(error);
     }
   });

   module.exports = router;