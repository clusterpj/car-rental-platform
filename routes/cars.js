const express = require('express');
   const Car = require('../models/car');
   const auth = require('../middleware/auth');

   const router = express.Router();

   // Get all cars
   router.get('/', async (req, res) => {
     try {
       const cars = await Car.findAll();
       res.send(cars);
     } catch (error) {
       res.status(500).send(error);
     }
   });

   // Get a specific car
   router.get('/:id', async (req, res) => {
     try {
       const car = await Car.findByPk(req.params.id);
       if (!car) {
         return res.status(404).send({ error: 'Car not found' });
       }
       res.send(car);
     } catch (error) {
       res.status(500).send(error);
     }
   });

   // Add a new car (admin only)
   router.post('/', auth, async (req, res) => {
     if (req.user.role !== 'admin') {
       return res.status(403).send({ error: 'Only admins can add cars' });
     }
     try {
       const car = await Car.create(req.body);
       res.status(201).send(car);
     } catch (error) {
       res.status(400).send(error);
     }
   });

   // Update a car (admin only)
   router.put('/:id', auth, async (req, res) => {
     if (req.user.role !== 'admin') {
       return res.status(403).send({ error: 'Only admins can update cars' });
     }
     try {
       const car = await Car.findByPk(req.params.id);
       if (!car) {
         return res.status(404).send({ error: 'Car not found' });
       }
       await car.update(req.body);
       res.send(car);
     } catch (error) {
       res.status(400).send(error);
     }
   });

   // Delete a car (admin only)
   router.delete('/:id', auth, async (req, res) => {
     if (req.user.role !== 'admin') {
       return res.status(403).send({ error: 'Only admins can delete cars' });
     }
     try {
       const car = await Car.findByPk(req.params.id);
       if (!car) {
         return res.status(404).send({ error: 'Car not found' });
       }
       await car.destroy();
       res.send({ message: 'Car deleted successfully' });
     } catch (error) {
       res.status(500).send(error);
     }
   });

   module.exports = router;